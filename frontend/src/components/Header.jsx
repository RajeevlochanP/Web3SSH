import styles from '../styles/Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { connectionActions } from '../store/store.js'
import toast from 'react-hot-toast';
import { useState } from 'react';

function Header() {
    const dispatch = useDispatch();
    const isConnected=useSelector(state=>state.connect.isConnected);
    const [openBuy,setOpenBuy]=useState(false);

    function handleConnect() {
        // connecting to wallet logic goes here
        dispatch(connectionActions.connect());
        toast.success("Connected to wallet successfully");
    }

    function handlePurchase() {
        //
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
                </nav>
                <div className={styles.actions}>
                   {!isConnected && 
                   <button 
                        className={styles.signupBtn} 
                        onClick={handleConnect}
                   >
                    Connect Wallet</button>}

                   {(isConnected && !openBuy) &&
                   <button 
                        className={styles.signupBtn}
                        onClick={()=>{setOpenBuy(true)}}
                    >
                    Purchase V</button>}

                    {openBuy && 
                        <div className={styles.actions}> 
                            <input 
                                type="text" 
                                placeholder='Enter Number of V'
                                className={styles.searchInput}
                            />
                            <button 
                                className={styles.signupBtn} 
                                onClick={handlePurchase}
                            >Buy</button>

                            <button 
                                className={styles.loginBtn} 
                                onClick={()=>{setOpenBuy(false)}}
                            >Cancel</button>
                        </div>
                    }

                    <div className={styles.actions}>
                        
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header