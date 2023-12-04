import { axiosClient } from "./axiosClient"

const module = 'city'

const cityAPi = {
    getAll : (params) => {
        const url = `/${module}/getall`
        return axiosClient.get(url,params)
    },
}
export default cityAPi