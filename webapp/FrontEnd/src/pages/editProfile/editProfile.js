import React, { useState } from 'react';
import AuthService from "../../services/auth.service";

const EditProfile = () => {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const user = AuthService.getCurrentUser();
    if (user && user.accessToken) {
      AuthService.editProfile(user.accessToken, password, phoneNumber)
        .then((response) => {
          setMessage(response.message);
        })
        .catch((error) => {
          setMessage(error.message || "An error occurred while updating the profile.");
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          New Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <label>
          New Phone Number:
          <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditProfile;