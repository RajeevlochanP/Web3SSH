import styles from '../styles/Features.module.css'

function Features() {
  const features = [
    {
      icon: '🔒',
      title: 'Secure Publishing',
      description: 'Your books are secured on the blockchain, ensuring authenticity and preventing unauthorized copying.'
    },
    {
      icon: '💰',
      title: 'Direct Monetization',
      description: 'Earn directly from your readers without intermediaries. Set your own prices and keep more of your profits.'
    },
    {
      icon: '🌐',
      title: 'Global Reach',
      description: 'Access readers worldwide instantly. No geographical restrictions or complex distribution networks.'
    },
    {
      icon: '📊',
      title: 'Transparent Analytics',
      description: 'Track your book performance with blockchain-verified analytics. See real-time sales and reader engagement.'
    },
    {
      icon: '🎨',
      title: 'Creative Freedom',
      description: 'Publish any genre, any format. No gatekeepers deciding what readers can access.'
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      description: 'Connect with readers and authors in a decentralized community. Build your following organically.'
    }
  ]

  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose BookChain?</h2>
          <p className={styles.sectionSubtitle}>
            Experience the future of book publishing with blockchain technology
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features