import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserProfile } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../client';
import Pins from './Pins';

const Home = () => {
  const [user, setUser] = useState();

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);


  return (
    <Routes>
      <Route path="/user-profile/:userId" element={<UserProfile />} />
      <Route path="/*" element={<Pins user={user && user} />} />
    </Routes>
  );
};

export default Home;