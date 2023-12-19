"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import { Client } from "@/model/client.model"
import { useStoreModal } from "@/hooks/use-modal"



interface CellActionProps{
    data:Client
}


const CellAction:React.FC<CellActionProps> = ({data}) => {

    const {onOpen} = useStoreModal()

    return (
        <>
            <div className="flex items-center gap-x-2">
            <Button variant="destructive" size="icon" onClick={()=>onOpen("AlertModal",data)}>
                <Trash className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={()=>onOpen("addClient",data)}>
                <Edit className="h-4 w-4" />
            </Button>
            </div>
        </>
    )
}

export default CellAction