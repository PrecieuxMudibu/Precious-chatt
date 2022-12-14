/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import profilePicture from '../../images/profile.jpg';
import { applicationContext } from '../../App';

export default function RightSectionHeader() {
  const { contactIdentifiant } = useContext(applicationContext);
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    // const routeGetUser = `http://localhost:3200/api/users/${contactIdentifiant}`;
    const routeGetUser = `${process.env.REACT_APP_API_URL}/api/users/${contactIdentifiant}`;

    axios
      .get(routeGetUser)
      .then((response) => {
        setContactInfo(response.data.users);
      })
      .catch((error) => console.error(error));
  }, [contactIdentifiant]);
  return (
    <div className="right-section__header">
      <img
        src={profilePicture}
        alt="profil du contact"
        className="right-section__profile-picture"
      />
      <div className="right-section__text">
        <h1 className="right-section__name">{contactInfo.user_name}</h1>
        <div className="right-section__status">Online</div>
      </div>
    </div>
  );
}
