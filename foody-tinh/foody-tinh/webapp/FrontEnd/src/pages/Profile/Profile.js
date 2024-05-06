import React, { useState } from 'react';
import data from '../../data';
import classes from './profile.module.css';
import userAvatar from '../../img/user_avatar.jpg';

const Profile = () => {
  const initialData = data.users[0];
  const [userData, setUserData] = useState(initialData);
  const [activeSection, setActiveSection] = useState('profile'); // Control active section

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return userData ? (
    <div className={classes.profileContainer}>
      <div className={classes.sidebar}>
        <img src={userAvatar} alt={`Avatar of ${userData.username}`} className={classes.avatar} />
        <button onClick={() => setActiveSection('profile')} className={classes.sidebarButton}>
          Hồ sơ
        </button>
        <button onClick={() => setActiveSection('orderHistory')} className={classes.sidebarButton}>
          Lịch sử đặt hàng
        </button>
      </div>
      <div className={classes.content}>
        {activeSection === 'profile' ? (
          <div>
            {/* Profile inputs */}
            {/* Implement your form groups here */}
          </div>
        ) : (
          <div>
            {/* Order history information */}
            <p>Order history details will be displayed here...</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>No user data found</div>
  );
};

export default Profile;
