import api from '@/lib/axios'
import {isAxiosError} from 'axios'
import { UserProfileFrom, UpdateCurrentUserPasswordForm } from '../types'

export async function updateProfile(formData: UserProfileFrom){
    try {
        const {data} = await api.put('/auth/profile', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm){
    try {
        const {data} = await api.post('/auth/update-password', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


