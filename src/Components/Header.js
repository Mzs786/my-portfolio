import React, { useState, useEffect, useRef } from "react";
import TypeWriter from "react-typewriter";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Works" },
  { id: "testimonials", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const Header = ({ data }) => {
  const [activeSection, setActiveSection] = useState("home");
  const isClickScrollingRef = useRef(false);
  const headerRef = useRef(null);
  const bannerRef = useRef(null);
  const rafIdRef = useRef(null);
  const targetOffsetRef = useRef({ x: 0, y: 0 });
  const currentOffsetRef = useRef({ x: 0, y: 0 });

  // ── Subtle 3D Mouse Parallax Effect ──
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !hasPointer) return;

    let isHeaderVisible = true;
    let observer;
    if ("IntersectionObserver" in window && headerRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        isHeaderVisible = entry.isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(headerRef.current);
    }

    const handleMouseMove = (e) => {
      if (!isHeaderVisible) return;
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      targetOffsetRef.current = { x: normX, y: normY };
    };

    const handleMouseLeave = () => {
      targetOffsetRef.current = { x: 0, y: 0 };
    };

    const animate = () => {
      if (isHeaderVisible) {
        const factor = 0.08;
        currentOffsetRef.current.x += (targetOffsetRef.current.x - currentOffsetRef.current.x) * factor;
        currentOffsetRef.current.y += (targetOffsetRef.current.y - currentOffsetRef.current.y) * factor;

        const { x, y } = currentOffsetRef.current;

        if (bannerRef.current) {
          bannerRef.current.style.transform = `translate3d(${x * 12}px, ${y * 10}px, 0)`;
        }

        if (headerRef.current) {
          headerRef.current.style.backgroundPosition = `calc(50% + ${x * -18}px) calc(50% + ${y * -14}px)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (observer) observer.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrollingRef.current) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // When near bottom of page, highlight the last section (Contact)
      if (scrollPosition + windowHeight >= fullHeight - 80) {
        setActiveSection("contact");
        return;
      }

      let current = "home";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - 150;
          if (scrollPosition >= top) {
            current = item.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveSection(targetId);
    isClickScrollingRef.current = true;

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
      if (window.history.pushState) {
        window.history.pushState(null, "", `#${targetId}`);
      } else {
        window.location.hash = targetId;
      }
    }

    setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);
  };

  const name = data?.name;
  const occupation = data?.occupation;
  const description = data?.description;
  const city = data?.address?.city;
  const networks = data?.social?.map((network) => (
    <li key={network.name}>
      <a
        href={network.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit my ${network.name} profile`}
      >
        <i className={network.className}></i>
      </a>
    </li>
  ));

  return (
    <header id="home" ref={headerRef}>
      <nav id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation">
          Hide navigation
        </a>

        <ul id="nav" className="nav">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.id}
              className={activeSection === item.id ? "current" : ""}
            >
              <a
                className="smoothscroll"
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                {...(activeSection === item.id && { "aria-current": "page" })}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="row banner" ref={bannerRef}>
        <div className="banner-text">
          <h1 className="responsive-headline">
            <TypeWriter typing={0.5}>{name ? `I'm ${name}.` : null}</TypeWriter>
          </h1>
          <h3 className="stagger-subtitle">
            Based in {city}. <span>{occupation}</span>. {description}.
          </h3>
          <hr className="stagger-hr" />
          <ul className="social stagger-social">{networks}</ul>
        </div>
      </div>

      <p className="scrolldown">
        <a
          className="smoothscroll"
          href="#about"
          onClick={(e) => handleNavClick(e, "about")}
        >
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );
};

export default Header;
