import React, { useState } from 'react';

export default function PasswordField({ id, label, value, onChange, placeholder, error, onBlur, required }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`mb-3 ${error ? 'was-validated' : ''}`}>
            <label htmlFor={id} className="form-label fs-5">{label}</label>
            <div className="position-relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control form-control-lg pe-5 ${error ? 'is-invalid' : ''}`}
                    id={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    required={required}
                />
                <i
                    className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '15px',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        color: '#6c757d',
                        zIndex: 2,
                    }}
                ></i>
            </div>
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );
}