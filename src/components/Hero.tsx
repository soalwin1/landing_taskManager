"use client";

import styles from './Hero.module.css';
import HighlightsCarousel from './HighlightsCarousel';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className="container">
        <h1 className={`${styles.title} fade-in-up`}>
          Manage Tasks with <span className="text-gradient">Precision</span>
        </h1>
        <p className={`${styles.subtitle} fade-in-up delay-1`}>
          TaskFlow helps you organize, prioritize, and accomplish your daily tasks with an elegant and intuitive interface. 
        </p>
        <div className={`${styles.actions} fade-in-up delay-2`}>
          <button className="btn-primary">Start for Free</button>
        </div>
        
        <div className="fade-in-up delay-3">
          <HighlightsCarousel />
        </div>
      </div>
    </section>
  );
}
