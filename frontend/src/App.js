// App.jsx

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import LoginForm from "./Components/TelaLogin/TelaLogin";
import MainPage from "./Components/MainPage";
import CadastroForm from "./Components/TelaCadastro/CadastroForm"; // Importar o componente CadastroForm

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {}
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/main" element={<MainPage resumeData={this.state.resumeData} />} />
            <Route path="/cadastro" element={<CadastroForm />} /> {/* Nova rota para a tela de cadastro */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
