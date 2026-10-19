import React from "react";

const TECH_ICONS = {
  "Python": "devicon-python-plain colored",
  "Java": "devicon-java-plain colored",
  "C++": "devicon-cplusplus-plain colored",
  "JavaScript": "devicon-javascript-plain colored",
  "TypeScript": "devicon-typescript-plain colored",
  "SQL": "fa fa-database",
  "FastAPI": "devicon-fastapi-plain colored",
  "Node.js": "devicon-nodejs-plain colored",
  "Express.js": "devicon-express-original",
  "REST APIs": "fa fa-exchange",
  "Flask": "devicon-flask-original",
  "Pydantic": "fa fa-shield",
  "React.js": "devicon-react-original colored",
  "Next.js": "devicon-nextjs-plain",
  "HTML5": "devicon-html5-plain colored",
  "CSS3": "devicon-css3-plain colored",
  "Tailwind CSS": "devicon-tailwindcss-original colored",
  "LangChain": "fa fa-cubes",
  "Gemini API": "fa fa-magic",
  "Prompt Engineering": "fa fa-terminal",
  "NLP": "fa fa-comments-o",
  "Scikit-learn": "devicon-scikitlearn-plain colored",
  "PostgreSQL": "devicon-postgresql-plain colored",
  "MongoDB": "devicon-mongodb-plain colored",
  "MySQL": "devicon-mysql-plain colored",
  "Query Tuning": "fa fa-dashboard",
  "AWS": "devicon-amazonwebservices-plain-wordmark colored",
  "Docker": "devicon-docker-plain colored",
  "Git & GitHub": "devicon-github-original",
  "CI/CD Pipelines": "fa fa-random",
  "Firebase": "devicon-firebase-plain colored",
};

const CATEGORY_META = {
  "Programming Languages": { icon: "fa fa-code", color: "#6366f1", bg: "rgba(99, 102, 241, 0.1)" },
  "Backend & APIs": { icon: "fa fa-server", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
  "Frontend Development": { icon: "fa fa-laptop", color: "#0ea5e9", bg: "rgba(14, 165, 233, 0.1)" },
  "AI & LLM Stack": { icon: "fa fa-magic", color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.1)" },
  "Databases & Storage": { icon: "fa fa-database", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
  "Cloud & DevOps": { icon: "fa fa-cloud", color: "#ec4899", bg: "rgba(236, 72, 153, 0.1)" },
};

const Resume = ({ data }) => {
  if (!data) return null;

  const {
    education = [],
    work = [],
    skills = [],
  } = data;

  return (
    <section id="resume">
      <div className="rs-container">
        {/* ── Work Experience ── */}
        <div className="rs-section">
          <div className="rs-section-header">
            <h2 className="rs-heading">Experience</h2>
          </div>

          <div className="rs-list">
            {work.map((job) => (
              <div key={job.company} className="rs-item">
                <div className="rs-item-top">
                  <div className="rs-role-wrap">
                    {job.logo && (
                      <a
                        href={job.website || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rs-company-logo-link"
                        title={job.company}
                      >
                        <img src={job.logo} alt={job.company} className="rs-company-logo" />
                      </a>
                    )}
                    <div>
                      <h3 className="rs-role">{job.title}</h3>
                      <span className="rs-org">{job.company}</span>
                      {job.location && (
                        <span className="rs-loc"> • {job.location}</span>
                      )}
                    </div>
                  </div>
                  <span className="rs-date">
                    <i className="fa fa-calendar-o" style={{ marginRight: "6px" }} />
                    {job.years}
                  </span>
                </div>
                {job.description && (
                  <p className="rs-desc">{job.description}</p>
                )}
                {job.bullets && job.bullets.length > 0 && (
                  <ul className="rs-bullets">
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <div className="rs-section">
          <div className="rs-section-header">
            <h2 className="rs-heading">Education</h2>
          </div>

          <div className="rs-list">
            {education.map((edu) => {
              const parts = (edu.description || "").split("|").map(s => s.trim());
              let cgpa = null;
              let scoreDetail = null;
              let courses = [];

              parts.forEach(p => {
                if (p.toLowerCase().startsWith("cgpa")) {
                  cgpa = p.replace(/^cgpa:?\s*/i, "").trim();
                } else if (p.toLowerCase().startsWith("coursework") || p.toLowerCase().startsWith("relevant coursework")) {
                  courses = p.replace(/^(relevant\s+)?coursework:?\s*/i, "").split(",").map(c => c.trim()).filter(Boolean);
                } else {
                  scoreDetail = p;
                }
              });

              return (
                <div key={edu.school} className="rs-item">
                  <div className="rs-item-top">
                    <div>
                      <h3 className="rs-role">{edu.degree}</h3>
                      <span className="rs-org">
                        <i className="fa fa-graduation-cap" style={{ marginRight: "6px", opacity: 0.7 }} />
                        {edu.school}
                      </span>
                    </div>
                    <span className="rs-date">
                      <i className="fa fa-calendar-o" style={{ marginRight: "6px" }} />
                      {edu.graduated}
                    </span>
                  </div>
                  {cgpa && (
                    <div className="rs-cgpa-pill">
                      <span className="rs-cgpa-dot" />
                      <span>CGPA: <strong>{cgpa}</strong></span>
                    </div>
                  )}
                  {scoreDetail && !cgpa && (
                    <p className="rs-desc" style={{ marginTop: "0.4rem" }}>{scoreDetail}</p>
                  )}
                  {courses.length > 0 && (
                    <div style={{ marginTop: "0.85rem" }}>
                      <span className="rs-coursework-label">Coursework:</span>
                      <div className="rs-tags" style={{ marginTop: "0.35rem" }}>
                        {courses.map((c, i) => (
                          <span key={i} className="rs-tag">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Skills ── */}
        <div className="rs-section">
          <div className="rs-section-header">
            <h2 className="rs-heading">Skills</h2>
          </div>

          <div className="rs-skills-grid">
            {skills.map((cat) => {
              const meta = CATEGORY_META[cat.name] || {
                icon: "fa fa-code",
                color: "#6366f1",
                bg: "rgba(99, 102, 241, 0.1)",
              };

              return (
                <div key={cat.name} className="rs-skill-group">
                  <div className="rs-skill-header">
                    <span
                      className="rs-skill-icon-badge"
                      style={{ color: meta.color, backgroundColor: meta.bg }}
                    >
                      <i className={meta.icon} />
                    </span>
                    <h4 className="rs-skill-label">{cat.name}</h4>
                  </div>
                  <div className="rs-tags">
                    {cat.items && cat.items.map((item) => {
                      const iconClass = TECH_ICONS[item];
                      return (
                        <span key={item} className="rs-tag">
                          {iconClass && <i className={`${iconClass} rs-tech-icon`} />}
                          <span>{item}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
