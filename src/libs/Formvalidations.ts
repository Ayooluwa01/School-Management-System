// @/libs/Formvalidations.ts
import { zfd } from "zod-form-data";
import z from "zod/v4";




export const passwordFieldSchema = zfd.formData({
  password: zfd.text(z.string().min(6, "Password must be at least 6 characters"))
});

export const loginSchema = zfd.formData({
 login_id: zfd.text(z.string("")),
  password: zfd.text(z.string().min(6, "Password must be at least 6 characters")),
});

export const login_idFieldSchema = zfd.formData({
  login_id: zfd.text(z.string("Cannot be empty"))
});