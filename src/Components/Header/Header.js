import React from "react";
import './Header.css';
import link1 from './avtopro.svg'
import link2 from './another.png'
export default function Header() { 
    return (
        <header className="main-page__header">
            <img src={ link1 } alt="" className="main-page__logo-1" />
            <img src={link2} alt="" className="main-page__logo-2" />
        </header>
    )
}