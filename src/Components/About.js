import React from "react";
import PropTypes from "prop-types";

const About = ({ data }) => {
  if (!data) return null;

  const { name, image, bio, address, phone, email, resumedownload } = data;
  const { street, city, state, zip } = address || {};
  const profilepic = `images/${image}`;
  const fullAddress = [street, city, state, zip].filter(Boolean).join(", ");

  return (
    <section id="about">
      <div className="row">
        <div className="three columns">
          <img className="profile-pic" src={profilepic} alt={`${name}'s Profile`} />
        </div>

        <div className="nine columns main-col">
          <h2>About Me</h2>
          <p>{bio}</p>

          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{name}</span>
                {fullAddress && <br />}
                {fullAddress && <span>{fullAddress}</span>}
                {phone && <br />}
                {phone && <a href={`tel:${phone}`}>{phone}</a>}
                {email && <br />}
                {email && <a href={`mailto:${email}`}>{email}</a>}
              </p>
            </div>

            <div className="columns download">
              <p>
                <a href={resumedownload} className="button" target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-download" /> Download Resume
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

About.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.string,
    }),
    phone: PropTypes.string,
    email: PropTypes.string,
    resumedownload: PropTypes.string,
  }),
};

export default About;
