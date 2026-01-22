// @/libs/Formvalidations.ts
import { zfd } from "zod-form-data";
import z from "zod/v4";




export const passwordFieldSchema = zfd.formData({
  password: zfd.text(z.string().min(3, "Password must be at least 6 characters"))
});

export const loginSchema = zfd.formData({
 login_id: zfd.text(z.string("")),
  password: zfd.text(z.string().min(3, "Password must be at least 6 characters")),
});

export const login_idFieldSchema = zfd.formData({
  login_id: zfd.text(z.string("Cannot be empty"))
});




export const RegistrationSchema = z.object({
  admin: z.object({
    name: z.string().min(3, "Full name is required"),
    email: z.email("Invalid official email"),
    password: z.string().min(3, "Password must be at least 8 characters"),
    role: z.string().default("SUPER_ADMIN"),
  }),
  school: z.object({
    schoolId: z.string().min(1, "School ID is required"),
    name: z.string().min(3, "School name is required"),
    email: z.email("Invalid school email"),
    phone: z.string().min(10, "Valid phone number required"),
    country: z.string().min(2, "Country is required"),
    address: z.string().min(5, "Full address is required"),
  }),
  academic: z.object({
    sessionName: z.string().min(4, "e.g., 2024/2025"),
    sessionStart: z.date("Session STart required"),
    sessionEnd: z.date("session end date required"),
    termNumber: z.string().min(1, "Term number is required"), 
    termStart: z.date("Term start required"),
    termEnd: z.date("Term end required"),
  }),
  plan: z.string().default("professional"),
});

export type RegistrationData = z.infer<typeof RegistrationSchema>;