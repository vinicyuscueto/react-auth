import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Popup from "../../components/Popup/Popup";
import './Password.css';

const Password = () => {
  const { session, updatePassword } = useContext(AuthContext);
  const [lastPassword, setLastPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!lastPassword || !newPassword) {
      setError("Preencha todos os campos!");
      return;
    }

    if (!validatePassword(newPassword)) {
      setError("A nova senha deve possuir ao menos 8 caracteres!");
      return;
    }

    const res = updatePassword(session.email, lastPassword, newPassword);
    if (res) {
      setShowPopup(true);
    } else {
      setError("Senha incorreta!");
    }
  };

  const handleRedirect = () => {
    navigate("/profile");
    setLastPassword("");
    setNewPassword("");
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <div className="password-container">
          <Popup show={showPopup} redirect={handleRedirect} type="password" />
          <form className="password-form" onSubmit={handleSubmit}>
            <h3>Alterar Senha</h3>
            {error && <label className="error-message">{error}</label>}
            <div className="password-group">
              <label>Senha Atual:</label>
              <input
                type="password"
                placeholder="Digite sua senha atual"
                value={lastPassword}
                onChange={(e) => {
                  setLastPassword(e.target.value);
                  setError("");
                }}
              />
            </div>
            <div className="password-group">
              <label>Nova Senha:</label>
              <input
                type="password"
                placeholder="Digite sua nova senha"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError("");
                }}
              />
            </div>
            <button type="submit">Salvar Alterações</button>
            <Link to="/profile" className="back-link">Voltar para Meu Perfil</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Password;
