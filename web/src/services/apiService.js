import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; 

const apiService = axios.create({
  baseURL: API_BASE_URL,
});




export const registerUser = (userData) => apiService.post('/user/register', userData);
export const loginUser = (userData) => apiService.post('/user/login', userData);

export const uploadDocument = (formData, config) => apiService.post('/docs/upload', formData, config);
export const getAllDocuments = () => apiService.get('/docs');
export const getDocumentById = (documentId) => apiService.get(`/docs/${documentId}`);
export const editDocument = (documentId, newData) => apiService.patch(`/docs/${documentId}`, newData);
export const deleteDocument = (documentId) => apiService.delete(`/docs/${documentId}`);
