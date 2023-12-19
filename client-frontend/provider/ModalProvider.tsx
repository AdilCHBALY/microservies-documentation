"use client"

import AlertModal from '@/components/modal/AlertModal'
import ClientModal from '@/components/modal/ClientModal'
import {useEffect,useState} from 'react'

const modalProvider = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isMounted,setIsMounted] = useState(false)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) return null

  return (
    <>
      <ClientModal />
      <AlertModal />
    </>
  )
}

export default modalProvider