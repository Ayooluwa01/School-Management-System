import { Users } from 'lucide-react'
import React from 'react'

 export const PageHeader=({Directory,text}:any) =>{
  return (
    <div>       {/* PAGE HEADER */}
          <div className="mb-6 flex items-center justify-between px-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {Directory}
              </h1>
              <p className="text-sm text-gray-500">
                {text}
              </p>
            </div>
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium border border-blue-100">
              <Users size={16} />
            </div>
          </div></div>
  )
}





