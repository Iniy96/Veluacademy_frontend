import axios, { Axios } from "axios"


const base_URL = import.meta.env.VITE_BASE_URL


export const getTokenFromLocalStorage = () => {
    const adminCredentials = JSON.parse(localStorage.getItem('AdminCredentials'));
    return (adminCredentials)
}

export const adminTokenValidation = async () => {
    const { token,email } = getTokenFromLocalStorage()
    try {
        const result = await axios.post(
            `${base_URL}/admin/tokenvalidation`,
            null,
            {
              headers: {
                'adminEmail':email,
                'Authorization': `Bearer ${token}`, 
              }
            }
          );
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}

export const adminLogin = async (values) => {
    try {
        const result = await axios.post(`${base_URL}/admin/login`, values)
        return result;
    } catch (error) {
        return error
    }
}

