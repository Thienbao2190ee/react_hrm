import { axiosClient } from "./axiosClient"

const module = 'new'

const newApi = {
    getAll : (params) => {
        const url = `/${module}/getall`
        return axiosClient.get(url,params)
    },
    register : (data) => {
        const url = `/${module}/register`
        return axiosClient.post(url,data)
    },
    getbyid : (id) => {
        const url = `/${module}/getbyid/${id}`
        return axiosClient.get(url)
    },
    updateActive : (id,data) => {
        const url = `/${module}/update-active/${id}`
        return axiosClient.put(url,data)
    },
    updatebyid : (id,data) => {
        const url = `/${module}/updatebyid/${id}`
        return axiosClient.put(url,data)
    },
    delete : (id) => {
        const url = `/${module}/delete/${id}`
        return axiosClient.delete(url)
    }
}
export default newApi