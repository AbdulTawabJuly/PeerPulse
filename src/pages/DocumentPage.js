import Navbar from '../features/Navbar/Navbar';
import { useState } from 'react';

function DocumentPage() {

    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

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
                        <div className='p-4'>
                            <input type="text" placeholder="Enter file name" className='px-4 py-2 rounded-lg w-full' />
                        </div>
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
