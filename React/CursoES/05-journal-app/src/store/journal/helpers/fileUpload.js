
export const fileUpload = async (file) => {
    // if(!file) throw new Error('No file to upload');
    if (!file) return null; //easier for testing    

    const cloudUrl = import.meta.env.VITE_CLOUDINARY_URL;
    
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const res = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        const cloudRes = await res.json();

        return cloudRes.secure_url;

    } catch (error) {
        console.log(error);
    }

}
