import React from "react";

const ACHIEVEMENT_ICONS = {
  "CMR Institute of Technology, Bengaluru": "fa fa-trophy",
  "Teclusion AI": "fa fa-rocket",
  "CMRIT Hackathon 2022": "fa fa-bolt",
};

const Testimonials = ({ data }) => {
  if (!data?.testimonials) return null;

  return (
    <section id="testimonials">
      <div className="ach-container">
        <div
          className="rs-section-header"
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <h2 className="rs-heading" style={{ display: "inline-block" }}>
            Achievements
          </h2>
        </div>

        <div className="ach-grid">
          {data.testimonials.map((item) => {
            const icon = ACHIEVEMENT_ICONS[item.user] || "fa fa-star";
            return (
              <div key={item.user} className="ach-card df-reveal-target">
                <div className="ach-icon">
                  <i className={icon}></i>
                </div>
                <blockquote className="ach-quote">
                  <p>{item.text}</p>
                </blockquote>
                <cite className="ach-source">{item.user}</cite>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
