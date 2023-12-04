import { axiosClient } from "./axiosClient"

const module = 'districts'

const districtsApi = {
    getAll : (params) => {
        const url = `/${module}/getall`
        return axiosClient.get(url,params)
    },
}
export default districtsApi