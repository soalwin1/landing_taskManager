'use client';

import { useActionState, useEffect, useRef } from 'react';
import { sendContactEmail, FormState } from '../app/actions';
import styles from './Contact.module.css';

const initialState: FormState = {
  success: false,
  message: '',
};

export default function Contact() {
  const [state, formAction, pending] = useActionState(sendContactEmail, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form fields upon successful email sending
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section className={styles.contact} id="contact">
      <div className="container">
        <div className={styles.header}>
          <h2 className={`${styles.title} text-gradient`}>Get in Touch</h2>
          <p className={styles.subtitle}>
            Have questions or feedback? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left Side: Contact Information Cards */}
          <div className={styles.infoSection}>
            <div className={`${styles.infoCard} glass-panel`}>
              <h3 className={styles.cardHeader}>Contact Information</h3>
              <p className={styles.cardInfoText}>
                We'd love to hear from you. Feel free to contact our team for support, business inquiries, or feature requests.
              </p>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.iconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.infoLabel}>Email Us</div>
                    <a href="mailto:support@taskflow.com" className={styles.infoValue}>support@taskflow.com</a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.infoLabel}>Our Headquarters</div>
                    <div className={styles.infoValue}>San Francisco, CA</div>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.iconWrapper}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <div className={styles.infoLabel}>System Status</div>
                    <div className={`${styles.infoValue} ${styles.statusText}`}>
                      <span className={styles.statusDot}></span> All Systems Operational
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form Panel */}
          <div className={`${styles.formCard} glass-panel`}>
            <form ref={formRef} action={formAction} className={styles.form}>
              
              {/* Feedback Message Banners */}
              {state.message && (
                <div className={`${styles.messageBanner} ${state.success ? styles.successBanner : styles.errorBanner}`}>
                  {state.success ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                  <span>{state.message}</span>
                </div>
              )}

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className={`${styles.input} ${state.errors?.name ? styles.inputError : ''}`}
                    disabled={pending}
                  />
                  {state.errors?.name && (
                    <span className={styles.errorText}>{state.errors.name[0]}</span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    className={`${styles.input} ${state.errors?.email ? styles.inputError : ''}`}
                    disabled={pending}
                  />
                  {state.errors?.email && (
                    <span className={styles.errorText}>{state.errors.email[0]}</span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  className={`${styles.input} ${state.errors?.subject ? styles.inputError : ''}`}
                  disabled={pending}
                />
                {state.errors?.subject && (
                  <span className={styles.errorText}>{state.errors.subject[0]}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  className={`${styles.textarea} ${state.errors?.message ? styles.inputError : ''}`}
                  disabled={pending}
                ></textarea>
                {state.errors?.message && (
                  <span className={styles.errorText}>{state.errors.message[0]}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={pending}
                className={`btn-primary ${styles.submitBtn}`}
              >
                {pending ? (
                  <>
                    <span className={styles.spinner}></span>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
