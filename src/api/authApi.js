import { axiosClient } from "./axiosClient"

const module = 'auth'

const authAPi = {
    register : (data) => {
        const url = `/${module}/register`
        return axiosClient.post(url,data)
    },
    login : (data) => {
        const url = `/${module}/login`
        return axiosClient.post(url,data)
    },
    checkCode : (data) => {
        const url = `/${module}/check-code`
        return axiosClient.post(url,data)
    },
    getInfo : (id) => {
        const url = `/${module}/getinfo/${id}`
        return axiosClient.get(url)
    }
}
export default authAPi