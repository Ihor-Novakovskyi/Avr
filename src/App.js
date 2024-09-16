import React,{useEffect} from 'react';
import MainPage from './Pages/MainPage/MainPage';
import Car from './Pages/Car/Car';
import Header from './Components/Header/Header';
import { useDispatch } from 'react-redux';
import { getCars } from './utils/reducer';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route, Routes, NavLink, Navigate, Outlet, useParams } from "react-router-dom";
console.log(Router)
export default function App() { 
  const dispatch = useDispatch();
     useEffect(() => {
    dispatch(getCars());
    }, []);
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
