import styles from '../styles/Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <div className={styles.logoIcon}>📚</div>
              <span className={styles.brandName}>BookChain</span>
            </div>
            <p className={styles.footerDescription}>
              Empowering authors and readers through blockchain technology
            </p>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Platform</h4>
            <ul className={styles.footerList}>
              <li><a href="#" className={styles.footerLink}>Publish a Book</a></li>
              <li><a href="#" className={styles.footerLink}>Browse Books</a></li>
              <li><a href="#" className={styles.footerLink}>Author Dashboard</a></li>
              <li><a href="#" className={styles.footerLink}>Reader Library</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Company</h4>
            <ul className={styles.footerList}>
              <li><a href="#" className={styles.footerLink}>About Us</a></li>
              <li><a href="#" className={styles.footerLink}>Blog</a></li>
              <li><a href="#" className={styles.footerLink}>Careers</a></li>
              <li><a href="#" className={styles.footerLink}>Press</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Support</h4>
            <ul className={styles.footerList}>
              <li><a href="#" className={styles.footerLink}>Help Center</a></li>
              <li><a href="#" className={styles.footerLink}>Contact Us</a></li>
              <li><a href="#" className={styles.footerLink}>Privacy Policy</a></li>
              <li><a href="#" className={styles.footerLink}>Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© 2025 BookChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer