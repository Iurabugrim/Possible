"use client"
import { getUser } from "@/services/auth/auth.helper";
import {Spin} from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminReroute = () => {
    const user = getUser()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.push('/admin/dashboard')
        }
    })

    return (
        <div className={"w-screen h-screen flex justify-center items-center"}>
            <Spin size="large" />
        </div>
    )
}

export default AdminReroute;