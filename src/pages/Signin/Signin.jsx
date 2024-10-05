import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import './Signin.css';

const Signin = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    const res = login(email, password);
    if (res) {
      navigate("/home");
    } else {
      setError("E-mail ou senha incorretos!");
    }
  };

  return (
    <>
      <div className="layout">
        <div className="signin-container">
          <form className="signin-form" onSubmit={handleSubmit}>
            <h2>Auth</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="signin-group">
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

            <div className="signin-group">
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
            <Link to="/recovery" className="back-link-between">Esqueci minha senha?</Link>
            <button type="submit">Entrar</button>
            <Link to="/signup" className="back-link">Não tem uma conta? Crie uma!</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
