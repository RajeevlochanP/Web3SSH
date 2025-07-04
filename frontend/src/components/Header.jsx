import styles from '../styles/Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { connectionActions, userdata } from '../store/store.js'
import toast from 'react-hot-toast';
import { ethers } from "ethers";
import { useEffect,useState } from 'react';
import { handleGetCoins } from '../helper/clickFunctions.js';

function Header() {
    const userData=useSelector(state=>state.userdata.address)
    const dispatch = useDispatch();
    const isConnected = useSelector(state => state.connect.isConnected);
    const [openBuy,setOpenBuy]=useState(false);
    async function handleConnect() {
        async function connectWallet() {
            if (!window.ethereum) {
                // alert("Please install MetaMask!");
                toast.error("neek account ledh raa");
                return;
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            // console.log(signer+"  ");
            dispatch(userdata.setData({address: address }));
            // const vard=useSelector(state=>state.userdata.data);
            dispatch(connectionActions.connect());
            toast.success("Connected to wallet successfully");
        }
        await connectWallet();
    }
    async function handleBuy(){
        
    }
    useEffect(()=>{console.log(userData)},[userData]);
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
                                onClick={handleBuy}
                            >Buy</button>

                            <button 
                                className={styles.loginBtn} 
                                onClick={()=>{setOpenBuy(false)}}
                            >Cancel</button>
                        </div>
                    }
            </div>
        </header>
    )
}

export default Header