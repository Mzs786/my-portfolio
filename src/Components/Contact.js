import React, { useState } from "react";

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const contactEmail = data?.email || "";
  const contactMessage = data?.contactmessage || "";

  const web3formsKey = data?.web3forms_key || "e70c3824-f613-4779-b3b4-3bf2686b3f07";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Portfolio Message from ${formData.name}`,
          message: formData.message,
          from_name: `${formData.name} (Portfolio Contact)`,
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === true || result.success === "true")) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
        setErrorMessage(
          result?.message || "Something went wrong. Please try again or email me directly."
        );
        setTimeout(() => setStatus("idle"), 8000);
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error occurred. Please try again or email me directly.");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section id="contact">
      <div className="row section-head">
        <div className="twelve columns">
          <h2 className="contact-heading">
            <i
              className="fa fa-envelope"
              style={{ marginRight: "12px", color: "#fff" }}
            ></i>
            Contact
          </h2>
          <p className="lead">
            {contactMessage ||
              "I'm always excited to talk about backend architectures, AI workflows, or software engineering roles. Feel free to reach out!"}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="twelve columns">
          <form onSubmit={handleSubmit} style={{ maxWidth: "760px" }}>
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
                  disabled={status === "sending"}
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
                  disabled={status === "sending"}
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
                  disabled={status === "sending"}
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
                  disabled={status === "sending"}
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <i
                        className="fa fa-spinner fa-spin"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i
                        className="fa fa-paper-plane"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Submit
                    </>
                  )}
                </button>
              </div>

              {status === "success" && (
                <div className="contact-status contact-success">
                  <i className="fa fa-check-circle"></i> Message sent
                  successfully! I'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div
                  className="contact-status contact-error"
                  style={{ marginTop: "15px", padding: "14px 18px" }}
                >
                  <p style={{ margin: "0 0 10px 0" }}>
                    <i
                      className="fa fa-exclamation-circle"
                      style={{ marginRight: "8px" }}
                    ></i>
                    {errorMessage ||
                      "Something went wrong with the automated relay."}
                  </p>
                  <a
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                      formData.subject || "Portfolio Contact: " + (formData.name || "Visitor")
                    )}&body=${encodeURIComponent(
                      `Hi Zubair,\n\n${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`
                    )}`}
                    className="button"
                    style={{
                      display: "inline-block",
                      fontSize: "13px",
                      padding: "8px 18px",
                      background: "#6366f1",
                      color: "#ffffff",
                      borderRadius: "6px",
                      marginTop: "6px",
                      textDecoration: "none",
                    }}
                  >
                    <i
                      className="fa fa-paper-plane"
                      style={{ marginRight: "8px" }}
                    ></i>
                    Click to Send Directly via Email
                  </a>
                </div>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
