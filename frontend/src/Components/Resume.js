import React, { Component } from "react";
import Slide from "react-reveal";

class Resume extends Component {
  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.props.data) return null;

    const objectives = this.props.data.objectives.map(function (objectives) {
      return (
        <div key={objectives.title}>
          <h3>{objectives.title}</h3>
          <p className="info">
            {objectives.subtitle} <span>&bull;</span>
            <em className="date">{objectives.graduated}</em>
          </p>
          <p>{objectives.description}</p>
        </div>
      );
    });

    return (
      <section id="resume">
        <Slide left duration={1300}>
          <div className="row objectives">
            <div className="three columns header-col">
              <h1>
                <span>Campus-Seguro</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{objectives}</div>
              </div>
            </div>
          </div>
        </Slide>
      </section>
    );
  }
}

export default Resume;
