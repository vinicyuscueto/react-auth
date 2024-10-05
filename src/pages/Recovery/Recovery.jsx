import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import './Recovery.css';

const Recovery = () => {
  const { recovery } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");

  const toggleEdit = () => {
    setEnableEdit(!enableEdit);
  };

  const clipText = () => {
    navigator.clipboard.writeText(password); // Isso agora funcionará corretamente
  }

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Preencha todos os campos!");
      return;
    }

    if (!validateEmail(email)) {
      setError("E-mail inválido!");
      return;
    }

    const res = recovery(email);
    if (res) {
      setPassword(res);
      toggleEdit();
    } else {
      setError("E-mail não cadastrado!");
      return;
    }
  };

  return (
    <div className="layout">
      <div className="recovery-container">
        <div className="recovery-form">
          <h2>Auth</h2>
          {error && <label className="error-message">{error}</label>}
          {!enableEdit ? (
            <div className="recovery-group">
              <label>E-mail:</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>
          ) : (
            <div className="recovery-info">
              {alert && <label className="alert-message">{alert}</label>}
              <span>Nova Senha: {password}</span>
              <label>Anote sua nova senha em um local seguro.</label>
              <button onClick={() => { clipText(); setAlert("Senha copiada!"); }}>Copiar Senha</button>
            </div>
          )}

          {!enableEdit && (
            <button type="submit" onClick={handleSubmit}>Recuperar Senha</button>
          )}
          <Link to="/" className="back-link">Voltar para o Início</Link>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
