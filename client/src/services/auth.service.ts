import api from '../lib/axios'
import{ LoginDto, LoginResponse }from '../types/auth.types'

export const AuthService = {
    async login(data: LoginDto){
       const {data: response} = await api.post<LoginResponse>('/auth/login', data)
        return response
    }
}