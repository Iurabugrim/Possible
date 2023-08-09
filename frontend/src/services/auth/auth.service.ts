import { getContentType } from "@/api/api.helper";
import { saveToStorage } from "./auth.helper"
import { IAuthResponse, IEmailPassword } from "@/types/User.interface";
import axios from "axios";
import Cookies from "js-cookie";
import instance from "@/api/api.interceptor";


export const AuthService = {
    async login(data: IEmailPassword) {
        const response = await instance.post("auth/login", data)

        if (response?.data.accessToken) saveToStorage(response.data)
        return response?.data
    },

    async getNewToken() {
        const refreshToken = Cookies.get("refresh_token");

        const response = await axios.post<string, { data: IAuthResponse }>("/api/auth/login/access-token", { refreshToken }, { headers: getContentType() })

        if (response?.data.accessToken) saveToStorage(response.data);

        return response
    }
}