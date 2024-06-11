import React, { Component } from 'react';
import Zmage from 'react-zmage';
import Fade from 'react-reveal';

class Portfolio extends Component {
  render() {
    if (!this.props.data) return null;

    const projects = this.props.data.projects.map((project, index) => {
      let projectImage = "images/portfolio/" + project.image;

      return (
        <div key={index} className="columns portfolio-item">
          <div className="item-wrap">
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <Zmage alt={project.title} src={projectImage} />
              <div style={{ textAlign: "center" }}>{project.title}</div>
            </a>
          </div>
        </div>
      );
    });

    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Artigos</h1>
              <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {projects}
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;
