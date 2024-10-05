import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Popup from '../../components/Popup/Popup';
import './Profile.css';

const Profile = () => {
  const { session, updateUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [career, setCareer] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableEdit, setEnableEdit] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (session) {
      setName(session.name);
      setCareer(session.career);
      setEmail(session.email);
    }
  }, [session]);

  const toggleEdit = () => {
    setEnableEdit(!enableEdit);
    setError('');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !career || !email || !password) {
      setError('Preencha todos os campos!');
      return;
    }

    if (!validateEmail(email)) {
      setError('E-mail inválido!');
      return;
    }

    const res = updateUser(name, career, email, password);
    if (res) {
      setShowPopup(true);
    } else {
      setError('Senha incorreta!');
    }
  };

  const handleRedirect = () => {
    setEnableEdit(false);
    setPassword('');
    setShowPopup(false);
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <div className="profile-container">
          <Popup show={showPopup} redirect={handleRedirect} type="profile" />
          <form className="profile-form">
          <h3>{enableEdit ? 'Editar Perfil' : 'Meu Perfil'}</h3>
            {!enableEdit && (
              <div className="avatar">
                <i className='bx bxs-user-circle'></i>
              </div>
            )}
            {error && <label className="error-message">{error}</label>}
            {!enableEdit ? (
              <>
                <div className="profile-info">
                  <span>Nome:</span>
                  <span>{session?.name || ''}</span>
                </div>
                <div className="profile-info">
                  <span>Profissão:</span>
                  <span>{session?.career || ''}</span>
                </div>
                <div className="profile-info">
                  <span>E-mail:</span>
                  <span>{session?.email || ''}</span>
                </div>
                <button type="button" onClick={toggleEdit}>Editar Perfil</button>
              </>
            ) : (
              <>
                <div className="profile-group">
                  <span>Nome:</span>
                  <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <div className="profile-group">
                  <span>Profissão:</span>
                  <input
                    type="text"
                    placeholder="Digite sua profissão"
                    value={career}
                    onChange={(e) => {
                      setCareer(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <div className="profile-group">
                  <span>E-mail:</span>
                  <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <div className="profile-group">
                  <span>Senha:</span>
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                  />
                </div>
                <button type="button" onClick={handleSubmit}>Salvar Alterações</button>
                <Link to="/profile" className="back-link" onClick={toggleEdit}>Fechar Painel</Link>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
