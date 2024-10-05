import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="layout">
        <div className="home-container">
          <div className="home-content">
            <h2>Seja bem-vindo ao Auth!</h2>
            <p>Auth é uma aplicação Web de autenticação de usuários, construída com o objetivo de sintetizar conhecimentos em React.js, utilizando Context API e LocalStorage.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
