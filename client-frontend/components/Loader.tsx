"use client"

import docker from "@/public/img/docker-svgrepo-com.svg"
import spring from "@/public/img/spring-svgrepo-com.svg"
import Image from "next/image"


const Loader = () => {
    return (
        <div className="h-screen flex items-center justify-center relative">
            <Image
                className="absolute w-[100px] animate-bounce left-[35%] top-[35%]"
                src={docker}
                alt="Docker"
            />
            <Image 
                className="absolute w-[50px] animate-bounce right-[35%] bottom-[40%]"
                src={spring}
                alt="Spring"
            />
            <div className="animate-bounce">
                <p className="text-5xl font-semibold">CHBALY Adil</p>
            </div> 
        </div>
    )
}

export default Loader