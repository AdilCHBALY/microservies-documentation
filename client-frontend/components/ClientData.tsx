"use client"

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { Separator } from "./ui/separator"
import { DataTable } from "./DataTable"
import { columns } from "./ClientColumn"
import { Client } from "@/model/client.model"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Loader from "./Loader"
import { useStoreModal } from "@/hooks/use-modal"



const ClientData = () => {
    const{onOpen}=useStoreModal()
    const [loading,setLoading]=useState(false)
    const [data,setData]=useState<Client[]>([])

    const getData=async ()=>{   
        try {
            setLoading(true)
            const response = await axios.get("http://localhost:8888/api/client")
            setData(response.data)
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }

    useEffect(() =>{
        getData()
    },[])
    const router = useRouter()

    if(loading){
        return <Loader />
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Clients ( ${data.length} )`}
                    subtitle="Manage your Client"
                />
                <Button onClick={()=>onOpen("addClient")} variant="primary">
                    <Plus  className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator className="h-[3px] bg-primary mt-3" />
            <DataTable
                searchKey="name"
                columns={columns}
                data={data}
            />
        </>
    )
}

export default ClientData