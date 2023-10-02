import axios, { Axios } from "axios"
import { getTokenFromLocalStorage } from "./adminAuthAPI";

const base_URL = import.meta.env.VITE_BASE_URL

export const fileupload = async (file) => {
  const { token, email } = getTokenFromLocalStorage()
  try {
    const result = await axios.post(
      `${base_URL}/admin/fileupload`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          'adminEmail': email,
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    return result;
  } catch (error) {
    return error
  }
}

export const getQuestionTableData = async () => {
  try {
    const { token, email } = getTokenFromLocalStorage()
    const result = await axios.get(
      `${base_URL}/admin/getQuestionTableData`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          'adminEmail': email,
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    return result
  } catch (error) {
    return error
  }
}