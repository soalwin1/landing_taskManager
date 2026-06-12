"use client";

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'Features', target: 'features' },
    { label: 'Contact', target: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar style on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy logic to detect current active section
      const scrollPosition = window.scrollY + 120; // Scroll offset to trigger slightly early
      let currentActive = 'hero';

      // Special case: check if we are at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      
      if (isAtBottom) {
        currentActive = 'contact';
      } else {
        for (const item of navItems) {
          const element = document.getElementById(item.target);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              currentActive = item.target;
              break;
            }
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger scroll check on mount in case page is refreshed midway
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const element = document.getElementById(target);
    if (element) {
      // Smooth scroll manually or let CSS scroll-behavior handle it
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.container}`}>
          {/* Logo/Brand */}
          <a href="#hero" onClick={(e) => handleLinkClick(e, 'hero')} className={styles.brand}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.logoIcon}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            TaskFlow
          </a>

          {/* Desktop Links */}
          <ul className={styles.navLinks}>
            {navItems.map((item) => (
              <li key={item.target}>
                <a
                  href={`#${item.target}`}
                  onClick={(e) => handleLinkClick(e, item.target)}
                  className={`${styles.navLink} ${activeSection === item.target ? styles.activeLink : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA Button */}
          <div className={styles.ctaWrapper}>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className={styles.ctaBtn}>
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className={styles.mobileToggle} 
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayActive : ''}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <aside className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavActive : ''}`}>
        <ul className={styles.mobileLinks}>
          {navItems.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                onClick={(e) => handleLinkClick(e, item.target)}
                className={`${styles.mobileLink} ${activeSection === item.target ? styles.mobileActiveLink : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.mobileCta}>
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, 'contact')} 
            className="btn-primary"
            style={{ display: 'block', textAlign: 'center', width: '100%' }}
          >
            Get Started
          </a>
        </div>
      </aside>
    </>
  );
}
