import React from "react";

const Footer = ({ data }) => {
  // Generate social media links with improved error handling
  const renderSocialLinks = () => {
    if (!data?.social || !Array.isArray(data.social)) {
      return null;
    }

    return data.social.map((network) => {
      if (!network?.name || !network?.url) {
        return null;
      }

      return (
        <li key={network.name}>
          <a
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit my ${network.name} profile`}
            className="social-link"
          >
            <i className={network.className} aria-hidden="true"></i>
          </a>
        </li>
      );
    }).filter(Boolean); // Remove null entries
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="row">
          <div className="twelve columns">
            {/* Social Links Section */}
            {data?.social && (
              <nav aria-label="Social media links">
                <ul className="social-links">
                  {renderSocialLinks()}
                </ul>
              </nav>
            )}

            {/* Copyright Section */}
            <div className="copyright">
              <p>
                Made with <span className="heart" aria-label="love">❤️</span> by{" "}
                <span className="author">Zubair</span>
              </p>
              <p className="year">© {currentYear} All rights reserved.</p>
            </div>
          </div>

          {/* Back to Top Button - Inside footer but outside columns */}
          <div id="go-top">
            <a 
              className="smoothscroll" 
              title="Back to Top" 
              href="#home"
              aria-label="Back to top of page"
            >
              <i className="icon-up-open" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;