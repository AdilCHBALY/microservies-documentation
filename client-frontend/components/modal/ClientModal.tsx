"use client"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useStoreModal } from "@/hooks/use-modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    age: z.coerce.number().min(0),
})

type addClientFormValues = z.infer<typeof formSchema>

const ClientModal = () => {
    const [loading, setLoading] = useState(false)
    const { isOpen, onClose, data, type } = useStoreModal()
    const isModalOpen = isOpen && type === "addClient"
    const isEditing = data!=null

    const form = useForm<addClientFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: data || {
            name: '',
            age: 0
        }
    })

    const handleClose = () => {
        onClose()
    }

    const onSubmit = async (values: addClientFormValues) => {
        try {
            setLoading(true)
            if(isEditing){
                await axios.put("http://localhost:8081/api/client/"+data.id,values)
            }else{
                await axios.post("http://localhost:8081/api/client",values)
            }
            toast.success("Client Added Successfully")
            form.reset()
            window.location.reload()
        } catch (error) {
            setLoading(false)
            toast.error("Something Went Wrong! ;( either check your backend/database/CORS settings and try again")
        }finally{
            setLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Modifier le Client "+data.name:"Ajouter un Client"}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Nom Client</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Client  Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Age Client</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            placeholder="Client Age"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className='flex items-center
            w-full'>
                            <Button onClick={handleClose} variant="ghost">
                                Cancel
                            </Button>
                            <Button type="submit" className="ml-auto" disabled={loading}>
                                {isEditing ? "Update" : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ClientModal