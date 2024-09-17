import React from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';
import link1 from './avtopro.svg'
import link2 from './another.png'
export default function Header() { 
    const navigate = useNavigate();
    return (
        <header className="main-page__header">
            <img
                onClick={() => navigate('/')}
                src={ link1 }
                alt=""
                className="main-page__logo-1"
            />
            <img src={link2} alt="" className="main-page__logo-2" />
        </header>
    )
}