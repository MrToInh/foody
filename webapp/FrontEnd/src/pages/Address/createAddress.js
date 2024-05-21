import React, { useState } from 'react';
import AuthService from '../../services/auth.service';
import addressService from "../../services/address.sevice";

const AddAddress = () => {
  const [unitNumber, setUnitNumber] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const user = AuthService.getCurrentUser();
    if (user && user.accessToken) {
      addressService.addAddress(user.accessToken, unitNumber, streetNumber, city, region)
        .then((response) => {
          setMessage(response.message);
        })
        .catch((error) => {
          setMessage(error.message || "An error occurred while adding the address.");
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Unit Number:
          <input type="text" value={unitNumber} onChange={(e) => setUnitNumber(e.target.value)} />
        </label>
        <label>
          Street Number:
          <input type="text" value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)} />
        </label>
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          Region:
          <input type="text" value={region} onChange={(e) => setRegion(e.target.value)} />
        </label>
        <button type="submit">Add Address</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddAddress;