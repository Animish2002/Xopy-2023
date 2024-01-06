import React, { useState } from 'react';
import './SignUp.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const SignUp = () => {
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [image, setImage] = useState(null);
  const navigate = useNavigate();
  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the data object with the exact keys as expected by the backend
    const userData = {
      shopname: shopName,
      ownername: ownerName,  // Make sure the case matches with the backend expectation
      phone: phoneNumber,
      email: email,
      password: password
    };
    
   try {
  const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, userData);
  if (res.data.success) {
    toast.success("Sign up successful. Redirecting to login...");
    setTimeout(() => {
      navigate('/login'); // Replace '/login' with your actual login page route
    }, 3000); // Redirect after 3 seconds

  } else {
    toast.error(res.data.message || "Sign up failed. Please try again.");
  }
} catch (error) {
  console.error("Sign up error:", error);
  toast.error(error.response?.data?.message || "An error occurred during sign up.");
}
  };
  // // Function to handle the image upload
  // const handleImageUpload = (e) => {
  //   setImage(e.target.files[0]);
  // };

  return (
    <div className="signup-form">
   
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name of the shop" value={shopName} onChange={(e) => setShopName(e.target.value)} />
        <input type="text" placeholder="Name of the owner" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
        <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {/* <input type="file" placeholder="Upload a logo/photo of the owner" onChange={handleImageUpload} /> */}
        <button type="submit">Get started</button>
      </form>
    </div>
  );
};

export default SignUp;
