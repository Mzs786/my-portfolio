import React from "react";
import PropTypes from "prop-types";

const parseTags = (category) => {
  const match = category && category.match(/\(([^)]+)\)/);
  return match ? match[1].split(",").map(t => t.trim()).filter(Boolean) : [];
};

const stripTags = (category) => (category || "").replace(/\s*\([^)]*\)/, "").trim();

const TECH_ICONS = {
  "React": "devicon-react-original colored",
  "Node": "devicon-nodejs-plain colored",
  "Gemini": "fa fa-magic",
  "Streamlit": "devicon-python-plain colored",
  "Scikit-learn": "devicon-scikitlearn-plain colored",
  "FastAPI": "devicon-fastapi-plain colored",
  "Python": "devicon-python-plain colored",
  "Express": "devicon-express-original",
  "JWT": "fa fa-shield",
  "JavaScript": "devicon-javascript-plain colored",
  "Live APIs": "fa fa-bolt",
};

const Portfolio = ({ data }) => {
  if (!data || !data.projects) return null;

  return (
    <section id="portfolio" className="pf-section">
      <div className="pf-inner">
        <div className="rs-section-header pf-header">
          <h2 className="rs-heading">My Work</h2>
        </div>

        <div className="pf-grid">
          {data.projects.map((project) => {
            const img = "/images/portfolio/" + project.image;
            const tags = parseTags(project.category);
            const label = stripTags(project.category);

            return (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-card"
              >
                <div className="pf-img-wrap">
                  <img src={img} alt={project.title} className="pf-img" />
                  <div className="pf-img-overlay">
                    <span className="pf-view-btn">
                      <span>View Live App</span>
                      <i className="fa fa-external-link" style={{ marginLeft: "6px" }} />
                    </span>
                  </div>
                </div>
                <div className="pf-body">
                  <span className="pf-label">{label}</span>
                  <h3 className="pf-title">
                    <span>{project.title}</span>
                    <span className="pf-arrow">↗</span>
                  </h3>
                  {project.description && (
                    <p className="pf-desc">{project.description}</p>
                  )}
                  {tags.length > 0 && (
                    <div className="rs-tags" style={{ marginTop: "auto", paddingTop: "0.85rem" }}>
                      {tags.map((t) => {
                        const icon = TECH_ICONS[t];
                        return (
                          <span key={t} className="rs-tag">
                            {icon && <i className={`${icon} rs-tech-icon`} />}
                            <span>{t}</span>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

Portfolio.propTypes = {
  data: PropTypes.shape({
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        category: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default Portfolio;
