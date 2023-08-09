import { IAuthResponse, IToken } from "@/types/User.interface"
import Cookie from "js-cookie"

export const getUser = () => {
    const user = localStorage.getItem('user')
    if (user) {
        return JSON.parse(user)
    }
    return null
}

export const getAccessToken = () => {
    return Cookie.get('access_token') || null
}

export const getRefreshToken = () => {
    return Cookie.get('refresh_token') || null
}

export const saveTokenStorage = (data: IToken) => {
    Cookie.set('access_token', data.accessToken)
    Cookie.set('refresh_token', data.refreshToken)
}

export const removeTokenStorage = () => {
    Cookie.remove('access_token')
    Cookie.remove('refresh_token')
    localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
    saveTokenStorage(data)
    localStorage.setItem('user', JSON.stringify(data.user))
}