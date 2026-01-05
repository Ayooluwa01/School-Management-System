import { create } from 'zustand'

export interface Student {
    student_id: number
    info_id: number
    admission_no: string
    class_id: number
    class_name: string

    // --- Personal ---
    name: string
    first_name: string
    last_name: string
    sex: string
    gender: string 
    date_of_birth: string
    nationality: string
    religion: string
    
    blood_group: string
    genotype: string
    state_of_origin: string
    lga: string

    address: string
    fathers_name: string
    mothers_name: string
    fathers_number: string
    mothers_number: string

  
    setStudent: (data: Partial<Student>) => void
        setstudent_id: (value: number) => void
    setadmission_no: (value: string) => void
    setname: (value: string) => void
    setsex: (value: string) => void
    setdob: (value: string) => void
    setclass_id: (value: number) => void
 
}

export const Activestudent = create<Student>((set) => ({
student_id: 0,
admission_no: '',
name: '',
sex: '', 
date_of_birth: '',  
class_id: 0,
class_name: '',
info_id: 0,
first_name: '',
last_name: '',
gender: '',
nationality: '', 
religion: '', 
blood_group: '',
genotype: '', 
state_of_origin: '',
lga: '',
fathers_name: '',
mothers_name: '',  
fathers_number: '',
mothers_number: '',
address: '',
    setStudent: (data) => set((state) => ({ ...state, ...data })),
    setstudent_id: (value) => set({ student_id: value }),
    setadmission_no: (value) => set({ admission_no: value }),
    setname: (value) => set({ name: value }),
    setsex: (value) => set({ sex: value }),
    setdob: (value) => set({ date_of_birth: value }),
    setclass_id: (value) => set({ class_id: value }),
}))