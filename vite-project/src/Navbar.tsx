import React from 'react';
import { Link } from 'react-router-dom'; // Link: client side routing

const Navbar: React.FC = () => {
    const handleJumpClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.open('https://www.youtube.com/watch?v=MTovRtERP5U', 'height=600,width=800');
    };

    return (
        <>
            <nav className="navbar">
                <h1><Link to="/"> ehefactory </Link></h1>
                <div className='links'>
                    <Link to="/"> Home </Link>
                    <Link to="/services"> Services </Link>
                    <Link to="/about"> About </Link>
                    <Link to="/notreal"> NotReal </Link>
                    <Link to="/create"> New Blog </Link>
                    <Link to="/" onClick={handleJumpClick} style={{
                        color: 'hsl(0100, 100%, 0%)',
                        backgroundColor: 'hsl(208, 96%, 90%)',
                        borderRadius: '8px'
                    }}> Jump! </Link>
                </div>
            </nav>
        </>

    );
}

export default Navbar;