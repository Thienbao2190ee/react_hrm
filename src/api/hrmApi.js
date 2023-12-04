import { axiosClient } from "./axiosClient"

const module = 'hrm'

const hrmAPi = {
    getAll : (params) => {
        const url = `/${module}/getall`
        return axiosClient.get(url,params)
    },
    register : (data) => {
        const url = `/${module}/register`
        return axiosClient.post(url,data)
    },
    getbyid : (id) => {
        const url = `/${module}/updatebyid/${id}`
        return axiosClient.put(url)
    },
    updatebyid : (data) => {
        const url = `/${module}/updatebyid`
        return axiosClient.put(url,data)
    },
    delete : (id) => {
        const url = `/${module}/delete/${id}`
        return axiosClient.delete(url)
    }
}
export default hrmAPi