// Validate email format
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

// Check if a field is empty
export const isFieldEmpty = (value) => value.trim() === '';

// Check if the password is too short
export const isPasswordTooShort = (password, minLength = 6) => password.length < minLength;