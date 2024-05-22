import axios from 'axios';

const API_URL = 'http://localhost:3001/api/address/';

const addAddress = (token, unit_number, street_number, city, region) => {
  return axios
    .post(API_URL + "addAddress", {
      unit_number,
      street_number,
      city,
      region
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      return response.data;
    });
};

const editAddress = (token, addressId, unit_number, street_number, city, region) => {
  return axios
    .put(API_URL + "addresses/" + addressId, {
      unit_number,
      street_number,
      city,
      region
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      return response.data;
    });
};
const deleteAddress = (token, addressId) => {
  return axios
    .delete(API_URL + "deleteAddress", {
      data: { addressId },
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      return response.data;
    });
};

const getAddresses = (token) => {
  return axios
    .get(API_URL + "getAddresses", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response) => {
      return response.data;
    });
};

const addressService ={
  addAddress,
  editAddress,
  deleteAddress,
  getAddresses
};

export default addressService;