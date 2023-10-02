import axios, {Axios} from "axios"

const base_URL = import.meta.env.VITE_BASE_URL

export const tokenValidation = async(values)=>{
    try {
        const result = await axios.get(`${base_URL}/auth/tokenvalidation`,{
            headers: {
                'content-type': 'application/json',
                email:values.email,
            'Authorization': `Bearer ${values.token}`, // Assuming token is part of your values object
          }})
        return result
    } catch (error) {
        return error
    }
}

export const registration = async(values) =>{
    try {
        const result = await axios.post(`${base_URL}/auth/registration`,values)
        return result;
    } catch (error) {
        return error
    }
}

export const login = async(values)=>{
    try {
        const result = await axios.post(`${base_URL}/auth/login`,values)
        return result
    } catch (error) {
        return error
    }
}



export const generateResetLink =async(values)=>{
    try {
         const result = await axios.post(`${base_URL}/auth/generateResetLink`,values)
         return result
    } catch (error) {
        return error
    }
}

export const resetPassword = async(values)=>{
    const {email,newPassword,token} =values
    alert(JSON.stringify(values))
    try {
        const result = await axios.put(`${base_URL}/auth/resetPassword/${email}/${token}`,{newPassword})
        return result
    } catch (error) {
        return error
    }
}