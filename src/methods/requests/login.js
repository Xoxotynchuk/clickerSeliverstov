import axios from "axios"

export async function loginRequest (login, password) {
    console.log(login, password);
    
    const response = await axios.post('https://api.seliverstov-mgd.ru/api/login', {
        login: login,
        password: password
    })

    return response
}