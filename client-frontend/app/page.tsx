"use client"

import ClientData from "@/components/ClientData";

export default function Home() {
  return (
    <div className='flex-col'>
        <div className="flex-1 scroll-py-4 p-8 pt-6">
            <ClientData />
        </div>
    </div>
  )
}
