import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FiChevronDown, FiClock, FiMapPin, FiCoffee } from 'react-icons/fi';
import { images } from '../../constants';
import bennysLogo from '../../assets/bennys-logo-transparent.png';
import './Header.css';

const Header = () => {
  const headerRef = useRef(null);
  const archesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!archesRef.current) return;

      const scrollY = window.scrollY;
      const arches = archesRef.current.querySelectorAll('.header__arch');

      arches.forEach((arch, index) => {
        const speed = 0.08 + index * 0.025;
        arch.style.setProperty('--arch-parallax', `${scrollY * speed}px`);
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const arches = archesRef.current?.querySelectorAll('.header__arch');

    if (arches) {
      gsap.fromTo(
        arches,
        {
          scaleY: 0.72,
          opacity: 0,
          y: 50,
          transformOrigin: 'bottom center',
        },
        {
          scaleY: 1,
          opacity: 1,
          y: 0,
          duration: 1.25,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.35,
        }
      );
    }
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header" id="home" ref={headerRef}>
      {/* Background */}
      <div className="header__bg">
        <div
          className="header__bg-image"
          style={{ backgroundImage: `url(${images.heroBg})` }}
        />
        <div className="header__bg-gradient" />
        <div className="header__bg-glow header__bg-glow--1" />
        <div className="header__bg-glow header__bg-glow--2" />
        <div className="header__bg-glow header__bg-glow--3" />
        <div className="header__bg-noise" />
      </div>

      {/* Magic Particles */}
      <div className="header__particles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Decorative Arches */}
      <div className="header__arches" ref={archesRef} aria-hidden="true">
        <div className="header__arch header__arch--1" />
        <div className="header__arch header__arch--2" />
        <div className="header__arch header__arch--3" />
        <div className="header__arch header__arch--4" />
        <div className="header__arch header__arch--5" />
      </div>

      {/* Main Content */}
      <div className="header__content">
        <motion.div
          className="header__logo-card"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <span className="header__logo-orbit" />
          <img src={bennysLogo} alt="Benny's" className="header__logo-img" />
        </motion.div>

        <motion.div
          className="header__label"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
        >
          <span className="header__label-line" />
          <span>Coffee • Brunch • Desserts</span>
          <span className="header__label-line" />
        </motion.div>

        <motion.h1
          className="header__title"
          initial={{ opacity: 0, y: 42 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35 }}
        >
          <span className="header__title-line">A warm corner</span>
          <span className="header__title-line header__title-line--accent">
            under iconic arches
          </span>
        </motion.h1>

        <motion.p
          className="header__subtitle"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52 }}
        >
          From rich coffee and matcha to brunch plates and homemade-style desserts,
          Benny&apos;s brings a calm, elegant coffee house experience to Tangier.
        </motion.p>

        <motion.div
          className="header__meta"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.68 }}
        >
          <div className="header__meta-item">
            <FiClock />
            <div>
              <span>Open Daily</span>
              <strong>8AM - 2AM</strong>
            </div>
          </div>

          <div className="header__meta-divider" />

          <div className="header__meta-item">
            <FiMapPin />
            <div>
              <span>Location</span>
              <strong>Iberia, Tangier</strong>
            </div>
          </div>

          <div className="header__meta-divider" />

          <div className="header__meta-item">
            <FiCoffee />
            <div>
              <span>Specialty</span>
              <strong>Coffee & Brunch</strong>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="header__cta"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.82 }}
        >
          <button
            type="button"
            className="header__btn header__btn--primary"
            onClick={() => scrollToSection('menu')}
          >
            <span>Explore Menu</span>
            <span className="header__btn-icon">☕</span>
          </button>

          <button
            type="button"
            className="header__btn header__btn--outline"
            onClick={() => scrollToSection('about')}
          >
            <span>Discover Benny&apos;s</span>
          </button>
        </motion.div>
      </div>

      {/* Floating Feature Card */}
      <motion.div
        className="header__feature-card"
        initial={{ opacity: 0, x: 36, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.85, delay: 1 }}
      >
        <div className="header__feature-arch" />
        <span className="header__feature-label">Signature picks</span>
        <h3>Matcha, iced coffee & San Sebastian</h3>
        <p>Perfect for slow mornings, late nights, and everything in between.</p>
      </motion.div>

      {/* Side Info */}
      <motion.div
        className="header__side-info"
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 1 }}
      >
        <div className="header__side-line" />
        <div className="header__side-item">
          <span className="header__side-label">Open Daily</span>
          <span className="header__side-value">8AM - 2AM</span>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        type="button"
        className="header__scroll"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 1.15 }}
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about section"
      >
        <span className="header__scroll-text">Scroll to explore</span>
        <span className="header__scroll-indicator">
          <FiChevronDown />
        </span>
      </motion.button>
    </header>
  );
};

export default Header;