import React, { useEffect, useState } from 'react';
import { getAllDocuments } from '../services/apiService';
import Card from './Card'; 

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getAllDocuments();
        setDocuments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error.response.data);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {documents.map((document) => (
            <li key={document.id}>
              <Card
                title={document.title}
                category={document.description}
                year={document.year}
                price={document.price}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;
