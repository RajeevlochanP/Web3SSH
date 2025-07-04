import styles from '../styles/About.module.css'

function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h2 className={styles.aboutTitle}>Democratizing Book Publishing</h2>
            <p className={styles.aboutDescription}>
              BookChain is built on the belief that every author deserves to share their story 
              without barriers. Using blockchain technology, we've created a platform where 
              authors maintain full control over their work while reaching readers globally.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>10,000+</div>
                <div className={styles.statLabel}>Books Published</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>50,000+</div>
                <div className={styles.statLabel}>Active Readers</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>$2M+</div>
                <div className={styles.statLabel}>Earned by Authors</div>
              </div>
            </div>
          </div>
          <div className={styles.aboutImage}>
            <div className={styles.imageContainer}>
              <div className={styles.readingPerson}></div>
              <div className={styles.floatingBooks}>
                <div className={styles.floatingBook}></div>
                <div className={styles.floatingBook}></div>
                <div className={styles.floatingBook}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About