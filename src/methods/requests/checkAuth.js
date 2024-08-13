import { Api } from "./Api"

const checkAuth = async (setStatus, setData) => {
    try {
        const response = await Api.checkAuth()
        console.log(response);
        
        setData(response.data.data)
        setStatus(response.status)
        return response.status
    } catch (error) {
        setStatus(error.response.status)
        return error.response.status
    }
}

export default checkAuth