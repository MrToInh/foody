import React from 'react'

import { Routes, Route} from "react-router-dom";



import Login from "./pages/Login/LoginPage";
import Register from "./pages/Register/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import Profile from "./pages/Profile/Profile";
import FoodPage from "./pages/Food/FoodPage"

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
      <Route path="/search/:searchTerm" element={<HomePage />}/>
      <Route path="/food/:id" element={<FoodPage />}/>
      {/* <Route exact path="/cart" element={<CartPage />} /> */}
      {/* <Route path="/user" element={<BoardUser />} /> */}
      {/* <Route path="/mod" element={<BoardModerator />} /> */}
      {/* <Route path="/admin" element={<BoardAdmin />} /> */}
    </Routes>

  )
}
