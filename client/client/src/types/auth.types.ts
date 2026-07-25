import { AuthUser } from "./user.types";

export interface LoginDto{
    email: string;
    password: string
}

export interface LoginResponse{
    token: string
    user: AuthUser
}