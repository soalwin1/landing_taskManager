"use client";

import styles from './Hero.module.css';
import HighlightsCarousel from './HighlightsCarousel';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.textGroup}>
          <h1 className={`${styles.title} scale-in`}>
            Manage Tasks with <span className="text-gradient">Precision</span>
          </h1>
          <p className={`${styles.subtitle} fade-in-up delay-1`}>
            TaskFlow helps you organize, prioritize, and accomplish your daily tasks with an elegant and intuitive interface. 
          </p>
          <div className={`${styles.actions} scale-in delay-2`}>
            <button className="btn-primary">Start for Free</button>
          </div>
        </div>
        
        <div className={`scale-in delay-3 ${styles.carouselWrapper}`}>
          <HighlightsCarousel />
        </div>
      </div>
    </section>
  );
}
