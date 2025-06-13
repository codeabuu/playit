import React, { useState } from 'react';
import axios from 'axios';

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    full_description: '',
    image: '',
    goal_amount: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/campaigns/', formData);
      alert('Campaign created successfully!');
      // Reset form or redirect
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign');
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Full Description</label>
          <textarea
            name="full_description"
            value={formData.full_description}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Goal Amount</label>
          <input
            type="number"
            name="goal_amount"
            value={formData.goal_amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

export default CampaignForm;