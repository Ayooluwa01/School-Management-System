// hooks/useSchool.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../zustand/store';
import api from '../libs/axios';
import { useRouter } from 'next/navigation';

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
        console.log(updatedData)
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