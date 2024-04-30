import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Services from './Services';
import About from './About';
import Contact from './Contact';

const Navbar: React.FC = () => {
    const handleClick = (yo: string, e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(yo + "  -  " + e.target);
    };

    const handleJumpClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.open('https://www.youtube.com/watch?v=MTovRtERP5U', 'height=600,width=800');
    };

    return (
        <BrowserRouter>
            <nav className="navbar">
                <h1><a href="/"> ehefactory </a></h1>
                <div className='links'>
                    <a href="/"> Home </a>
                    <a href="/services"> Services </a>
                    <a href="/about"> About </a>
                    <a href="/contact"> Contact </a>
                    <a href="/" onClick={handleJumpClick} style={{
                        color: 'hsl(0100, 100%, 0%)',
                        backgroundColor: 'hsl(208, 96%, 90%)',
                        borderRadius: '8px'
                    }}> Jump! </a>
                </div>
            </nav>
            <div className='content'>
                <Routes>
                    <Route path="/" element={<Home handleClick={handleClick} />} />
                    <Route path="services" element={<Services />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Navbar;