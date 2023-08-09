export interface IUser {
    id: number
    name: string
    email: string
    role: string
}

export interface IAuthResponse {
    user: IUser
    accessToken: string
    refreshToken: string
}

export interface IToken {
    accessToken: string;
    refreshToken: string;
}

export interface IEmailPassword {
    email: string
    password: string
}
