"use client"


import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "../../../zustand/store";

export default function Roleguard({children}:{children:React.ReactNode}){
      const pathname = usePathname();
    const {user}=useAuthStore()
// Role based protetction
      
}