const form = document.getElementById('fileUploadForm');
const fileInput = document.getElementById('fileInput');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  try {
    // console.log(formData);
    
    const response = await fetch('/your-backend-endpoint', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      console.log('File uploaded successfully!');
      // Handle successful upload, e.g., show a success message
    } else {
      console.error('Error uploading file:', response.statusText);
      // Handle error, e.g., display an error message
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    // Handle unexpected errors
  }
});