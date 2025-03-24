import React, { useEffect, useState } from "react";
import "./Auth.scss";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, registerUser } from "../../Features/userSlice";
import {
  emailRegex,
  uppercaseAlphabats,
  lowercaseAlphabats,
  spacialCharacter,
  numberRegex,
} from "../../utils/regex.js";
import toast from "react-hot-toast";

const initialData = {
  name: "",
  email: "",
  password: "",
};

/**
 * Authentication component for handling user login and registration.
 * @param {Object} props - Component props.
 * @param {Function} props.setShowLogin - Function to toggle the login modal visibility.
 */
const Auth = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const [curruntState, setCurruntState] = useState("Log In"); // Current state of the form (Log In or Sign Up)
  const [data, setData] = useState(initialData); // Form data state
  const [errors, setErrors] = useState(initialData); // Form validation errors
  const users = useSelector((state) => state.userSlice.users); // List of registered users from Redux store

  /**
   * Handles input changes for the form fields.
   * @param {Object} e - Event object from the input field.
   */
  const handleChange = (e) => {
    setErrors(initialData);
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  /**
   * Handles the authentication process (Log In or Sign Up).
   * Validates the form fields and dispatches actions to the Redux store.
   * @param {Object} e - Event object from the form submission.
   */
  const handleAuth = (e) => {
    try {
      e.preventDefault();
      const { name, email, password } = data;

      let newErrorObj = { ...initialData };

      // Validation for Sign Up
      if (curruntState === "Sign Up") {
        if (name === "") {
          newErrorObj.name = "Please provide the name";
        }

        if (!password) {
          newErrorObj.password = "Please enter Password";
        } else if (password.length <= 7) {
          newErrorObj.password = "Password length must be 8 or more";
        } else if (!uppercaseAlphabats.test(password)) {
          newErrorObj.password = "Password must contain one uppercase letter";
        } else if (!lowercaseAlphabats.test(password)) {
          newErrorObj.password = "Password must contain one lowercase letter";
        } else if (!spacialCharacter.test(password)) {
          newErrorObj.password = "Password must contain one special character";
        } else if (!numberRegex.test(password)) {
          newErrorObj.password = "Password must contain numbers";
        }
      }

      // Validation for email
      if (email.length <= 0) {
        newErrorObj.email = "Please provide the email";
      } else if (!emailRegex.test(email)) {
        newErrorObj.email = "Please provide a valid email";
      }

      setErrors(newErrorObj);

      // If there are validation errors, stop the process
      if (Object.values(newErrorObj).some((error) => error.length > 0)) {
        console.log("Validation failed");
        return;
      }

      // Handle Sign Up
      if (curruntState === "Sign Up") {
        const user = users.find((user) => user.email === email);

        if (user) {
          setErrors((error) => ({
            ...error,
            email: "This email is already registered",
          }));
          return;
        } else {
          dispatch(registerUser(data));
          toast.success("User registered successfully");
          setShowLogin(false);
        }
      } else {
        // Handle Log In
        const user = users.find((user) => user.email === email);

        if (user) {
          if (password === user.password) {
            dispatch(logInUser(email));
            toast.success("User logged in successfully");
            setShowLogin(false);
          } else {
            console.log("Invalid credentials");
          }
        } else {
          setCurruntState("Sign Up");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Logs the list of users whenever it changes.
   */
  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <div className="auth">
      <div className="container">
        <div className="close" onClick={() => setShowLogin(false)}>
          <img src={assets.cross} alt="Close" />
        </div>
        <h1>{curruntState}</h1>
        <div className="form-container">
          <form action="">
            {curruntState === "Sign Up" && (
              <div className="input">
                <label htmlFor="name">Name</label>
                <span>{errors.name}</span>
                <div className="input-field">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={errors.name === "" ? "" : "error"}
                    placeholder="Enter name here"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
            <div className="input">
              <label htmlFor="email">Email</label>
              <span>{errors.email}</span>
              <div className="input-field">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={errors.email === "" ? "" : "error"}
                  placeholder="Enter email here"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="input">
              <label htmlFor="Password">Password</label>
              <span>{errors.password}</span>
              <div className="input-field">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={errors.password === "" ? "" : "error"}
                  placeholder="Enter Password here"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="auth-btn">
              <button onClick={handleAuth}>{curruntState}</button>
            </div>
          </form>
        </div>
        <div className="auth-condition">
          {curruntState === "Log In" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurruntState("Sign Up")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurruntState("Log In")}>Log in here</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;