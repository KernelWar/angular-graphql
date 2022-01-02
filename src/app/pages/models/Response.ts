export interface Response {
    token?: string,
    message: string,
    user?: User
}

export interface User {
    id_user: number,
    username: string,
    full_name: string,
    password: string
}