import React, { Component } from "react";
import { Link } from "react-router-dom"; // Importe o componente Link
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";

class Header extends Component {
  handleLogout = () => {
    // Aqui você pode implementar a lógica de logout
    // Por exemplo, limpar os dados de autenticação do usuário no navegador
    // E então redirecionar para a página de login
  };

  render() {
    if (!this.props.data) return null;

    const project = this.props.data.project;
    const name = this.props.data.name;
    const description = this.props.data.description;

    return (
      <header id="home">
        <ParticlesBg type="circle" bg={true} />
        <div className='background'>
          <img src="https://imgur.com/6OCOVRN.jpg" alt="" />
        </div>

        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#resume">
                Nossos Objetivos
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#about">
                Nae
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#portfolio">
                Artigos
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#chat">
                Chat
              </a>
            </li>
            <li>
              <Link to="/" className="button btn github-btn" onClick={this.handleLogout}>
                <i className="fa fa-sign-out"></i>Exit
              </Link>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3 >{description}.</h3>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                <a href={project} className="button btn project-btn">
                  <i className="fa fa-book"></i>Project
                </a>
              </ul>
            </Fade>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header;
