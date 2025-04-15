import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ViewArticle = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // This is how you access URL parameters in react-router v6
  
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_BACKEND_API}/articles/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch article');
        }
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);
  
  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error loading article: {error}</div>;
  if (!article) return <div>Article not found</div>;
  
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <p>By: {article.author?.name || 'Unknown author'}</p>
    </div>
  )
}

export default ViewArticle;
