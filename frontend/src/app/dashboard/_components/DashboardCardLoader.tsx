import { Loader2 } from 'lucide-react'
import React from 'react'

const DashboardCardLoader = () => {
  return (
              <div className="p-4 bg-white rounded-[14px] flex justify-center pb-8">
                <Loader2 className="h-7 w-7 animate-spin" />
              </div>
  )
}

export default DashboardCardLoader
