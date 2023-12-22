import "./styles/style.css";
import { useState } from 'react';
import { uploadDocument } from "../services/apiService";

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = 'Bearer token';

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    };

    try {
      const response = await uploadDocument(formData, config);
      console.log('Document uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" name="title" onChange={handleChange} />
      <label>Description</label>
      <input type="text" name="description" onChange={handleChange} />
      <label>Year</label>
      <input type="text" name="year" onChange={handleChange} />
      <label>Price</label>
      <input type="text" name="price" onChange={handleChange} />
      <input type="file" name="files"/>
      <button type="submit">Upload</button>
    </form>
  );
};

export default Upload;
