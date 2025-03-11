import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Appointment from './Pages/Appointment';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ChatApp from './Pages/ChatApp';
import BookingHours from './Pages/BookingHours';
import Profile from './Pages/Profile';
import UserProfile from './Pages/UserProfile';
import ApBooking from './Components/ApBooking';
import Dashboard from './Pages/PagesData/Admin/Dashboard';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <>
            <Home />
            <ApBooking />
            <About />
            <Services />
            <Contact />
          </>
        } />
        
        {/* Authentication routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Appointment routes */}
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment/book" element={<BookingHours />} />

        {/* Protected routes - require authentication */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/team" element={<Profile />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/admin" element={<Dashboard />} />

        {/* Legacy route redirects */}
        <Route path="/login_user" element={<Navigate to="/login" replace />} />
        <Route path="/dental-clinic/slot" element={<Navigate to="/appointment/book" replace />} />
        <Route path="/dental-clinic/appointment" element={<Navigate to="/appointment" replace />} />
        <Route path="/dental-clinic/team" element={<Navigate to="/team" replace />} />
        <Route path="/dental-clinic/user/profile" element={<Navigate to="/profile" replace />} />
        <Route path="/dental-clinic/user/chat_section" element={<Navigate to="/chat" replace />} />
        <Route path="/dental-clinic/admin-person" element={<Navigate to="/admin" replace />} />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
