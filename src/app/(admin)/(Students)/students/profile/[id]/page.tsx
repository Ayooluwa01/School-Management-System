import React from 'react'

export default async function StudentProfile(props:any) {
    const { id} = await props.params

  return (
    <div>StudentProfile - {id}</div>
  )
}
