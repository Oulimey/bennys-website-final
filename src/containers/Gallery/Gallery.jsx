import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FiArrowUpRight,
  FiCamera,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { images } from '../../constants';
import './Gallery.css';

const Gallery = () => {
  const [activeImage, setActiveImage] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const galleryImages = [
    {
      id: 1,
      src: images.gallery1,
      size: 'large',
    },
    {
      id: 2,
      src: images.gallery2,
      size: 'medium',
    },
    {
      id: 3,
      src: images.gallery3,
      size: 'small',
    },
    {
      id: 4,
      src: images.gallery4,
      size: 'small',
    },
    {
      id: 5,
      src: images.gallery5,
      size: 'medium',
    },
    {
      id: 6,
      src: images.gallery6,
      size: 'wide',
    },
  ];

  const openImage = (index) => {
    setActiveImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setActiveImage(null);
    document.body.style.overflow = '';
  };

  const showPrev = () => {
    setActiveImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const showNext = () => {
    setActiveImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="gallery section__padding" id="gallery" ref={sectionRef}>
      <div className="gallery__bg" aria-hidden="true">
        <div className="gallery__glow gallery__glow--1" />
        <div className="gallery__glow gallery__glow--2" />
        <div className="gallery__glow gallery__glow--3" />

        <div className="gallery__arch gallery__arch--1" />
        <div className="gallery__arch gallery__arch--2" />
        <div className="gallery__arch gallery__arch--3" />

        <div className="gallery__particles">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="gallery__noise" />
      </div>

      <div className="gallery__container">
        <motion.div
          className="gallery__header"
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
        >
          <div className="gallery__eyebrow">
            <span className="gallery__eyebrow-line" />
            <span>Gallery</span>
            <span className="gallery__eyebrow-line" />
          </div>

          <h2 className="gallery__title">
            Moments at <span>Benny&apos;s</span>
          </h2>

          <p className="gallery__subtitle">
            A visual glimpse into Benny&apos;s atmosphere, warm lighting, elegant details,
            and signature coffee-house mood.
          </p>
        </motion.div>

        <motion.div
          className="gallery__showcase"
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <div className="gallery__intro-card">
            <div className="gallery__intro-arch" />

            <span className="gallery__intro-icon">
              <FiCamera />
            </span>

            <span className="gallery__intro-label">Visual Gallery</span>

            <h3>Warm light, soft curves, and a refined café atmosphere.</h3>

            <p>
              A clean visual section built around Benny&apos;s premium identity:
              elegant spacing, glowing details, and the same soft arch language used
              throughout the website.
            </p>

            <div className="gallery__intro-note">
              <span>Click any image to enlarge</span>
              <FiArrowUpRight />
            </div>
          </div>

          <div className="gallery__grid">
            {galleryImages.map((image, index) => (
              <motion.button
                type="button"
                key={image.id}
                className={`gallery__item gallery__item--${image.size}`}
                onClick={() => openImage(index)}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + index * 0.08 }}
                aria-label={`Open gallery image ${index + 1}`}
              >
                <div className="gallery__item-inner">
                  <img src={image.src} alt={`Benny's gallery ${index + 1}`} />

                  <div className="gallery__item-overlay" />

                  <div className="gallery__item-content">
                    <span>View</span>
                  </div>

                  <span className="gallery__item-open">
                    <FiArrowUpRight />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeImage !== null && (
          <motion.div
            className="gallery__modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <button
              type="button"
              className="gallery__modal-close"
              onClick={closeImage}
              aria-label="Close gallery"
            >
              <FiX />
            </button>

            <button
              type="button"
              className="gallery__modal-nav gallery__modal-nav--prev"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
            >
              <FiChevronLeft />
            </button>

            <motion.div
              className="gallery__modal-content"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={galleryImages[activeImage].src}
                alt={`Benny's gallery ${activeImage + 1}`}
              />
            </motion.div>

            <button
              type="button"
              className="gallery__modal-nav gallery__modal-nav--next"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
            >
              <FiChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;