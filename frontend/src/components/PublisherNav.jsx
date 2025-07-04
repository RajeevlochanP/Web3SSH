import React from 'react'
import styles from '../styles/PublisherHome.module.css'
import { Link } from 'react-router-dom'

function PublisherNav() {
  return (

      <header className={styles.header}>
              <div className={styles.container}>
                <div className={styles.logo}>
                  <div className={styles.logoIcon}>📚</div>
                  <span className={styles.brandName}>BookChain</span>
                  <span className={styles.publisherBadge}>Publisher</span>
                </div>
                
                <nav className={styles.nav}>
                  <Link to={"/p/home"} className={styles.navLink}>Dashboard</Link>
                  <Link to={"/p/publications"} className={styles.navLink}>Publications</Link>
                </nav>
              </div>
            </header>

  )
}

export default PublisherNav
