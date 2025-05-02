import React from 'react';

export default function AlertMessage({ message, type }) {
    if (!message) return null;

    return (
        <div className={`alert alert-${type} py-2`}>
            {message}
        </div>
    );
}