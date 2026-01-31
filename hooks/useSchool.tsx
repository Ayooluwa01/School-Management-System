// hooks/useSchool.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../zustand/store';
import api from '../libs/axios';
import { useRouter } from 'next/navigation';
import { StudentData } from '../zustand/Activestudent';

export function useSchoolProfile() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['school-profile', user?.school_id],
    queryFn: async () => {
      const response = await api.get(`/school-profile/profile/${user?.school_id}`);
      return response.data;
    },
    enabled: !!user?.school_id,
    refetchOnWindowFocus: false
  });

  const updateProfile = useMutation({
    mutationFn: async (updatedData: any) => {
      const response = await api.patch(`/school-profile/updateProfile/${user?.school_id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['school-profile', user?.school_id] });
    }
  });

  return { ...query, updateProfile };
}

export function useSession_Terms() {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["academic-calendar", user?.school_id],
    queryFn: async () => {
      const { data } = await api.get(`/school-profile/session/${user?.school_id}`);
      return data;
    },
    enabled: !!user?.school_id,
    refetchOnWindowFocus: false
  });
}

export const useRegisterSchool = () => {

  const router = useRouter()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post("/school-profile/register-full", data);
      return response.data;
    },
    onSuccess: () => {
      router.replace('/Login')
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || "Registration failed");
    }
  });
};

export const useClasses = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    data: classes = [],
    isLoading,
  } = useQuery({
    queryKey: ['classes', user?.school_id],
    queryFn: async () => {
      const { data } = await api.get(`/class/all_classes/${user?.school_id}`);
      return data;
    },
    enabled: !!user?.school_id,
  });

  const createClass = useMutation({
    mutationFn: (payload: any) =>
      api.post('/class/createClass', payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['classes', user?.school_id] as any);
    },
  });

  const updateClass = useMutation({
    mutationFn: ({ id, payload }: any) =>
      api.patch(`/class/update/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['classes', user?.school_id] as any);
    },
  });

  const deleteClass = useMutation({
    mutationFn: (data) =>
      api.post(`/class/delete`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['classes', user?.school_id] as any);
    },
  });

  return {
    classes,
    isLoading,
    createClass,
    updateClass,
    deleteClass,
  };
};

export const useStudent = (
  page = 0,
  filters?: { name?: string; gender?: string; class_id?: string },
  student_id?: string 
) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const studentQuery = useQuery({
    queryKey: ['students', user?.school_id, page, filters],
    queryFn: async () => {
      if (!user?.school_id) return [];

      const hasFilters =
        filters?.name ||
        (filters?.gender && filters.gender !== 'All') ||
        (filters?.class_id && filters.class_id !== 'All');

      const endpoint = hasFilters
        ? '/students/filter_student'
        : '/students/all_students';

      const { data } = await api.get(endpoint, {
        params: {
          school_id: user.school_id,
          limit: 15,
          offset: page * 15,
          name: filters?.name,
          gender: filters?.gender === 'All' ? '' : filters?.gender,
          class_id: filters?.class_id === 'All' ? '' : filters?.class_id
        }
      });
      return data;
    },
    enabled: !!user?.school_id,
  });

  const registerStudent = useMutation<any, any, any>({
    mutationFn: async (newStudent) => {
      const payload = { ...newStudent, school_id: user?.school_id };
      const { data } = await api.post('/students/register', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students', user?.school_id] });
    },
  });

  const deleteStudent = useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/students/delete/${id}/${user?.school_id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students', user?.school_id] });
    },
  });

  const updateStudent = useMutation({
    mutationFn: async (data: StudentData) => {
      const response = await api.patch(
        `/students/update/student/${data.student_id}/${data.school_id}`,
        data
      );
      console.log(data)
      return response.data;
    },
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['students',user?.school_id]
      })
    }
  });

  const getStudentProfile = useQuery({
    queryKey: ['student-profile', student_id,user?.school_id, page, filters],
    queryFn: async () => {
      const { data } = await api.get(`/students/${student_id}/${user?.school_id}`);
      return data;
    },
    enabled: !!student_id && !!user?.school_id,
  });


 
  return { ...studentQuery, registerStudent, deleteStudent, updateStudent, getStudentProfile };
};

interface SubjectPayload {
  schoolId: string;
  subjectName: string;
  category: string;
  subjectCode: string;
  classIds: number[];
  isCore?: boolean;
}

interface UpdateSubjectPayload {
  subjectName?: string;
  category?: string;
  subjectCode?: string;
  classIds?: number[];
  isCore?: boolean;
}

interface Subject {
  subject_id: number;
  school_id: string;
  subject_name: string;
  category: string;
  subject_code: string;
  is_core: boolean;
  assigned_classes?: string[];
  class_ids?: number[];
  created_at: string;
}

export const useSubjects = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch all subjects for the school
  const {
    data: subjects = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<Subject[]>({
    queryKey: ["subjects", user?.school_id],
    queryFn: async () => {
      const { data } = await api.post("/subjects/all", {
        schoolId: user?.school_id
      });
      return data;
    },
    enabled: !!user?.school_id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create new subject
  const registerSubject = useMutation({
    mutationFn: async (payload: Omit<SubjectPayload, 'schoolId'>) => {
      const fullPayload = {
        ...payload,
        schoolId: user?.school_id
      };
      const { data } = await api.post("/subjects/create", fullPayload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error: any) => {
      console.error("Failed to create subject:", error);
      throw error;
    },
  });

  // Update existing subject
  const updateSubject = useMutation({
    mutationFn: async ({ 
      subjectId, 
      payload 
    }: { 
      subjectId: number; 
      payload: UpdateSubjectPayload 
    }) => {
      const { data } = await api.patch(`/subjects/${subjectId}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error: any) => {
      console.error("Failed to update subject:", error);
      throw error;
    },
  });

  // Delete subject
  const deleteSubject = useMutation({
    mutationFn: async (subjectId: number) => {
      const { data } = await api.delete(`/subjects/${subjectId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
    onError: (error: any) => {
      console.error("Failed to delete subject:", error);
      throw error;
    },
  });

  // Assign subject to class
  const assignToClass = useMutation({
    mutationFn: async ({ 
      subjectId, 
      classId 
    }: { 
      subjectId: number; 
      classId: number 
    }) => {
      const { data } = await api.post(`/subjects/${subjectId}/assign/${classId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });

  // Remove subject from class
  const removeFromClass = useMutation({
    mutationFn: async ({ 
      subjectId, 
      classId 
    }: { 
      subjectId: number; 
      classId: number 
    }) => {
      const { data } = await api.delete(`/subjects/${subjectId}/remove/${classId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });

  // Get subjects by class
  const getSubjectsByClass = async (classId: number) => {
    const { data } = await api.get(`/subjects/class/${classId}`);
    return data;
  };

  return {
    // Data
    subjects,
    isLoading,
    isError,
    error,
    
    // Actions
    registerSubject,
    updateSubject,
    deleteSubject,
    assignToClass,
    removeFromClass,
    getSubjectsByClass,
    refetch,
  };
};





export const useStaffs = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  // 1. Get all staffs 
  const { 
    data: staffs = [], 
    isLoading: isLoadingStaffs 
  } = useQuery({
    queryKey: ["staffs", user?.school_id],
    queryFn: async () => {
      console.log("querying db with id", user?.school_id);
      const schoolId = user?.school_id;
      const { data } = await api.get(`/staffs/all/${schoolId}`);
      console.log("staff data", data);
      return data;
    },
    enabled: !!user?.school_id 
  });

  // 2. Get all teachers
  const { 
    data: teachers = [], 
    isLoading: isLoadingTeachers 
  } = useQuery({
    queryKey: ["teachers", user?.school_id],
    queryFn: async () => {
      const { data } = await api.post("/staffs/teachers/all", { 
        schoolId: user?.school_id 
      });
      return data;
    },
    enabled: !!user?.school_id,
  });

  // 
  const useStaffProfile = (staffId: string) => {
    return useQuery({
      queryKey: ["staff-profile", staffId],
      queryFn: async () => {
        const { data } = await api.post(`/staffs/profile`,{
          staffId,
          schoolId:user?.school_id
        });
        return data;
      },
      enabled: !!staffId,
    });
  };

  // 4. Register new staff
  const registerStaff = useMutation({
    mutationFn: async (payload: any) => {
      const finalPayload = { ...payload, school_id: user?.school_id };
      const { data } = await api.post("/staffs/register", finalPayload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

  // 5. Update staff info
  const updateStaff = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      const { data } = await api.patch(`/staffs/${id}`, payload);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      queryClient.invalidateQueries({ queryKey: ["staff-profile", variables.id] });
    },
  });

  // 6. Delete staff
  const deleteStaff = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/staffs/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

  // 7. Assign Subject to Teacher in a specific class
  const assignSubject = useMutation({
    mutationFn: async (payload: { staff_id: string; subject_id: number; class_id: number }) => {
      const { data } = await api.post("/staffs/assignments/create", payload);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["staff-assignments", variables.staff_id] });
      queryClient.invalidateQueries({ queryKey: ["staff-profile", variables.staff_id] });
    }
  });

  return {
    staffs,
    teachers,
    isLoadingStaffs,
    isLoadingTeachers,
    useStaffProfile,
    registerStaff,
    updateStaff,
    deleteStaff,
    assignSubject
  };
};