import React from 'react';

export default function FormButton({ isLoading, text }) {
    return (
        <button
            type="submit"
            className="btn continue-btn w-100 mb-4 py-3"
            disabled={isLoading}
        >
            {isLoading ? `${text}...` : text}
        </button>
    );
}