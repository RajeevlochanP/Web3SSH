import { useState, useEffect,useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ReaderNav from './ReaderNav'
import styles from '../styles/ReaderProfile.module.css'
import {handleGetCoins,checkBalance,withdraw} from '../helper/clickFunctions.js'
import toast from 'react-hot-toast'


function ReaderProfile() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false);
  const [isWd, setIsWd] = useState(false);
  const [coins,setCoins]=useState(0); 
  const getCoinsChange=useRef();
  const getEthers=useRef();

  const [userInfo, setUserInfo] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    bio: 'Passionate reader and blockchain enthusiast. Love exploring new technologies and sharing knowledge through books.',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    walletAddress: '0x742d35Cc6634C0532925a3b8D404d3aaBf5c1234'
  })

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
    async function fetch() {
      let result=await checkBalance();
      // result.wait();
      console.log(result);
      if(result>-1) {
        setCoins(result);
      }
      else {
        toast.error("Error while fetching balance");
      }
    }
    fetch();
  }, [])

  const readingStats = {
    booksRead: 47,
    currentlyReading: 3,
    wishlist: 12,
    totalSpent: '2.45 ETH',
    favoriteGenre: 'Technology',
    readingStreak: 15
  }

  const recentBooks = [
    {
      id: 1,
      title: "The Blockchain Revolution",
      author: "Sarah Chen",
      progress: 85,
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 2,
      title: "Digital Nomad's Guide",
      author: "Marcus Rodriguez",
      progress: 45,
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 3,
      title: "AI Ethics & Society",
      author: "Prof. David Kim",
      progress: 100,
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ]

  const achievements = [
    { icon: '📚', title: 'Bookworm', description: 'Read 50+ books', unlocked: false },
    { icon: '🔥', title: 'Reading Streak', description: '15 days in a row', unlocked: true },
    { icon: '⭐', title: 'Top Reviewer', description: 'Left 25+ reviews', unlocked: true },
    { icon: '🎯', title: 'Genre Explorer', description: 'Read 5+ genres', unlocked: true },
    { icon: '💎', title: 'Early Adopter', description: 'Joined in beta', unlocked: true },
    { icon: '🏆', title: 'Reading Champion', description: 'Read 100+ books', unlocked: false }
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log('Saving user info:', userInfo)
  }

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  async function getCoins() {
    console.log("dsklhf");
    let handle=await handleGetCoins(getCoinsChange.current.value);
    // handle.wait();
    if(handle.length<=1) {
      toast.error(handle);
      return ;
    }
    let bal=await checkBalance();
    console.log(bal);
    if(bal>-1) {
      setCoins(bal);
    }
    else {
      toast.error("Error while fetching balance");
    }
  }

  async function handleWithDraw() {
    let handle=await withdraw(getEthers.current.value);
    if(handle.length<=1) {
      toast.error(handle);
      return ;
    }
    let bal=await checkBalance();
    if(bal<0) {
      toast.error("Error fetching balance");
      return ;
    }
    setCoins(bal);
    toast.success("Fetched balance successfully");
  }

  return (
    <div className={styles.readerProfile}>
      <ReaderNav />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Profile Header */}
          <section className={styles.profileHeader} data-aos="fade-up">
            <div className={styles.profileInfo}>
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  <span className={styles.avatarText}>AJ</span>
                </div>

              </div>

              <div className={styles.userDetails}>
                {isEditing ? (
                  <div className={styles.editForm}>
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={styles.editInput}
                    />
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={styles.editInput}
                    />
                    <textarea
                      value={userInfo.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className={styles.editTextarea}
                      rows="3"
                    />
                    <input
                      type="text"
                      value={userInfo.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={styles.editInput}
                      placeholder="Location"
                    />
                  </div>
                ) : (
                  <div className={styles.userInfo}>
                    <h1 className={styles.userName}>{userInfo.name}</h1>
                    <p className={styles.userEmail}>{userInfo.email}</p>
                    <p className={styles.userBio}>{userInfo.bio}</p>
                    <div className={styles.userMeta}>
                      <span className={styles.metaItem}>📍 {userInfo.location}</span>
                      <span className={styles.metaItem}>📅 Joined {userInfo.joinDate}</span>
                    </div>
                  </div>
                )}

                <div className={styles.profileActions}>
                  {isEditing ? (
                    <div className={styles.editActions}>
                      <button onClick={handleSave} className={styles.saveBtn}>Save Changes</button>
                      <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className={styles.editBtn}>Edit Profile</button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <nav className={styles.tabNavigation} data-aos="fade-up" data-aos-delay="200">
            <button
              className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.active : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'library' ? styles.active : ''}`}
              onClick={() => setActiveTab('library')}
            >
              My Library
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'achievements' ? styles.active : ''}`}
              onClick={() => setActiveTab('achievements')}
            >
              Achievements
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.active : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === 'overview' && (
              <div className={styles.overviewTab} data-aos="fade-up" data-aos-delay="300">
                {/* Reading Stats */}
                <section className={styles.statsSection}>
                  <h2 className={styles.sectionTitle}>Reading Statistics</h2>
                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>{readingStats.booksRead}</div>
                      <div className={styles.statLabel}>Books Read</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>{readingStats.currentlyReading}</div>
                      <div className={styles.statLabel}>Currently Reading</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>{readingStats.wishlist}</div>
                      <div className={styles.statLabel}>Wishlist</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>{readingStats.totalSpent}</div>
                      <div className={styles.statLabel}>Total Spent</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>{readingStats.readingStreak}</div>
                      <div className={styles.statLabel}>Day Streak</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statNumber}>{readingStats.favoriteGenre}</div>
                      <div className={styles.statLabel}>Favorite Genre</div>
                    </div>
                  </div>
                </section>

                {/* Recent Books */}
                <section className={styles.recentBooksSection}>
                  <h2 className={styles.sectionTitle}>Recent Activity</h2>
                  <div className={styles.recentBooks}>
                    {recentBooks.map((book, index) => (
                      <div key={book.id} className={styles.recentBook} data-aos="fade-up" data-aos-delay={400 + index * 100}>
                        <img src={book.image} alt={book.title} className={styles.bookImage} />
                        <div className={styles.bookInfo}>
                          <h3 className={styles.bookTitle}>{book.title}</h3>
                          <p className={styles.bookAuthor}>by {book.author}</p>
                          <div className={styles.progressContainer}>
                            <div className={styles.progressBar}>
                              <div
                                className={styles.progressFill}
                                style={{ width: `${book.progress}%` }}
                              ></div>
                            </div>
                            <span className={styles.progressText}>{book.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'library' && (
              <div className={styles.libraryTab} data-aos="fade-up" data-aos-delay="300">
                <h2 className={styles.sectionTitle}>My Library</h2>
                <div className={styles.libraryFilters}>
                  <button className={styles.filterBtn}>All Books</button>
                  <button className={styles.filterBtn}>Currently Reading</button>
                  <button className={styles.filterBtn}>Completed</button>
                  <button className={styles.filterBtn}>Wishlist</button>
                </div>
                <div className={styles.libraryGrid}>
                  {recentBooks.map((book, index) => (
                    <div key={book.id} className={styles.libraryBook} data-aos="fade-up" data-aos-delay={400 + index * 100}>
                      <img src={book.image} alt={book.title} className={styles.libraryBookImage} />
                      <div className={styles.libraryBookInfo}>
                        <h3 className={styles.libraryBookTitle}>{book.title}</h3>
                        <p className={styles.libraryBookAuthor}>{book.author}</p>
                        <div className={styles.libraryBookActions}>
                          <button className={styles.continueBtn}>Continue Reading</button>
                          <button className={styles.removeBtn}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className={styles.achievementsTab} data-aos="fade-up" data-aos-delay="300">
                <h2 className={styles.sectionTitle}>Achievements</h2>
                <div className={styles.achievementsGrid}>
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`${styles.achievementCard} ${achievement.unlocked ? styles.unlocked : styles.locked}`}
                      data-aos="fade-up"
                      data-aos-delay={400 + index * 100}
                    >
                      <div className={styles.achievementIcon}>{achievement.icon}</div>
                      <h3 className={styles.achievementTitle}>{achievement.title}</h3>
                      <p className={styles.achievementDescription}>{achievement.description}</p>
                      {achievement.unlocked && <div className={styles.unlockedBadge}>Unlocked!</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className={styles.settingsTab} data-aos="fade-up" data-aos-delay="300">
                <h2 className={styles.sectionTitle}>Account Settings</h2>
                <div className={styles.settingsSection}>
                  <div className={styles.settingGroup}>
                    <h3 className={styles.settingTitle}>Wallet Information</h3>
                    <div className={styles.walletInfo}>
                      <label className={styles.settingLabel}>Wallet Address:</label>
                      <div className={styles.walletAddress}>
                        <span className={styles.addressText}>{userInfo.walletAddress}</span>
                        <button className={styles.copyBtn}>Copy</button>
                      </div>
                    </div>
                  </div>


                  <div className={styles.settingGroup}>
                    <span className={styles.editBtn} style={{ width: '120px' }}>Coins : {coins}</span>

                    {!isWd && <button
                      className={styles.editBtn}
                      style={{ margin: '0px 8px' }}
                      onClick={() => { setIsAdding(true) }}
                    >Add More</button>}
                    {isAdding &&
                      <div style={{margin:'15px 0px',display:'flex',gap:'5px',width:'500px'}}>
                        <input type="text" placeholder='Enter No of ethers' className={styles.searchInput} ref={getCoinsChange}/>
                        <button 
                          className={styles.primaryBtn}
                          onClick={getCoins}

                        >Change</button>
                        <button className={styles.secondaryBtn} onClick={()=>{setIsAdding(false)}}>Cancel</button>
                      </div>
                    }

                    {!isAdding && <button
                      className={styles.editBtn}
                      style={{ margin: '0px 8px' }}
                      onClick={()=>{setIsWd(true)}}
                    >With Draw</button>}

                    {isWd &&
                      <div style={{margin:'15px 0px',display:'flex',gap:'5px',width:'500px'}}>
                        <input type="text" 
                          placeholder='Enter No coins' 
                          className={styles.searchInput}
                          ref={getEthers}
                        />
                        <button 
                          className={styles.primaryBtn}
                          onClick={handleWithDraw}
                        >WithDraw</button>
                        <button className={styles.secondaryBtn} onClick={()=>{setIsWd(false)}}>Cancel</button>
                      </div>
                    }
                  </div>


                  <div className={styles.settingGroup}>
                    <h3 className={styles.settingTitle}>Privacy</h3>
                    <div className={styles.privacySettings}>
                      <label className={styles.checkboxLabel}>
                        <input type="checkbox" defaultChecked />
                        <span className={styles.checkmark}></span>
                        Make reading activity public
                      </label>
                      <label className={styles.checkboxLabel}>
                        <input type="checkbox" defaultChecked />
                        <span className={styles.checkmark}></span>
                        Allow friend requests
                      </label>
                    </div>
                  </div>

                  <div className={styles.dangerZone}>
                    <h3 className={styles.dangerTitle}>Danger Zone</h3>
                    <button className={styles.deleteBtn}>Delete Account</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ReaderProfile