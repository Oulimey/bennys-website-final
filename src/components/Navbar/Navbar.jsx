import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { navLinks } from '../../constants';
import bennysLogo from '../../assets/bennys-logo-transparent.png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.replace('#', ''));

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);

        if (element) {
          const rect = element.getBoundingClientRect();

          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navbar__container">
          {/* Logo */}
          <a
            href="#home"
            className="navbar__logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            aria-label="Benny's Home"
          >
            <img
              src={bennysLogo}
              alt="Benny's"
              className="navbar__logo-img"
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="navbar__links">
            {navLinks.map((link, index) => (
              <li key={link.name}>
                <motion.a
                  href={link.href}
                  className={`navbar__link ${
                    activeSection === link.href.replace('#', '') ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 + 0.25 }}
                >
                  {link.name}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.a
            href="#contact"
            className="navbar__cta"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            Reserve
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="navbar__mobile-bg">
              <div className="navbar__mobile-arch navbar__mobile-arch--1" />
              <div className="navbar__mobile-arch navbar__mobile-arch--2" />
              <div className="navbar__mobile-arch navbar__mobile-arch--3" />
            </div>

            <div className="navbar__mobile-content">
              <div className="navbar__mobile-logo">
                <img
                  src={bennysLogo}
                  alt="Benny's"
                  className="navbar__mobile-logo-img"
                />
              </div>

              <ul className="navbar__mobile-links">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 35 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <a
                      href={link.href}
                      className={
                        activeSection === link.href.replace('#', '') ? 'active' : ''
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                    >
                      <span className="navbar__mobile-link-number">
                        0{index + 1}
                      </span>
                      <span className="navbar__mobile-link-text">
                        {link.name}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="navbar__mobile-footer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <a
                  href="#contact"
                  className="navbar__mobile-cta"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contact');
                  }}
                >
                  Reserve a Table
                </a>

                <div className="navbar__mobile-info">
                  <p>Open Daily</p>
                  <p>7:00 AM - 10:00 PM</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;