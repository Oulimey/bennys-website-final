import React, { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FiArrowUpRight,
  FiChevronRight,
  FiClock,
  FiCoffee,
  FiGrid,
  FiMapPin,
  FiStar,
} from 'react-icons/fi';
import { menuData } from '../../constants';
import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const categories = [
    { id: 'breakfast', label: 'Breakfast & Brunch', icon: '🍳', note: 'Toasts, paninis, msemen and brunch bites' },
    { id: 'hotCoffee', label: 'Hot Coffee', icon: '☕', note: 'Espresso, latte, cappuccino and coffee classics' },
    { id: 'icedCoffee', label: 'Iced Coffee', icon: '🧊', note: 'Cold coffee signatures and iced lattes' },
    { id: 'teaChocolate', label: 'Tea & Chocolate', icon: '🫖', note: 'Tea, ginger tea and hot chocolate' },
    { id: 'matcha', label: 'Matcha', icon: '🍵', note: 'Classic and flavored matcha drinks' },
    { id: 'juicesSmoothies', label: 'Juices & Smoothies', icon: '🥭', note: 'Fresh juices and fruit smoothies' },
    { id: 'signatureDrinks', label: 'Signature Drinks', icon: '✨', note: 'Colorful Benny’s cold signatures' },
    { id: 'mojitos', label: 'Mojitos', icon: '🌿', note: 'Fresh mocktail-style mojitos' },
    { id: 'icedTea', label: 'Iced Tea', icon: '🫐', note: 'Refreshing iced tea selection' },
    { id: 'milkshakes', label: 'Milkshakes', icon: '🥤', note: 'Creamy milkshake selection' },
    { id: 'desserts', label: 'Desserts', icon: '🍰', note: 'San Sebastian, cakes, cookies and poffertjes' },
    { id: 'energyBalls', label: 'Energy Balls', icon: '⚡', note: 'Small sweet energy bites' },
  ];

  const activeCategoryData = categories.find((category) => category.id === activeCategory);
  const activeItems = menuData[activeCategory] || [];

  const priceRange = useMemo(() => {
    const prices = activeItems
      .map((item) => Number(item.price))
      .filter((price) => !Number.isNaN(price));

    if (!prices.length) return 'Fresh picks';

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return min === max ? `${min} MAD` : `${min} - ${max} MAD`;
  }, [activeItems]);

  const featuredItems = useMemo(() => {
    return activeItems.slice(0, 3);
  }, [activeItems]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="menu section__padding" id="menu" ref={sectionRef}>
      {/* Background */}
      <div className="menu__bg" aria-hidden="true">
        <div className="menu__glow menu__glow--1" />
        <div className="menu__glow menu__glow--2" />
        <div className="menu__glow menu__glow--3" />

        <div className="menu__bg-arch menu__bg-arch--1" />
        <div className="menu__bg-arch menu__bg-arch--2" />
        <div className="menu__bg-arch menu__bg-arch--3" />

        <div className="menu__particles">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="menu__noise" />
      </div>

      <div className="menu__container">
        {/* Header */}
        <motion.div
          className="menu__header"
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="menu__eyebrow">
            <span className="menu__eyebrow-line" />
            <span>Benny&apos;s Menu</span>
            <span className="menu__eyebrow-line" />
          </div>

          <h2 className="menu__title">
            Crafted for every <span>mood.</span>
          </h2>

          <p className="menu__subtitle">
            Browse the real Benny&apos;s menu by section — from brunch and coffee
            to matcha, mojitos, smoothies, desserts, and late-night favorites.
          </p>
        </motion.div>

        {/* Premium Menu Shell */}
        <div className="menu__shell">
          {/* Category Panel */}
          <motion.aside
            className="menu__category-panel"
            initial={{ opacity: 0, x: -42 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            <div className="menu__category-arch" />

            <div className="menu__category-head">
              <span className="menu__category-icon">
                <FiGrid />
              </span>

              <div>
                <span>Choose a section</span>
                <strong>{categories.length} categories</strong>
              </div>
            </div>

            <div className="menu__tabs">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className={`menu__tab ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={activeCategory === category.id}
                >
                  <span className="menu__tab-icon">{category.icon}</span>

                  <span className="menu__tab-content">
                    <span className="menu__tab-label">{category.label}</span>
                    <span className="menu__tab-note">{category.note}</span>
                  </span>

                  <FiChevronRight className="menu__tab-arrow" />
                </button>
              ))}
            </div>

            <div className="menu__visit-card">
              <div className="menu__visit-icon">
                <FiClock />
              </div>

              <div>
                <span>Open Daily</span>
                <strong>8AM - 2AM</strong>
              </div>
            </div>
          </motion.aside>

          {/* Menu Board */}
          <motion.div
            className="menu__board"
            initial={{ opacity: 0, x: 42 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            {/* Active Section Intro */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-intro`}
                className="menu__section-intro"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
              >
                <div className="menu__section-arch" />

                <div className="menu__section-main">
                  <span className="menu__section-icon">{activeCategoryData?.icon}</span>

                  <div>
                    <span className="menu__section-label">Selected section</span>
                    <h3>{activeCategoryData?.label}</h3>
                    <p>{activeCategoryData?.note}</p>
                  </div>
                </div>

                <div className="menu__section-stats">
                  <div>
                    <strong>{activeItems.length}</strong>
                    <span>Items</span>
                  </div>

                  <div>
                    <strong>{priceRange}</strong>
                    <span>Price range</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Featured Picks */}
            {featuredItems.length > 0 && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-featured`}
                  className="menu__featured"
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                >
                  <div className="menu__featured-title">
                    <FiStar />
                    <span>Quick picks from this section</span>
                  </div>

                  <div className="menu__featured-list">
                    {featuredItems.map((item) => (
                      <div className="menu__featured-item" key={`featured-${item.id}`}>
                        <span>{item.name}</span>
                        <strong>{item.price} MAD</strong>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Menu Items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="menu__grid"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.35 }}
              >
                {activeItems.map((item, index) => (
                  <motion.article
                    key={item.id}
                    className="menu__item"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, delay: index * 0.035 }}
                  >
                    <div className="menu__item-arch" />

                    <div className="menu__item-top">
                      <span className="menu__item-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {item.tag && (
                        <span className="menu__item-tag">{item.tag}</span>
                      )}
                    </div>

                    <div className="menu__item-header">
                      <h3 className="menu__item-name">{item.name}</h3>

                      <span className="menu__item-price">
                        {item.price}
                        <small>MAD</small>
                      </span>
                    </div>

                    <p className="menu__item-desc">{item.description}</p>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="menu__cta"
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.55 }}
        >
          <div className="menu__cta-content">
            <span className="menu__cta-icon">
              <FiCoffee />
            </span>

            <div>
              <h3>Not sure what to order?</h3>
              <p>
                Start with Toast Saumon, Iced Spanish Mocha Latte, Matcha Strawberry,
                or San Sebastian Cheesecake.
              </p>
            </div>
          </div>

          <div className="menu__cta-actions">
            <button
              type="button"
              className="menu__btn menu__btn--primary"
              onClick={() => scrollToSection('contact')}
            >
              <span>Visit Us Today</span>
              <FiArrowUpRight />
            </button>

            <div className="menu__location">
              <FiMapPin />
              <span>Iberia, Tangier</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;