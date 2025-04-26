// src/components/ProfileEditForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ProfileEditForm = ({ user, onSave }) => {
    user = true;
    if (!user) {
        return <p>Loading...</p>;
    }

    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        country: user.country || '',
        language: user.language || '',
        sex: user.sex || '',
        birthDate: user.birthDate || '',
        phoneNumber: user.phoneNumber || '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.put('/api/users/profile', formData);
            onSave(response.data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
  <div className="mb-3">
    <label className="form-label">First Name:</label>
    <input
      type="text"
      name="firstName"
      className="form-control"
      value={formData.firstName}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Last Name:</label>
    <input
      type="text"
      name="lastName"
      className="form-control"
      value={formData.lastName}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Country:</label>
    <input
      type="text"
      name="country"
      className="form-control"
      value={formData.country}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Language:</label>
    <input
      type="text"
      name="language"
      className="form-control"
      value={formData.language}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Sex:</label>
    <select
      name="sex"
      className="form-select"
      value={formData.sex}
      onChange={handleChange}
    >
      <option value="">Select</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>

  <div className="mb-3">
    <label className="form-label">Birth Date:</label>
    <input
      type="date"
      name="birthDate"
      className="form-control"
      value={formData.birthDate}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Phone Number:</label>
    <input
      type="text"
      name="phoneNumber"
      className="form-control"
      value={formData.phoneNumber}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">New Password:</label>
    <input
      type="password"
      name="password"
      className="form-control"
      value={formData.password}
      onChange={handleChange}
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Confirm Password:</label>
    <input
      type="password"
      name="confirmPassword"
      className="form-control"
      value={formData.confirmPassword}
      onChange={handleChange}
    />
  </div>

  <button type="submit" className="btn btn-primary w-100">
    Save Changes
  </button>
</form>

    );
};

export default ProfileEditForm;
