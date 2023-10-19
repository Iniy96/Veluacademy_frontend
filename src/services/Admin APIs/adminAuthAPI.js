import axios, { Axios } from "axios"
import { adminApiHeaders, getAdminTokenFromLocalStorage } from "../../utilities/AdminAPIUtilities";

const base_URL = import.meta.env.VITE_BASE_URL

export const tokenValidationOnRefresh = async () => {
    const headers=adminApiHeaders()
    try {
        const result = await axios.post(
            `${base_URL}/admin/tokenvalidation`,
            null,
            {
             headers
            }
          );
          console.log("RECEIVED TOKEN",result?.data?.Newtoken);
        return result
    } catch (error) {
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

