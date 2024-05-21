import React, { useState, useEffect } from 'react';
import AuthService from "../../services/auth.service";
import addressService from "../../services/address.sevice";

const GetAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [unitNumber, setUnitNumber] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user && user.accessToken) {
        addressService.getAddresses(user.accessToken)
        .then((response) => {
          setAddresses(response);
        })
        .catch((error) => {
          setMessage(error.message || "An error occurred while getting the addresses.");
        });
    }
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id);
    setUnitNumber(address.unit_number);
    setStreetNumber(address.street_number);
    setCity(address.city);
    setRegion(address.region);
  };
  
  const handleEditAddress = (addressId) => {
    setEditingAddressId(addressId);
  };
  const handleDeleteAddress = async (addressId) => {
    const user = AuthService.getCurrentUser();
    if (user && user.accessToken) {
      try {
        await addressService.deleteAddress(user.accessToken, addressId);
        // Refresh the addresses
        const response = await addressService.getAddresses(user.accessToken);
        setAddresses(response);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };
  const handleSaveAddress = async (event) => {
  event.preventDefault();
  const user = AuthService.getCurrentUser();
  if (user && user.accessToken) {
    try {
      await addressService.editAddress(user.accessToken, editingAddressId, unitNumber, streetNumber, city, region);
      setEditingAddressId(null);
      setSelectedAddressId(null);
      // Refresh the addresses
      const response = await addressService.getAddresses(user.accessToken);
      setAddresses(response);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
};

  return (
    <div>
      <h1>Addresses</h1>
      {addresses.map((address, index) => (
        <div key={index} onClick={() => handleSelectAddress(address)}>
          {editingAddressId === address.id ? (
            <form onSubmit={handleSaveAddress}>
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
              <button type="submit" >Save</button>
            </form>
          ) : (
            <div>
              <p>Unit Number: {address.unit_number}</p>
              <p>Street Number: {address.street_number}</p>
              <p>City: {address.city}</p>
              <p>Region: {address.region}</p>
              {selectedAddressId === address.id && (
                <div>
                  <button onClick={() => handleEditAddress(address.id)}>Edit</button>
                  <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
};

export default GetAddresses;