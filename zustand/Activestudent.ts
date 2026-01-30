import { create } from 'zustand'

// 1. PURE DATA INTERFACE (Matches DB Columns)
export interface StudentData {
    student_id: string
    admission_no: string
    school_id: string
    user_id: string
    
    // Class Data
    class_id: number
    class_name?: string // Optional, for display only
    class_code?: string // Optional, for display only
    arm?: string        // Optional, derived from class table

    // Personal
    first_name: string
    last_name: string
    surname: string
    other_names: string
    gender: string 
    date_of_birth: string | null
    nationality: string
    religion: string
    blood_group: string
    genotype: string
    state_of_origin: string
    lga: string
    address: string

    // Parents
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
    student_id: "",
    admission_no: "",
    school_id: "",
    user_id: "",
    class_id: 0,
    class_name: "",
    class_code: "",
    arm: "",
    first_name: "",
    last_name: "",
    surname: "",
    other_names: "",
    gender: "Male",
    date_of_birth: null,
    nationality: "",
    religion: "",
    blood_group: "",
    genotype: "",
    state_of_origin: "",
    lga: "",
    address: "",
    fathers_name: "",
    mothers_name: "",
    fathers_number: "",
    mothers_number: "",
};

export const Activestudent = create<StudentStore>((set) => ({
    ...initialState,
    setStudent: (data) => set((state) => ({ ...state, ...data })),
    resetStudent: () => set(initialState),
}))