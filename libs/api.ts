import api from "./axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function Fetch<T>(endpoint: string) {
  const res = await api.get(`${API_URL}/${endpoint}`);

  
  if (res.status!==200) throw new Error(`API request failed with status ${res.status}`);

  const data: T = await res.data;
    return { data };
}







// Fetch all classes
export async function fetchClasses() {
  try {
    const res = await api.get("/class/all_classes");
    const classList = res.data;
    return {
      classCount: classList.length,
      classList, 
    };
  } catch (error: any) {
    throw new Error("Failed to fetch classes");
  }
}

// Fetch all students
export async function fetchStudents() {
  try {
    const res = await api.get("/students/all_students");
    const studentList = res.data;
    return {
      studentCount: studentList.length,
      studentList
    };
  } catch (error: any) {
    throw new Error("Failed to fetch students");
  }
}
