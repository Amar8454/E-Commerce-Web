const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "UploadProduct");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export default uploadImage;
