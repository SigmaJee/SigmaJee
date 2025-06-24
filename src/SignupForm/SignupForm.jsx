import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SignupPage.css';
import { set, useForm } from 'react-hook-form';
import 'aos/dist/aos.css';
import { NavLink, replace, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../LoginContext/loginContext';
const SignupPage = ({ elements }) => {
    const navigate = useNavigate();
    const passRef = useRef("");
    const { setloading } = elements;
    const { setUser } = useAuth();
    const [show, setshow] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = useForm();

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const timer = setTimeout(() => {
                clearErrors();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors, clearErrors]);

    const ValidateName = (name) => {
        const regex = /^[a-zA-Z]*$/;
        return regex.test(name) || "Name should only consist of letters";
    }

    const ValidateClass = (Class) => {
        if (Class.length > 2 || Class.length === 0) return "Enter valid class (1-99)";
        const regex = /^[1-9][0-2]?$/;
        return regex.test(Class) || "Enter valid class (1-12)";
    }
    const api = import.meta.env.VITE_API;
    const onSubmit = async (data) => {
        const email = sessionStorage.getItem("email");

        await axios.post(`${api}/create-user`, { Email: email, Name: data.Name, Class: data.Class, Password: data.Pass }).then((res) => {
            setloading(true);
            setTimeout(() => {
                setloading(false);
                reset();
                setUser(true);
                navigate("/home", { replace: true });
            }, 3000);

        }).catch((Err) => {
            console.log(Err);
        })
    }
    const onBack = async () => {
        const email = sessionStorage.getItem("email");
        await axios.post(`${api}/delete-user`, { Email: email }).then((res) => {
            sessionStorage.removeItem("email");
            setUser(false);
            navigate("/", { replace: true });
        }).catch((err) => {
            console.log("Err in back");
        })
    }
    return (
        <div className="signup-page-container">
            <div className="left-section">
                <motion.div className="logo-circle"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="logo-text">ΣJ</span>
                </motion.div>
            </div>

            <div className="right-section">
                <div className="signup-card">
                    <h2 className="form-heading">Sigma JEE</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Enter your name"
                            {...register('Name', { validate: ValidateName, required: "Name is required" })}
                        />
                        {errors.Name &&
                            <span data-aos="fade-right" style={{ color: "red" }}>
                                {errors.Name.message}
                            </span>
                        }

                        <input type="text" placeholder="Enter your class"
                            {...register('Class', { validate: ValidateClass, required: "Class is required" })}
                        />
                        {errors.Class &&
                            <span data-aos="fade-right" style={{ color: "red" }}>
                                {errors.Class.message}
                            </span>
                        }

                        <input type={show ? "text" : "password"} placeholder="Enter password"
                            {...register('Pass', { required: "Password is required" })}
                            onChange={(e) => { passRef.current = e.target.value }}
                        />
                        {errors.Pass &&
                            <span data-aos="fade-right" style={{ color: "red" }}>
                                {errors.Pass.message}
                            </span>
                        }

                        <input type={show ? "text" : "password"} placeholder="Confirm password"
                            {...register('CPass', {
                                required: "Confirm Password is required",
                                validate: (value) => value === passRef.current || "Passwords do not match"
                            })}
                        />
                        {errors.CPass &&
                            <span data-aos="fade-right" style={{ color: "red" }}>
                                {errors.CPass.message}
                            </span>
                        }
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", height: "20px", width: "20px" }}>
                            <input
                                type="checkbox"
                                style={{ margin: 0 }}
                                onChange={(e) => setshow(e.target.checked)}
                                id="a"
                            />
                            <span>Show Password</span>
                        </label>



                        <button type="submit">Sign Up</button>
                    </form>

                    <p className="login-text">
                        Already have an account? <span className="login-link" onClick={onBack}>Login</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
