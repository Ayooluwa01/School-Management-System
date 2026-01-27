import { create } from 'zustand'

export interface Student {
    student_id: string
    admission_no: string
    class_id: number
    class_code:string
    class_name: string
    school_id:string
user_id:string
arm:string
    // --- Personal ---
    first_name: string
    last_name: string
    gender: string 
    date_of_birth: string
    nationality: string
    religion: string
    surname:string
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
   
 
}

export const Activestudent = create<Student>((set) => ({
address: "",
admission_no:"",
arm: "",
blood_group: "",
class_code: "",
class_id:0, 
class_name: "",
created_at: "",
date_of_birth:"" ,
fathers_name:"" ,
fathers_number: "",
first_name: "",
gender: "Male",
genotype: "",
last_name: "Deborah",
lga: "ss",
mothers_name: "JD",
mothers_number: "",
nationality: "Nigerian",
other_names: '',
religion: "",
school_id: "",
state_of_origin:'' ,
status: "",
student_id:"" ,
surname:"", 
user_id:"" ,
    setStudent: (data) => set((state) => ({ ...state, ...data })),
  
}))