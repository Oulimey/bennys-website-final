import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiMessageCircle,
} from 'react-icons/fi';
import { testimonials } from '../../constants';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const reviews = useMemo(() => {
    return testimonials?.length
      ? testimonials
      : [
          {
            name: 'Benny’s Guest',
            role: 'Coffee Lover',
            rating: 5,
            text: 'A warm place with a beautiful atmosphere, good coffee, and a calm premium feeling.',
          },
        ];
  }, []);

  const currentReview = reviews[currentIndex];
  const rating = Math.max(0, Math.min(5, Number(currentReview.rating) || 5));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="testimonials section__padding" id="testimonials" ref={sectionRef}>
      <div className="testimonials__bg" aria-hidden="true">
        <div className="testimonials__glow testimonials__glow--1" />
        <div className="testimonials__glow testimonials__glow--2" />
        <div className="testimonials__glow testimonials__glow--3" />

        <div className="testimonials__bg-arch testimonials__bg-arch--1" />
        <div className="testimonials__bg-arch testimonials__bg-arch--2" />
        <div className="testimonials__bg-arch testimonials__bg-arch--3" />

        <div className="testimonials__particles">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="testimonials__noise" />
      </div>

      <div className="testimonials__container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="testimonials__eyebrow">
            <span className="testimonials__eyebrow-line" />
            <span>Testimonials</span>
            <span className="testimonials__eyebrow-line" />
          </div>

          <h2 className="testimonials__title">
            What People <span>Say</span>
          </h2>

          <p className="testimonials__subtitle">
            A soft, premium review section shaped with the same warm arches,
            golden glow, and elegant coffee-house mood.
          </p>
        </motion.div>

        <motion.div
          className="testimonials__showcase"
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <div className="testimonials__side-card">
            <div className="testimonials__side-arch" />

            <span className="testimonials__side-icon">
              <FiMessageCircle />
            </span>

            <span className="testimonials__side-label">Guest Words</span>

            <h3>Warm reviews, calm mood, and a refined café experience.</h3>

            <p>
              Each review appears inside a premium arch-inspired frame, keeping the
              website elegant without overloading the section.
            </p>

            <div className="testimonials__side-stats">
              <div>
                <strong>{reviews.length}</strong>
                <span>Reviews</span>
              </div>

              <div>
                <strong>5</strong>
                <span>Star Mood</span>
              </div>
            </div>
          </div>

          <div className="testimonials__slider">
            <div className="testimonials__slider-top">
              <button
                type="button"
                className="testimonials__nav testimonials__nav--prev"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <FiChevronLeft />
              </button>

              <div className="testimonials__counter">
                <span>{String(currentIndex + 1).padStart(2, '0')}</span>
                <small>/ {String(reviews.length).padStart(2, '0')}</small>
              </div>

              <button
                type="button"
                className="testimonials__nav testimonials__nav--next"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <FiChevronRight />
              </button>
            </div>

            <div className="testimonials__content">
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentIndex}
                  className="testimonials__card"
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.96 }}
                  transition={{ duration: 0.42 }}
                >
                  <div className="testimonials__arch" />

                  <div className="testimonials__quote-icon">
  <FiMessageCircle />
</div>

                  <div className="testimonials__rating" aria-label={`${rating} stars`}>
                    {[...Array(5)].map((_, index) => (
                      <FiStar
                        key={index}
                        className={index < rating ? 'filled' : ''}
                      />
                    ))}
                  </div>

                  <blockquote className="testimonials__text">
                    “{currentReview.text}”
                  </blockquote>

                  <div className="testimonials__author">
                    <div className="testimonials__avatar">
                      {currentReview.name?.charAt(0) || 'B'}
                    </div>

                    <div>
                      <span className="testimonials__author-name">
                        {currentReview.name}
                      </span>

                      {currentReview.role && (
                        <span className="testimonials__author-role">
                          {currentReview.role}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="testimonials__preview-list">
              {reviews.map((review, index) => (
                <button
                  type="button"
                  key={`${review.name}-${index}`}
                  className={`testimonials__preview ${
                    index === currentIndex ? 'active' : ''
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                >
                  <span className="testimonials__preview-avatar">
                    {review.name?.charAt(0) || 'B'}
                  </span>

                  <span className="testimonials__preview-info">
                    <strong>{review.name}</strong>
                    <small>{review.role || 'Guest'}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="testimonials__progress">
              {reviews.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  className={`testimonials__dot ${
                    index === currentIndex ? 'active' : ''
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;