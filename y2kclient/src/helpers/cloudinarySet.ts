import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload';
const UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};