import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiMapPin,
  FiNavigation,
  FiPhone,
  FiSend,
} from 'react-icons/fi';
import { contactInfo } from '../../constants';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const email = contactInfo?.email || '';
  const weekdays = contactInfo?.hours?.weekdays || '8:00 AM - 2:00 AM';
  const weekends = contactInfo?.hours?.weekends || '8:00 AM - 2:00 AM';

  const shops = [
    {
      id: 'iberia',
      name: "Benny's Iberia",
      area: 'Tangier Iberia',
      address: contactInfo?.address || 'Tangier Iberia',
      phone: contactInfo?.phone || '+212 610 705 053',
      badge: 'Iberia Branch',
    },
    {
      id: 'malabata',
      name: "Benny's Malabata",
      area: 'Tangier Malabata',
      address: 'Tanger Noor Tower, Rte Malabata, Tangier',
      phone: '+212 650 540 007',
      badge: 'Malabata Branch',
    },
  ];

  const getCleanPhone = (phoneNumber) => phoneNumber.replace(/[^\d+]/g, '');

  const getMapsLink = (address) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const contactCards = [
    {
      id: 1,
      icon: <FiMail />,
      title: 'Email',
      text: email,
      link: email ? `mailto:${email}` : '#contact',
      action: 'Email',
    },
    {
      id: 2,
      icon: <FiClock />,
      title: 'Hours',
      text: `Mon-Fri: ${weekdays}`,
      secondText: `Sat-Sun: ${weekends}`,
      link: '#contact',
      action: 'Open daily',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Message from ${formData.name} - Benny's Website`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    if (email) {
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }

    setIsSent(true);

    setTimeout(() => {
      setIsSent(false);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }, 1800);
  };

  return (
    <section className="contact section__padding" id="contact" ref={sectionRef}>
      <div className="contact__bg" aria-hidden="true">
        <div className="contact__glow contact__glow--1" />
        <div className="contact__glow contact__glow--2" />
        <div className="contact__glow contact__glow--3" />

        <div className="contact__bg-arch contact__bg-arch--1" />
        <div className="contact__bg-arch contact__bg-arch--2" />
        <div className="contact__bg-arch contact__bg-arch--3" />

        <div className="contact__particles">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="contact__noise" />
      </div>

      <div className="contact__container">
        <motion.div
          className="contact__header"
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="contact__eyebrow">
            <span className="contact__eyebrow-line" />
            <span>Get in Touch</span>
            <span className="contact__eyebrow-line" />
          </div>

          <h2 className="contact__title">
            Visit <span>Us</span>
          </h2>

          <p className="contact__subtitle">
            Two Benny&apos;s coffee house locations in Tangier, ready for coffee,
            brunch, desserts, and warm moments under the arches.
          </p>
        </motion.div>

        <div className="contact__content">
          <motion.div
            className="contact__left"
            initial={{ opacity: 0, x: -42 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            <div className="contact__map-card">
              <div className="contact__map-arch" />

              <span className="contact__map-icon">
                <FiNavigation />
              </span>

              <span className="contact__map-label">Find Benny&apos;s</span>

              <h3>Choose your closest Benny&apos;s in Tangier.</h3>

              <p>
                Visit our Iberia or Malabata branch. Use the map shortcut below each
                location to get directions.
              </p>

              <a
                href={getMapsLink(shops[0].address)}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__map-btn"
              >
                <span>Open Iberia Map</span>
                <FiArrowUpRight />
              </a>
            </div>

            <div className="contact__branches">
              {shops.map((shop, index) => (
                <motion.div
                  key={shop.id}
                  className="contact__branch-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.24 + index * 0.1 }}
                >
                  <div className="contact__branch-arch" />

                  <span className="contact__branch-badge">{shop.badge}</span>

                  <h3>{shop.name}</h3>

                  <div className="contact__branch-info">
                    <div>
                      <span>
                        <FiMapPin />
                      </span>
                      <p>{shop.address}</p>
                    </div>

                    <div>
                      <span>
                        <FiPhone />
                      </span>
                      <p>{shop.phone}</p>
                    </div>
                  </div>

                  <div className="contact__branch-actions">
                    <a
                      href={getMapsLink(shop.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Map</span>
                      <FiArrowUpRight />
                    </a>

                    <a href={`tel:${getCleanPhone(shop.phone)}`}>
                      <span>Call</span>
                      <FiPhone />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact__info">
              {contactCards.map((card, index) => (
                <motion.a
                  key={card.id}
                  href={card.link}
                  className="contact__info-card"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.42 + index * 0.08 }}
                >
                  <div className="contact__info-arch" />

                  <div className="contact__info-icon">
                    {card.icon}
                  </div>

                  <div className="contact__info-content">
                    <span>{card.title}</span>
                    <h4>{card.text}</h4>
                    {card.secondText && <p>{card.secondText}</p>}
                  </div>

                  <small>{card.action}</small>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 42 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <div className="contact__form-arch" />

            <div className="contact__form-head">
              <span className="contact__form-label">Message Benny&apos;s</span>
              <h3>Send us a message</h3>
              <p>
                Write your details below and your email app will open with the message
                ready to send.
              </p>
            </div>

            <div className="contact__form-grid">
              <label className="contact__form-group">
                <span>Your Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </label>

              <label className="contact__form-group">
                <span>Your Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </label>
            </div>

            <label className="contact__form-group contact__form-group--full">
              <span>Your Message</span>
              <textarea
                placeholder="Write your message..."
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </label>

            <button type="submit" className={`contact__form-btn ${isSent ? 'sent' : ''}`}>
              {isSent ? (
                <>
                  <span>Ready to send</span>
                  <FiCheckCircle />
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <FiSend />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
