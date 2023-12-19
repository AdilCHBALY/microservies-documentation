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

const AlertModal = () => {
    const [loading, setLoading] = useState(false)
    const { isOpen, onClose, type,data } = useStoreModal()
    const isModalOpen = isOpen && type === "AlertModal"

    const handleClose = () => {
        onClose()
    }

    const onConfirm = async()=>{
        try {
            setLoading(true)
            await axios.delete("http://localhost:8081/api/client/"+data?.id)
            window.location.reload()
        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to delete {data?.name} ?
                    </DialogTitle>
                </DialogHeader>
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant='outline' onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant='destructive' onClick={onConfirm}>
                    Delete
                </Button>
            </div>
            </DialogContent>
        </Dialog>
    )
}

export default AlertModal