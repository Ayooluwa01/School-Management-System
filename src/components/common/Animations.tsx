"use client"
import React from 'react'
import Teacher from '@/assets/animations/Teacher.json'
import Lottie from "lottie-react"
export  function Animations() {
  return (
           <Lottie animationData={Teacher} autoPlay loop size={100}/>
  )
}
