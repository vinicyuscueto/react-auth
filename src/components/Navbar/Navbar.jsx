import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const checkWindowSize = () => {
        if (window.innerWidth > 768) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', checkWindowSize);
        checkWindowSize();

        return () => {
            window.removeEventListener('resize', checkWindowSize);
        };
    }, []);

    return (
        <>
            <div className="nav-bar">
                <div className="nav-logo">
                    <Link to="/home">Auth</Link>
                </div>
                <nav className="nav-links">
                    <Link to="/profile">Meu Perfil</Link>
                    <Link to="/password">Alterar Senha</Link>
                    <a href="#" onClick={() => { logout(), handleNavigation('/') }}>Sair</a>
                </nav>
                <div className="nav-menu-icon" onClick={() => setIsActive(!isActive)}>
                    <i className="bx bx-menu"></i>
                </div>
            </div>

            {isActive && (
                <div className="nav-overlay" onClick={() => setIsActive(false)}></div>
            )}

            <aside className={`sidebar ${isActive ? "active" : ""}`}>
                <nav className="sidebar-links">
                    <Link to="/profile">Meu Perfil</Link>
                    <Link to="/password">Alterar Senha</Link>
                    <a href="#" onClick={() => { logout(), handleNavigation('/') }}>Sair</a>
                </nav>
            </aside>
        </>
    );
};

export default Navbar;
