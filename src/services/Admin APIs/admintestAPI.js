import axios, { Axios } from "axios"
import { adminApiHeaders } from "../../utilities/AdminAPIUtilities";

const base_URL = import.meta.env.VITE_BASE_URL

export const fileupload = async (file) => {
  const headersWithoutContentType = adminApiHeaders()
  const headers = {
    ...headersWithoutContentType,
    "Content-Type": "multipart/form-data"
  }
  try {
    const result = await axios.post(
      `${base_URL}/admin/fileupload`,
      file,
      {
        headers
      }
    );
    return result;
  } catch (error) {
    return error
  }
}

export const getQuestionTableData = async () => {
  const headers = adminApiHeaders()
  try {
    const result = await axios.get(
      `${base_URL}/admin/getQuestionTableData`,
      {
        headers
      }
    );
    return result
  } catch (error) {
    return error
  }
}