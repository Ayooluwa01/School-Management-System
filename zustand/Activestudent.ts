import {create} from 'zustand'

export interface Student{
    student_id:number,
    admission_no:string,
    name:string
    sex:string
    date_of_birth:string
    class_id:number
    setstudent_id:(value:number)=>void
    setadmission_no:(value:string)=>void
    setname:(value:string)=>void
    setsex:(value:string)=>void
    setdob:(value:string)=>void
    setclass_id:(value:number)=>void
}


export const Activestudent=create<Student>((set,get)=>({
    student_id:0,
    admission_no:'',
    name:'',
    sex:'',
    date_of_birth:'',
    class_id:0,
setstudent_id:(value)=>set({student_id:value}),
setadmission_no:(value)=>set({admission_no:value}),
setname:(value)=>set({name:value}),
setsex:(value)=>set({sex:value}),
setdob:(value)=>set({date_of_birth:value}),
setclass_id:(value)=>set({class_id:value})
}))

