import Navbar from '../features/Navbar/Navbar';
import { useState } from 'react';
import {selectLoggedInUser} from '../features/auth/authSlice';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

function DocumentPage() {

    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const user = useSelector(selectLoggedInUser);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (file) {

                const formData = new FormData();
                formData.append('file', file);

                try {
                    const response = await fetch('http://localhost:8080/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    const response2 = await fetch('http://localhost:8080/api/document/uploadDocument', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            originalname: file.name,
                            createdBy: user.user.id
                        })
                    });
                    const result = await response2.json();
                    console.log(result)

                    
                    const result2 = await response2.json();

                }
                catch (err) {
                    console.log(err)
                }

        } else {
            alert('Please select a file.');
        }
    }

    return (
        <div className="bg-Primary-0" style={{ height: "100vh" }}>
            <Navbar />
            <div style={{ height: '90vh' }}>
                <div className='flex justify-center items-center h-full'>
                    <form onSubmit={handleSubmit} className="w-1/2">
                    <Link to="/library" className="p-8">Back</Link>
                        <div className='p-4'>
                            <input type="file" id="actual-btn" onChange={handleFileChange} accept=".pdf,.doc,.docx" hidden />
                            <label htmlFor="actual-btn" className='bg-indigo-500 text-white p-4 rounded-lg cursor-pointer block text-center w-full'>Choose File</label>
                        </div>
                        <div className='p-4'>
                            <button type="submit" className='bg-Secondary-0 text-white rounded-lg p-4 w-full'>Upload File</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DocumentPage;
