import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowUpRight,
  FiClock,
  FiCoffee,
  FiMapPin,
  FiStar,
} from 'react-icons/fi';
import { images, features } from '../../constants';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const archRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            clipPath: 'inset(100% 0% 0% 0% round 260px 260px 34px 34px)',
            scale: 1.08,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 260px 260px 34px 34px)',
            scale: 1,
            duration: 1.45,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (archRef.current) {
        gsap.to(archRef.current, {
          y: -28,
          rotate: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const highlights = [
    {
      id: 1,
      icon: <FiClock />,
      label: 'Open Daily',
      value: '8AM - 2AM',
    },
    {
      id: 2,
      icon: <FiMapPin />,
      label: 'Location',
      value: 'Iberia, Tangier',
    },
    {
      id: 3,
      icon: <FiCoffee />,
      label: 'Experience',
      value: 'Coffee & Brunch',
    },
  ];

  return (
    <section className="about section__padding" id="about" ref={sectionRef}>
      {/* Premium Background */}
      <div className="about__bg" aria-hidden="true">
        <div className="about__bg-glow about__bg-glow--1" />
        <div className="about__bg-glow about__bg-glow--2" />
        <div className="about__bg-noise" />
        <div className="about__bg-arch about__bg-arch--1" />
        <div className="about__bg-arch about__bg-arch--2" />
        <div className="about__bg-arch about__bg-arch--3" />
      </div>

      <div className="about__container">
        {/* Image Side */}
        <motion.div
          className="about__visual"
          initial={{ opacity: 0, x: -56 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.15 }}
        >
          <div className="about__visual-shell">
            <div className="about__visual-arch" ref={archRef} />

            <div className="about__image-card">
              <div className="about__image" ref={imageRef}>
                <img src={images.aboutImg} alt="Benny's Coffee House interior" />
              </div>

              <div className="about__image-shine" />
            </div>

            <motion.div
              className="about__badge about__badge--top"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.7 }}
            >
              <FiStar />
              <div>
                <span>Signature Mood</span>
                <strong>Warm arches</strong>
              </div>
            </motion.div>

            <motion.div
              className="about__badge about__badge--bottom"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.85 }}
            >
              <FiClock />
              <div>
                <span>Open Daily</span>
                <strong>8AM - 2AM</strong>
              </div>
            </motion.div>
          </div>

          <div className="about__decor-dots" aria-hidden="true">
            {[...Array(16)].map((_, index) => (
              <span key={index} />
            ))}
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          className="about__content"
          initial={{ opacity: 0, x: 56 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.28 }}
        >
          <div className="about__eyebrow">
            <span className="about__eyebrow-line" />
            <span>Our Story</span>
          </div>

          <h2 className="about__title">
            A premium coffee house with a <span>warm Tangier soul.</span>
          </h2>

          <div className="about__text">
            <p>
              Benny&apos;s is designed as more than a coffee stop. It is a calm,
              stylish space where coffee, brunch, desserts, and late-night moments
              meet under a signature arches atmosphere.
            </p>

            <p>
              From the first espresso of the morning to matcha, iced coffee,
              San Sebastian cheesecake, and slow conversations at night, every
              detail is built around comfort, taste, and a memorable visual identity.
            </p>
          </div>

          <div className="about__highlights">
            {highlights.map((item, index) => (
              <motion.div
                key={item.id}
                className="about__highlight"
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
              >
                <span className="about__highlight-icon">{item.icon}</span>
                <div>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="about__features">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="about__feature"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.65 + index * 0.1 }}
              >
                <div className="about__feature-icon">
                  <span>{feature.icon}</span>
                </div>

                <div className="about__feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="about__cta"
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 1 }}
          >
            <button
              type="button"
              className="about__btn about__btn--primary"
              onClick={() => scrollToSection('contact')}
            >
              <span>Visit Us Today</span>
              <FiArrowUpRight />
            </button>

            <button
              type="button"
              className="about__btn about__btn--outline"
              onClick={() => scrollToSection('menu')}
            >
              <span>View Menu</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;