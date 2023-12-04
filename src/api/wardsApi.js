import { axiosClient } from "./axiosClient"

const module = 'wards'

const wardsApi = {
    getAll : (params) => {
        const url = `/${module}/getall`
        return axiosClient.get(url,params)
    },
}
export default wardsApi