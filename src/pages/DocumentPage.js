import Navbar from '../features/Navbar/Navbar';

function DocumentPage() {

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Get the file input element
        const fileInput = document.getElementById('actual-btn');
        // Get the selected file
        const file = fileInput.files[0];
        
        // Check if a file is selected
        if (file) {
            try {
                // Perform your file upload or processing logic here
                console.log('Uploading file:', file);
                // Example: Upload file to server using fetch API
                const formData = new FormData();
                formData.append('file', file);
                
                const response = await fetch('your_upload_url', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    console.log('File uploaded successfully!');
                    // Add any further actions after successful upload
                } else {
                    console.error('Failed to upload file:', response.statusText);
                    // Handle error if upload fails
                }
            } catch (error) {
                console.error('Error uploading file:', error.message);
                // Handle error if any exception occurs during upload
            }
        } else {
            // Handle case when no file is selected
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
                            <input type="text" placeholder="Enter file name" className='px-4 py-2 rounded-lg w-full'/>
                        </div>
                        <div className='p-4'>
                            <input type="file" id="actual-btn" onChange={handleFileChange} accept=".pdf,.doc,.docx" hidden/>
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
