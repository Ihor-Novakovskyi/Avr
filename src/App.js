import React from 'react';
import MainPage from './Pages/MainPage/MainPage';
import Car from './Pages/Car/Car';
import Header from './Components/Header/Header';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes, NavLink, Navigate, Outlet, useParams } from "react-router-dom";
console.log(Router)
export default function App() { 
  return (
    <Router>
      <main className='main-page'>
        <div className='main-page__content'>
          <Header/>
          <Routes>
            <Route path="/" element={<MainPage/>} />
            <Route path="/vehicle/:vehicleId" element={<Car/>} />
        </Routes>
        </div>
      </main>
    </Router>
  )
}
