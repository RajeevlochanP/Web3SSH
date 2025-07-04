import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import About from './About'
import Footer from './Footer'
import styles from '../styles/LandingPage.module.css'

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <Header />
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  )
}

export default LandingPage