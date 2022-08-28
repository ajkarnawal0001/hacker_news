import React from 'react';
import { Routes, Route as Router } from 'react-router-dom';
import { DetailPage } from '../LandingPage/DetailPage';
import { Home } from '../LandingPage/Home';

export const Route = () => {
  return (
    <>
      <Routes>
        <Router path="/" element={<Home />} />
        <Router path="news/:objectID" element={<DetailPage />} />
      </Routes>
    </>
  );
};
