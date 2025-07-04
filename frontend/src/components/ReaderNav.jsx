import { useState } from 'react'
import styles from '../styles/ReaderNav.module.css'
import { Link } from 'react-router-dom'

function ReaderNav() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        console.log('Searching for:', searchQuery)
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>📚</div>
                    <span className={styles.brandName}>BookChain</span>
                    <span className={styles.readerBadge}>Reader</span>
                </div>

                <div className={styles.searchSection}>
                    <form onSubmit={handleSearch} className={styles.searchForm}>
                        <div className={`${styles.searchContainer} ${isSearchFocused ? styles.focused : ''}`}>
                            <div className={styles.searchIcon}>🔍</div>
                            <input
                                type="text"
                                placeholder="Search books, authors, genres..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                className={styles.searchInput}
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className={styles.clearButton}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <button type="submit" className={styles.searchButton}>
                            Search
                        </button>
                    </form>
                </div>

                <nav className={styles.nav}>
                    <Link to="/r/home" className={styles.navLink}>Home</Link>
                    <Link to="#library" className={styles.navLink}>My Library</Link>
                    <Link to="#favorites" className={styles.navLink}>Favorites</Link>
                </nav>


                <Link to={'/r/profile'}>
                    <div className={styles.userSection}>
                        <div className={styles.userProfile}>
                            <div className={styles.avatar}>👤</div>
                            <span className={styles.userName}>Reader</span>
                        </div>
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default ReaderNav