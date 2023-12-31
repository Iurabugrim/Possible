import { getAccessToken } from "@/services/auth/auth.helper"
import axios from "axios"
import { getContentType } from "./api.helper"

const instance = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: getContentType()
})

instance.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

export default instance