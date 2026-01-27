  // hooks/useSchool.ts
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  import { useAuthStore } from '../zustand/store';
  import api from '../libs/axios';
  import { useRouter } from 'next/navigation';
import { Student } from '../zustand/Activestudent';

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
        const response = await api.patch(`/school-profile/updateProfile/${user?.school_id}`, updatedData,{
          headers:{
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
    
    const router=useRouter()
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
        api.post(`/class/delete`,data),
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
    filters?: { name?: string; gender?: string; class_id?: string }
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


    const updateStudent=useMutation({
      mutationFn:async (data:Student)=>{
      
        // const {data}=await api.patch(`/students/update/${id}/${user?.school_id}`)
      console.log(data.student_id)
      },
      onSuccess:()=>{
        queryClient.invalidateQueries({
          queryKey:[
  'students',user?.school_id

          ]
        })
      }
    })

    return { ...studentQuery, registerStudent, deleteStudent,updateStudent };
  };