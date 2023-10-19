export const setAdminTokeToLocalStorage=(adminCredentials)=>{
    localStorage.setItem('admincredentials', JSON.stringify(adminCredentials));
} 

export const getAdminTokenFromLocalStorage = () => {
    const adminCredentials = JSON.parse(localStorage.getItem('admincredentials'));
    return (adminCredentials)
}

export const adminApiHeaders = ()=>{
    const { token,email } = getAdminTokenFromLocalStorage()
    const headers={
        email,
        authorization:`Bearer ${token}`
    }
    return headers
}
