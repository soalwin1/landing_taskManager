"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './HighlightsCarousel.module.css';

const images = [
  { src: '/preview.png', alt: 'Dashboard Overview' },
  { src: '/Screenshot (33).png', alt: 'Smart Prioritization Board' },
  { src: '/Screenshot (34).png', alt: 'Deadline Tracking Panel' },
  { src: '/Screenshot (35).png', alt: 'Task Analytics View' },
];

export default function HighlightsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isHovered || isLightboxOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, isLightboxOpen]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const renderLightbox = () => {
    if (!isLightboxOpen || !mounted) return null;

    return createPortal(
      <div className={styles.lightboxOverlay} role="dialog" aria-modal="true">
        {/* Decoupled Backdrop trigger closes lightbox only on backdrop click */}
        <div 
          className={styles.lightboxBackdrop} 
          onClick={() => setIsLightboxOpen(false)}
        />
        
        {/* Controls and content wrapper */}
        <div className={styles.lightboxWrapper}>
          <button 
            className={styles.closeButton} 
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close fullscreen view"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev Navigation Arrow */}
          <button 
            className={`${styles.lightboxNavButton} ${styles.lightboxPrev}`} 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Lightbox Main Image & Caption */}
          <div className={styles.lightboxContent}>
            <img 
              key={currentIndex}
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt} 
              className={styles.lightboxImage}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://via.placeholder.com/1000x625/1e293b/6366f1?text=${encodeURIComponent(images[currentIndex].alt)}`;
              }}
            />
            <div className={styles.lightboxCaption}>
              {images[currentIndex].alt}
            </div>
          </div>

          {/* Next Navigation Arrow */}
          <button 
            className={`${styles.lightboxNavButton} ${styles.lightboxNext}`} 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev + 1) % images.length);
            }}
            aria-label="Next image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div 
        className={`${styles.carouselContainer} glass-panel`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Product screenshots showcase"
      >
        {/* Viewport for clipping slides */}
        <div className={styles.viewport} onClick={() => setIsLightboxOpen(true)} style={{ cursor: 'zoom-in' }}>
          <div 
            className={styles.slider} 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className={styles.slide}>
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className={styles.image}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/1000x625/1e293b/6366f1?text=${encodeURIComponent(image.alt)}`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* View Button — always visible */}
        <button 
          className={styles.zoomButton} 
          onClick={() => setIsLightboxOpen(true)}
          aria-label="View screenshot fullscreen"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          View
        </button>

        {/* Navigation Arrows */}
        <button 
          className={`${styles.navButton} ${styles.prevButton}`} 
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button 
          className={`${styles.navButton} ${styles.nextButton}`} 
          onClick={handleNext}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Pagination Indicators */}
        <div className={styles.pagination}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Render Lightbox via Portal */}
      {renderLightbox()}
    </>
  );
}
