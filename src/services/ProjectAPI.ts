import api from '@/lib/axios'
import { Project, ProjectFormData, daschboardProjectSchema, editProjectSchema, projectSchema } from '@/types/index'
import {isAxiosError} from 'axios'

export async function createProject(formData: ProjectFormData){
    try {
        const {data} = await api.post('/projects', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjects(){
    try {
        const {data : {data}} = await api('/projects')
        const response = daschboardProjectSchema.safeParse(data)
        if (response.success) {
            return response
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProjectById(id: Project['_id']){
    try {
        const {data} = await api(`/projects/${id}`)
        const response = editProjectSchema.safeParse(data.data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFullProject(id: Project['_id']){
    try {
        const {data} = await api(`/projects/${id}`)
        const response = projectSchema.safeParse(data.data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type ProjectAPIType = {
    formData: ProjectFormData,
    id: Project['_id']
}

export async function updateProject({formData, id}: ProjectAPIType){
    try {
        const {data} = await api.put(`/projects/${id}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(id: Project['_id']){
    try {
        const {data} = await api.delete(`/projects/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}