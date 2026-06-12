import styles from './Features.module.css';

const featuresData = [
  {
    title: 'Smart Prioritization',
    description: 'Easily tag your tasks as High, Medium, or Low priority so you always know what to tackle first.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    )
  },
  {
    title: 'Intuitive Dashboard',
    description: 'A clean, distraction-free interface that lets you view all your pending, in-review, and completed tasks at a glance.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    )
  },
  {
    title: 'Deadline Tracking',
    description: 'Never miss a due date again. Visual indicators help you stay on top of your upcoming deadlines.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  }
];

export default function Features() {
  return (
    <section className={styles.features} id="features">
      <div className="container">
        <div className={styles.header}>
          <h2 className={`${styles.title} text-gradient`}>Everything you need</h2>
          <p className={styles.subtitle}>
            A powerful set of features designed to make task management effortless and efficient.
          </p>
        </div>
        
        <div className={styles.grid}>
          {featuresData.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
