import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Header from '../Layout/Header/Header'
import Registration from '../Components/Registration'
import Prof from '../Components/Prof'
import Details from '../Components/Details'

const Routing = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="" element={<Registration />} />
        <Route path="prof" element={<Prof />} />
        <Route path="prof/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default Routing