import { create } from 'zustand'

// 1. Define only the data fields
export interface StudentData {
    student_id: string
    admission_no: string
    class_id: number
    class_code: string
    class_name: string
    school_id: string
    user_id: string
    arm: string
    first_name: string
    last_name: string
    gender: string 
    date_of_birth: string
    nationality: string
    religion: string
    surname: string
    blood_group: string
    genotype: string
    state_of_origin: string
    lga: string
    address: string
    fathers_name: string
    mothers_name: string
    fathers_number: string
    mothers_number: string
}

interface StudentStore extends StudentData {
    setStudent: (data: Partial<StudentData>) => void
    resetStudent: () => void
}

const initialState: StudentData = {
    address: "",
    admission_no: "",
    arm: "",
    blood_group: "",
    class_code: "",
    class_id: 0,
    class_name: "",
    date_of_birth: "",
    fathers_name: "",
    fathers_number: "",
    first_name: "",
    gender: "",
    genotype: "",
    last_name: "",
    lga: "",
    mothers_name: "",
    mothers_number: "",
    nationality: "",
    religion: "",
    school_id: "",
    state_of_origin: "",
    student_id: "",
    surname: "",
    user_id: "",
};

export const Activestudent = create<StudentStore>((set) => ({
    ...initialState,
    setStudent: (data) => set((state) => ({ ...state, ...data })),
    resetStudent: () => set(initialState),
}))