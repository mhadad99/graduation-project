import React from 'react';

export default function InputField({ id, label, type, value, onChange, placeholder, error, onBlur, required }) {
    return (
        <div className={`mb-3 ${error ? 'was-validated' : ''}`}>
            <label htmlFor={id} className="form-label fs-5">{label}</label>
            <input
                type={type}
                className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onBlur={onBlur}
                required={required}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}