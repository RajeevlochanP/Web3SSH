import styles from '../styles/Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { connectionActions } from '../store/store.js'
import toast from 'react-hot-toast';

function Header() {
    const dispatch = useDispatch();
    const isConnected=useSelector(state=>state.connect.isConnected);

    function handleConnect() {
        // connecting to wallet logic goes here
        dispatch(connectionActions.connect());
        toast.success("Connected to wallet successfully");
    }
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>📚</div>
                    <span className={styles.brandName}>BookChain</span>
                </div>
                <nav className={styles.nav}>
                    <a href="#home" className={styles.navLink}>Home</a>
                    <a href="#features" className={styles.navLink}>Features</a>
                    <a href="#about" className={styles.navLink}>About</a>
                    <a href="#contact" className={styles.navLink}>Contact</a>
                </nav>
                <div className={styles.actions}>
                   {!isConnected && <button className={styles.signupBtn} onClick={handleConnect}>Connect Wallet</button>}
                </div>
            </div>
        </header>
    )
}

export default Header