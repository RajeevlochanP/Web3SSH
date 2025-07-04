import styles from '../styles/Hero.module.css'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';

function Hero() {
    const isConnected = useSelector(state => state.connect.isConnected);

    return (
        <section className={styles.hero} id="home">
            <div className={styles.container}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Revolutionize Book Publishing with <span className={styles.highlight}>Blockchain</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Discover, publish, and read books on the world's first decentralized book platform.
                        Own your content, connect with readers, and earn from your creativity.
                    </p>
                    {isConnected ?
                        <div>
                            <h1 className={styles.highlight}>What would you like to do?</h1>
                            <div className={styles.heroActions}>
                                <Link to={'/p/home'}>
                                    <button className={styles.primaryBtn}>Publish Books</button>
                                </Link>
                                <Link to={'/r/home'}>
                                    <button className={styles.secondaryBtn}>Read Books</button>
                                </Link>
                            </div>
                        </div> :
                        <h1 className={styles.highlight}>Connect your wallet to get started</h1>}
                </div>
                <div className={styles.heroImage}>
                    <div className={styles.bookStack}>
                        <div className={styles.book}></div>
                        <div className={styles.book}></div>
                        <div className={styles.book}></div>
                    </div>
                    <div className={styles.blockchain}>
                        <div className={styles.block}></div>
                        <div className={styles.block}></div>
                        <div className={styles.block}></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero