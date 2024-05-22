import React, { useState } from 'react';
import AuthService from "../../services/auth.service";
import addressService from "../../services/address.sevice";

const DeleteAddress = () => {
  const [addressId, setAddressId] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const user = AuthService.getCurrentUser();
    if (user && user.accessToken) {
      addressService.deleteAddress(user.accessToken, addressId)
        .then((response) => {
          setMessage(response.message);
        })
        .catch((error) => {
          setMessage(error.message || "An error occurred while deleting the address.");
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Address ID:
          <input type="text" value={addressId} onChange={(e) => setAddressId(e.target.value)} />
        </label>
        <button type="submit">Delete Address</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteAddress;