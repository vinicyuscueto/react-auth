import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Popup from "../../components/Popup/Popup";
import './Signup.css';

const Signup = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [career, setCareer] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !career || !email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    if (!validateEmail(email)) {
      setError("E-mail inválido!");
      return;
    }

    if (!validatePassword(password)) {
      setError("A senha deve possuir ao menos 8 caracteres!");
      return;
    }

    const res = register(name, career, email, password);
    if (res) {
      setShowPopup(true);
    } else {
      setError("E-mail já cadastrado!");
    }
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="layout">
      <div className="signup-container">
        <Popup show={showPopup} redirect={handleRedirect} type="signup" />
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Auth</h2>
          {error && <label className="error-message">{error}</label>}
          <div className="signup-group">
            <label>Nome:</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="signup-group">
            <label>Profissão:</label>
            <input
              type="text"
              placeholder="Digite sua profissão"
              value={career}
              onChange={(e) => {
                setCareer(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="signup-group">
            <label>E-mail:</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="signup-group">
            <label>Senha:</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>

          <button type="submit">Cadastrar</button>
          <Link to="/" className="back-link">Já tem uma conta? Entre agora!</Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
