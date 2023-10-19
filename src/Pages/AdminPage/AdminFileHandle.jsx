import React, { useContext, useState } from 'react';
import { fileupload } from '../../services/Admin APIs/admintestAPI';
import toast, { Toaster } from 'react-hot-toast';
import { UserCredentialsContext } from '../../context-API/UserCredentialsContext';

export const AdminFileHandle = () => {

    const { setisAdminLoggedIn} = useContext(UserCredentialsContext)

    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setError('');
        } else {
            setFile(null);
            setError('Please select a file.');
        }
    };

    const handleSubmit =async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        const result = await fileupload(formData)
        if(result.status === 200){
            toast.success("Data Uploaded successfully");
        }else{
            toast.error("Something went wrong")
        }
    };

    const handleLogout =()=>{
        localStorage.removeItem('admincredentials');
        setisAdminLoggedIn(null)
    }

    return (
        <>
         <Toaster />
         <div>
            <button className='btn btn-dark' onClick={handleLogout}>Logout</button>
         </div>
            <form onSubmit={handleSubmit} className='mt-3 mx-auto col col-md-8 col-lg-6 border rounded p-3 d-flex flex-column gap-3'>
                <label htmlFor="file" className='pe-5'>Upload File:</label>
                <input
                    className="form-control"
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    accept=".csv"
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}

                <button className='btn btn-secondary w-50' type="submit">
                    Submit
                </button>
            </form>
        </>
    );
};
