// src/components/ProfileEditForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ProfileEditForm = ({ user, onSave }) => {
    // if (!user) {
    //     return <p>Loading...</p>;
    // }

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>

            <div>
                <label>Last Name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>

            <div>
                <label>Country:</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} />
            </div>

            <div>
                <label>Language:</label>
                <input type="text" name="language" value={formData.language} onChange={handleChange} />
            </div>

            <div>
                <label>Sex:</label>
                <select name="sex" value={formData.sex} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

            <div>
                <label>Birth Date:</label>
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
            </div>

            <div>
                <label>Phone Number:</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>

            <div>
                <label>New Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>

            <div>
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </div>

            <button type="submit">Save Changes</button>
        </form>
    );
};

export default ProfileEditForm;
