import React, { useEffect, useState } from 'react';
import './Popup.css';

const Popup = ({ show, redirect, type }) => {
    const [visible, setVisible] = useState(false);

    const messages = {
        signup: "Usuário cadastrado com sucesso!",
        password: "Senha alterada com sucesso!",
        profile: "Perfil atualizado com sucesso!",
    };

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                if (redirect) redirect();
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [show, redirect]);

    if (!visible) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <i className='bx bx-check-circle'></i>
                <label>{messages[type]}</label>
            </div>
        </div>
    );
};

export default Popup;
