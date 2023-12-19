"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
import { Client } from "@/model/client.model"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFirstTwoCharacters } from "@/lib/utils"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type BillboardColumn = {
//     id: string
//     label: string
//     createdAt: string
// }

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "id",
        header: "#ID",
        cell:({row})=><div>
            CLIENT-{row.original.id}
        </div>
    },
    {
        accessorKey: "img",
        header: "Image",
        cell:({row})=><Avatar>
                <AvatarImage/>
                <AvatarFallback>{getFirstTwoCharacters(row.original.name)}</AvatarFallback>
            </Avatar>
      
    },
    {
        accessorKey: "name",
        header: "Nom",
    },
    {
        accessorKey: "age",
        header: "Age",
    },
    {
        header: "Action",
        id:"actions",
        cell : ({row})=><CellAction data={row.original} />
    }
]