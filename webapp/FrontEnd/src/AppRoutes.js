import React from 'react'
import { Routes, Route} from "react-router-dom";

import Login from "./pages/Login/LoginPage";
import Register from "./pages/Register/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/editProfile/editProfile"; // import the EditProfile page
import GetAddresses from "./pages/Address/getAddress";
import AddAddress from "./pages/Address/createAddress"; // import the AddAddress page
import EditAddress from "./pages/Address/editAddress"; // import the EditAddress page
import DeleteAddress from "./pages/Address/deleteAddress";

// import BoardUser from "./components/BoardUser";
// import BoardModerator from "./components/BoardModerator";
// import BoardAdmin from "./components/BoardAdmin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route exact path={"/home"} element={<HomePage />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/editProfile" element={<EditProfile />} /> {/* add the new route here */}
      <Route path="/search/:searchTerm" element={<HomePage />}/>
      <Route exact path="/getaddresses" element={<GetAddresses />} /> {/* add the new route here */}
      <Route exact path="/addaddress" element={<AddAddress />} /> {/* add the new route here */}
      <Route exact path="/editaddress" element={<EditAddress />} /> {/* add the new route here */}
      <Route exact path="/deleteaddress" element={<DeleteAddress />} /> {/* add the new route here */}

    </Routes>
  )
}