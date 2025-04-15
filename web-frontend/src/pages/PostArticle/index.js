import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/user-token";

const PostArticle = () => {
  const { token } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    imageUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      // Transform to match backend API expectations (desc → description)
      const payload = {
        title: formData.title,
        description: formData.desc,
        imageUrl: formData.imageUrl
      };
      
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/articles`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Article created:', response.data);
      setSuccess(true);
      setFormData({ title: "", desc: "", imageUrl: "" }); // Reset form
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create article');
      console.error('Error creating article:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Create New Article</h2>
      
      {success && (
        <div className="alert alert-success" role="alert">
          Article created successfully!
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="title">Article title</label>
          <input
            name="title"
            className="form-control"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            className="form-control"
            placeholder="Description"
            rows="10"
            value={formData.desc}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="imageUrl">Image Url</label>
          <input
            name="imageUrl"
            className="form-control"
            placeholder="Enter Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default PostArticle;
