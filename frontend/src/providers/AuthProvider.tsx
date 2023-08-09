"use client"
import { getAccessToken, getRefreshToken, getUser, removeTokenStorage, saveToStorage } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";
import { usePathname, useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const checkAuth = async () => await AuthService.getNewToken()

        const accessToken = getAccessToken()
        if (accessToken) {
            checkAuth().then(({ data }) => saveToStorage(data)).catch(() => removeTokenStorage())
        }
    }, [])

    useEffect(() => {
        const refreshToken = getRefreshToken()
        const user = getUser()
        if (!refreshToken || !user) {
            router.push('/admin/auth')
            removeTokenStorage()
        }
    }, [pathname])

    return <>{children}</>
}

