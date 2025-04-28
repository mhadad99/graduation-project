import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Login.css';
import { registerUser } from '../../api/auth';
import { validateEmail, isFieldEmpty, isPasswordTooShort } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from "../../store/slices/authSlice";
import { useNavigate } from 'react-router-dom';


export default function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, isLoggedIn, error } = useSelector((state) => state.authSlice);
    useEffect(() => {
        const url = window.location.pathname;
        if (url === "/register" && isLoggedIn) {
            navigate("/");
        }
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        second_name: '',
        user_name: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const isEmailEmpty = isFieldEmpty(formData.email);
    const isEmailValid = !isEmailEmpty && validateEmail(formData.email);
    const showEmptyEmailError = (touched || submitted) && isEmailEmpty;
    const showInvalidEmailError = (touched || submitted) && !isEmailEmpty && !isEmailValid;

    const isPasswordEmpty = isFieldEmpty(formData.password);
    const showPasswordError = (touched || submitted) && (isPasswordEmpty || isPasswordTooShort(formData.password));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTouched(true);
        setErrorMessage('');
        setSuccessMessage('');

        if (!isEmailValid || isPasswordEmpty || isPasswordTooShort(formData.password)) return;

        dispatch(registerAction(formData))
            .unwrap()
            .then(() => {
                navigate("/login");
            })
            .catch((err) => {
                console.error("Register failed:", err);
            });
    };

    const handleBlur = () => setTouched(true);

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src="../TANFEEZ.png" alt="Tanfeez Logo" className="logo" />
            </div>

            <div className="login-card">
                <h2 className="text-center mb-4">Register for Tanfeez</h2>

                <form onSubmit={handleSubmit} noValidate>
                    {/* First Name */}
                    <div className="mb-3">
                        <label htmlFor="first_name" className="form-label fs-5">First Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label htmlFor="second_name" className="form-label fs-5">Last Name</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="second_name"
                            name="second_name"
                            value={formData.second_name}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className={`mb-3 ${(showEmptyEmailError || showInvalidEmailError) ? 'was-validated' : ''}`}>
                        <label htmlFor="email" className="form-label fs-5">Email</label>
                        <input
                            type="email"
                            className={`form-control form-control-lg ${(showEmptyEmailError || showInvalidEmailError) ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            onBlur={handleBlur}
                            required
                        />
                        {showEmptyEmailError && <div className="invalid-feedback">This field is required</div>}
                        {showInvalidEmailError && <div className="invalid-feedback">Please enter a valid email address</div>}
                    </div>

                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="user_name" className="form-label fs-5">Username</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="user_name"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className={`mb-3 ${showPasswordError ? 'was-validated' : ''}`}>
                        <label htmlFor="password" className="form-label fs-5">Password</label>
                        <div className="position-relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`form-control form-control-lg pe-5 ${showPasswordError ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                onBlur={handleBlur}
                                required
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
                        {showPasswordError && (
                            <div className="invalid-feedback d-block">
                                {isPasswordEmpty ? 'This field is required' : 'Password must be at least 6 characters'}
                            </div>
                        )}
                    </div>

                    {error && <div className="alert alert-danger py-2">{error}</div>}
                    {successMessage && <div className="alert alert-success py-2">{successMessage}</div>}

                    <button
                        type="submit"
                        className="btn continue-btn w-100 mb-4 py-3"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="signup-prompt text-center mt-4">
                    <p className="fs-6 mb-2">Already have an account?</p>
                    <a href="/login" className="btn btn-outline-success">Sign In</a>
                </div>
            </div>
        </div>
    );
}
