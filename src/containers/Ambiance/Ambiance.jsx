import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiArrowUpRight,
  FiCoffee,
  FiClock,
  FiMapPin,
  FiMoon,
  FiStar,
} from 'react-icons/fi';
import './Ambiance.css';

const ambianceCards = [
  {
    id: 1,
    icon: <FiStar />,
    title: 'Signature Arches',
    text: 'A warm architectural identity built around Benny’s soft arch language.',
    tag: 'Architecture',
    size: 'large',
  },
  {
    id: 2,
    icon: <FiCoffee />,
    title: 'Coffee House Mood',
    text: 'A calm setting for coffee, matcha, brunch, and slow conversations.',
    tag: 'Experience',
    size: 'small',
  },
  {
    id: 3,
    icon: <FiMoon />,
    title: 'Late Night Glow',
    text: 'Open from morning until late night, with a golden atmosphere after sunset.',
    tag: 'Evening',
    size: 'small',
  },
  {
    id: 4,
    icon: <FiMapPin />,
    title: 'Tangier Corner',
    text: 'Located in Iberia, designed as a stylish pause in the middle of the city.',
    tag: 'Location',
    size: 'wide',
  },
];

const Ambiance = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="ambiance section__padding" id="ambiance" ref={sectionRef}>
      <div className="ambiance__bg" aria-hidden="true">
        <div className="ambiance__glow ambiance__glow--1" />
        <div className="ambiance__glow ambiance__glow--2" />
        <div className="ambiance__glow ambiance__glow--3" />

        <div className="ambiance__arch ambiance__arch--1" />
        <div className="ambiance__arch ambiance__arch--2" />
        <div className="ambiance__arch ambiance__arch--3" />
        <div className="ambiance__arch ambiance__arch--4" />

        <div className="ambiance__particles">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="ambiance__noise" />
      </div>

      <div className="ambiance__container">
        <motion.div
          className="ambiance__header"
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="ambiance__eyebrow">
            <span className="ambiance__eyebrow-line" />
            <span>The Atmosphere</span>
            <span className="ambiance__eyebrow-line" />
          </div>

          <h2 className="ambiance__title">
            Under the <span>Arches</span>
          </h2>

          <p className="ambiance__subtitle">
            A premium coffee house mood shaped by warm light, soft curves, elegant
            details, and Benny’s signature arch identity.
          </p>
        </motion.div>

        <div className="ambiance__showcase">
          <motion.div
            className="ambiance__main-card"
            initial={{ opacity: 0, x: -42 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15 }}
          >
            <div className="ambiance__main-arch" />

            <div className="ambiance__main-content">
              <span className="ambiance__main-label">Benny’s Interior Mood</span>

              <h3>
                A space designed to feel elegant, warm, and memorable.
              </h3>

              <p>
                Instead of a normal café section, this block gives the website a
                stronger visual identity: arches, golden glow, soft shadows, and
                premium atmosphere without needing any photos.
              </p>

              <div className="ambiance__stats">
                <div>
                  <strong>8AM</strong>
                  <span>Opening</span>
                </div>

                <div>
                  <strong>2AM</strong>
                  <span>Closing</span>
                </div>

                <div>
                  <strong>Iberia</strong>
                  <span>Tangier</span>
                </div>
              </div>

              <div className="ambiance__actions">
                <button
                  type="button"
                  className="ambiance__btn ambiance__btn--primary"
                  onClick={() => scrollToSection('menu')}
                >
                  <span>Explore Menu</span>
                  <FiArrowUpRight />
                </button>

                <button
                  type="button"
                  className="ambiance__btn ambiance__btn--outline"
                  onClick={() => scrollToSection('contact')}
                >
                  Visit Us
                </button>
              </div>
            </div>
          </motion.div>

          <div className="ambiance__cards">
            {ambianceCards.map((card, index) => (
              <motion.div
                key={card.id}
                className={`ambiance__card ambiance__card--${card.size}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + index * 0.1 }}
              >
                <div className="ambiance__card-arch" />

                <div className="ambiance__card-top">
                  <span className="ambiance__card-icon">{card.icon}</span>
                  <span className="ambiance__card-tag">{card.tag}</span>
                </div>

                <div className="ambiance__card-content">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="ambiance__hours"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <FiClock />
              <div>
                <span>Open Daily</span>
                <strong>8AM - 2AM</strong>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ambiance;