import React, { useState } from "react";

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  if (data) {
    var contactName = data.name;
    var street = data.address.street;
    var city = data.address.city;
    var state = data.address.state;
    var zip = data.address.zip;
    var phone = data.phone;
    var contactEmail = data.email;
    var contactMessage = data.contactmessage;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(name)} (${encodeURIComponent(
      email
    )}): ${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact">
      {/* ... existing header and contact info ... */}

      <div className="row">
        <div className="eight columns">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div>
                <label htmlFor="contactName">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  id="contactName"
                  name="name"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="contactEmail">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  id="contactEmail"
                  name="email"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="contactSubject">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  id="contactSubject"
                  name="subject"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="contactMessage">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  value={formData.message}
                  onChange={handleInputChange}
                  id="contactMessage"
                  name="message"
                  required
                ></textarea>
              </div>

              <div>
                <button type="submit" className="submit">
                  Submit
                </button>
              </div>
            </fieldset>
          </form>

          {/* ... message warnings ... */}
        </div>

        {/* ... contact info sidebar ... */}
      </div>
    </section>
  );
};

export default Contact;