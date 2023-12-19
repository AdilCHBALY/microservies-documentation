import { Client } from "@/model/client.model";
import { create } from "zustand";


export type ModalType = "addClient" | "AlertModal"

interface useStoreModalProps{
    type:ModalType|null;
    data:Client|null
    isOpen: boolean;
    onOpen:(type:ModalType,data?:Client)=>void;
    onClose:()=>void;
}


export const useStoreModal=create<useStoreModalProps>((set)=>({
    isOpen:false,
    type:null,
    data:null,
    onOpen:(type,data)=>set({isOpen:true,type,data}),
    onClose:()=>set({isOpen:false})
}))