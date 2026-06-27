import React from 'react';
import {
  FiArrowUpRight,
  FiClock,
  FiCoffee,
  FiFacebook,
  FiHeart,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';
import { navLinks, contactInfo } from '../../constants';
import bennysLogo from '../../assets/bennys-logo-transparent.png';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const email = contactInfo?.email || '';
  const weekdays = contactInfo?.hours?.weekdays || '8:00 AM - 2:00 AM';
  const weekends = contactInfo?.hours?.weekends || '8:00 AM - 2:00 AM';

  const shops = [
    {
      id: 'iberia',
      name: 'Iberia',
      address: contactInfo?.address || 'Tangier Iberia',
      phone: contactInfo?.phone || '+212 610 705 053',
    },
    {
      id: 'malabata',
      name: 'Malabata',
      address: 'Tanger Noor Tower, Rte Malabata, Tangier',
      phone: '+212 650 540 007',
    },
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: <FiInstagram />,
    },
    {
      label: 'Facebook',
      href: 'https://facebook.com',
      icon: <FiFacebook />,
    },
    {
      label: 'TikTok',
      href: 'https://tiktok.com',
      icon: <FaTiktok />,
    },
  ];

  const getCleanPhone = (phoneNumber) => phoneNumber.replace(/[^\d+]/g, '');

  const getMapsLink = (address) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <footer className="footer">
      <div className="footer__bg" aria-hidden="true">
        <div className="footer__glow footer__glow--1" />
        <div className="footer__glow footer__glow--2" />
        <div className="footer__glow footer__glow--3" />

        <div className="footer__arch footer__arch--1" />
        <div className="footer__arch footer__arch--2" />
        <div className="footer__arch footer__arch--3" />
        <div className="footer__arch footer__arch--4" />

        <div className="footer__particles">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="footer__noise" />
      </div>

      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand-card">
            <div className="footer__brand-arch" />

            <a href="#home" className="footer__logo" aria-label="Back to home">
              <span className="footer__logo-frame">
                <img src={bennysLogo} alt="Benny's" />
              </span>

              <span className="footer__logo-text">
                <strong>Benny&apos;s</strong>
                <small>Coffee House</small>
              </span>
            </a>

            <p className="footer__desc">
              A warm coffee house shaped by soft arches, rich coffee, brunch,
              desserts, and calm moments in Tangier.
            </p>

            <div className="footer__social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__links-card">
            <span className="footer__card-label">Explore</span>

            <h4>Quick Links</h4>

            <ul className="footer__nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>
                    <span>{link.name}</span>
                    <FiArrowUpRight />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__contact-card footer__contact-card--wide">
            <span className="footer__card-label">Locations</span>

            <h4>Two Branches in Tangier</h4>

            <ul className="footer__branches-list">
              {shops.map((shop) => (
                <li key={shop.id} className="footer__branch">
                  <div className="footer__branch-head">
                    <span>{shop.name}</span>
                    <FiMapPin />
                  </div>

                  <a
                    href={getMapsLink(shop.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__branch-address"
                  >
                    {shop.address}
                  </a>

                  <a
                    href={`tel:${getCleanPhone(shop.phone)}`}
                    className="footer__branch-phone"
                  >
                    <FiPhone />
                    <span>{shop.phone}</span>
                  </a>
                </li>
              ))}
            </ul>

            {email && (
              <a href={`mailto:${email}`} className="footer__email-link">
                <FiMail />
                <span>{email}</span>
              </a>
            )}
          </div>

          <div className="footer__hours-card">
            <span className="footer__card-label">Hours</span>

            <h4>Opening Hours</h4>

            <div className="footer__hours-icon">
              <FiClock />
            </div>

            <ul className="footer__hours-list">
              <li>
                <span>Mon - Fri</span>
                <strong>{weekdays}</strong>
              </li>

              <li>
                <span>Sat - Sun</span>
                <strong>{weekends}</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__middle">
          <div className="footer__statement">
            <FiCoffee />
            <span>
              Premium coffee, brunch, matcha, desserts, and cozy moments under
              Benny&apos;s arches.
            </span>
          </div>

          <a href="#menu" className="footer__cta">
            <span>Explore Menu</span>
            <FiArrowUpRight />
          </a>
        </div>

        <div className="footer__bottom">
          <p>© {currentYear} Benny&apos;s Coffee House. All rights reserved.</p>

          <p className="footer__made">
            Made with <FiHeart /> in Morocco
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
