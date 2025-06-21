import React from "react";
import PropTypes from "prop-types";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Resume Component Error:", error, info);
  }

  render() {
    return this.state.hasError ? (
      <div className="resume-error" role="alert">
        ⚠️ Error loading resume section. Please try refreshing the page.
      </div>
    ) : (
      this.props.children
    );
  }
}

// Reusable Section Component
const Section = ({ title, children, ariaLabel }) => (
  <section className="resume-section" aria-label={ariaLabel}>
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
    </div>
    <div className="section-content">{children}</div>
  </section>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
};

const Resume = ({ data }) => {
  if (!data)
    return <div className="loading">Loading resume data...</div>;

  // Destructure data with fallback defaults
  const {
    education = [],
    work = [],
    skills = [],
    skillmessage = "Technical Proficiencies",
  } = data;

  return (
    <ErrorBoundary>
      <main id="resume" className="resume-container">
        {/* Education Section */}
        <Section title="Education" ariaLabel="Education History">
          {education.length > 0 ? (
            education.map((edu) => (
              <article key={edu.school} className="timeline-item">
                <h3>{edu.school}</h3>
                <div className="meta">
                  <span className="degree">{edu.degree}</span>
                  <span aria-hidden="true" className="separator"></span>
                  <time dateTime={edu.graduated}>{edu.graduated}</time>
                </div>
                {edu.description && (
                  <p className="description">{edu.description}</p>
                )}
              </article>
            ))
          ) : (
            <p>No education data available.</p>
          )}
        </Section>

        {/* Experience Section */}
        <Section title="Experience" ariaLabel="Work Experience">
          {work.length > 0 ? (
            work.map((job) => (
              <article key={job.company} className="timeline-item">
                <h3>{job.company}</h3>
                <div className="meta">
                  <span className="role">{job.title}</span>
                  <span aria-hidden="true" className="separator"></span>
                  <time dateTime={job.years}>{job.years}</time>
                </div>
                {job.description && (
                  <p className="description">{job.description}</p>
                )}
              </article>
            ))
          ) : (
            <p>No work experience data available.</p>
          )}
        </Section>

        {/* Skills Section */}
        <Section title="Skills" ariaLabel="Technical Skills">
          <p className="skill-intro">{skillmessage}</p>
          <div className="skills-grid">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div key={skill.name} className="skill-category">
                  <h4>{skill.name}</h4>
                  <ul className="skill-list">
                    {skill.items && skill.items.length > 0 ? (
                      skill.items.map((item) => (
                        <li key={item} className="skill-item">
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="skill-item">No skills listed</li>
                    )}
                  </ul>
                </div>
              ))
            ) : (
              <p>No skills data available.</p>
            )}
          </div>
        </Section>
      </main>
    </ErrorBoundary>
  );
};

Resume.propTypes = {
  data: PropTypes.shape({
    education: PropTypes.arrayOf(
      PropTypes.shape({
        school: PropTypes.string.isRequired,
        degree: PropTypes.string.isRequired,
        graduated: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    work: PropTypes.arrayOf(
      PropTypes.shape({
        company: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        years: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ),
    skillmessage: PropTypes.string,
  }),
};

export default Resume;
