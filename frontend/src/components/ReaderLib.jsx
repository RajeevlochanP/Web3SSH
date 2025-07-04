import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ReaderNav from './ReaderNav'
import styles from '../styles/ReaderLib.module.css'

function ReaderLib() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
  }, [])

  const purchasedBooks = [
    {
      id: 1,
      title: "The Blockchain Revolution",
      author: "Sarah Chen",
      genre: "Technology",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      purchaseDate: "2024-01-15",
      price: "0.05 ETH",
      status: "reading",
      progress: 65,
      rating: 4.8,
      downloadUrl: "#",
      description: "Explore how blockchain technology is transforming industries and reshaping our digital future."
    },
    {
      id: 2,
      title: "Digital Nomad's Guide",
      author: "Marcus Rodriguez",
      genre: "Lifestyle",
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
      purchaseDate: "2024-01-10",
      price: "0.03 ETH",
      status: "completed",
      progress: 100,
      rating: 4.6,
      downloadUrl: "#",
      description: "Master the art of remote work and travel while building a successful career."
    },
    {
      id: 3,
      title: "Quantum Computing Basics",
      author: "Dr. Emily Watson",
      genre: "Science",
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400",
      purchaseDate: "2024-01-08",
      price: "0.04 ETH",
      status: "not-started",
      progress: 0,
      rating: 4.9,
      downloadUrl: "#",
      description: "A beginner-friendly introduction to the fascinating world of quantum computing."
    },
    {
      id: 4,
      title: "Sustainable Living",
      author: "Green Earth Collective",
      genre: "Environment",
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
      purchaseDate: "2024-01-05",
      price: "0.02 ETH",
      status: "completed",
      progress: 100,
      rating: 4.7,
      downloadUrl: "#",
      description: "Practical tips and strategies for living an eco-friendly lifestyle in the modern world."
    },
    {
      id: 5,
      title: "AI Ethics & Society",
      author: "Prof. David Kim",
      genre: "Philosophy",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      purchaseDate: "2024-01-03",
      price: "0.06 ETH",
      status: "reading",
      progress: 32,
      rating: 4.5,
      downloadUrl: "#",
      description: "Examining the ethical implications of artificial intelligence in our society."
    },
    {
      id: 6,
      title: "Creative Writing Mastery",
      author: "Luna Martinez",
      genre: "Education",
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400",
      purchaseDate: "2023-12-28",
      price: "0.03 ETH",
      status: "completed",
      progress: 100,
      rating: 4.8,
      downloadUrl: "#",
      description: "Unlock your creative potential with proven techniques from bestselling authors."
    }
  ]

  const libraryStats = {
    totalBooks: purchasedBooks.length,
    totalSpent: purchasedBooks.reduce((sum, book) => sum + parseFloat(book.price.split(' ')[0]), 0).toFixed(2),
    completedBooks: purchasedBooks.filter(book => book.status === 'completed').length,
    currentlyReading: purchasedBooks.filter(book => book.status === 'reading').length
  }

  const filteredBooks = purchasedBooks.filter(book => {
    const matchesFilter = activeFilter === 'all' || book.status === activeFilter
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.purchaseDate) - new Date(a.purchaseDate)
      case 'title':
        return a.title.localeCompare(b.title)
      case 'author':
        return a.author.localeCompare(b.author)
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'reading':
        return { text: 'Reading', class: styles.statusReading }
      case 'completed':
        return { text: 'Completed', class: styles.statusCompleted }
      case 'not-started':
        return { text: 'Not Started', class: styles.statusNotStarted }
      default:
        return { text: 'Unknown', class: styles.statusDefault }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className={styles.readerLib}>
      <ReaderNav />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Header Section */}
          <section className={styles.header} data-aos="fade-up">
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>My Library</h1>
              <p className={styles.pageSubtitle}>
                Your collection of purchased books on the blockchain
              </p>
            </div>
            
            {/* Library Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard} data-aos="fade-up" data-aos-delay="100">
                <div className={styles.statIcon}>📚</div>
                <div className={styles.statNumber}>{libraryStats.totalBooks}</div>
                <div className={styles.statLabel}>Total Books</div>
              </div>
              <div className={styles.statCard} data-aos="fade-up" data-aos-delay="200">
                <div className={styles.statIcon}>💰</div>
                <div className={styles.statNumber}>{libraryStats.totalSpent} ETH</div>
                <div className={styles.statLabel}>Total Spent</div>
              </div>
              <div className={styles.statCard} data-aos="fade-up" data-aos-delay="300">
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statNumber}>{libraryStats.completedBooks}</div>
                <div className={styles.statLabel}>Completed</div>
              </div>
              <div className={styles.statCard} data-aos="fade-up" data-aos-delay="400">
                <div className={styles.statIcon}>📖</div>
                <div className={styles.statNumber}>{libraryStats.currentlyReading}</div>
                <div className={styles.statLabel}>Reading</div>
              </div>
            </div>
          </section>

          {/* Controls Section */}
          <section className={styles.controls} data-aos="fade-up" data-aos-delay="500">
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <div className={styles.searchIcon}>🔍</div>
                <input
                  type="text"
                  placeholder="Search your library..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={styles.clearSearch}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Filter by Status:</label>
                <div className={styles.filterButtons}>
                  <button
                    className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
                    onClick={() => setActiveFilter('all')}
                  >
                    All Books
                  </button>
                  <button
                    className={`${styles.filterBtn} ${activeFilter === 'reading' ? styles.active : ''}`}
                    onClick={() => setActiveFilter('reading')}
                  >
                    Reading
                  </button>
                  <button
                    className={`${styles.filterBtn} ${activeFilter === 'completed' ? styles.active : ''}`}
                    onClick={() => setActiveFilter('completed')}
                  >
                    Completed
                  </button>
                  <button
                    className={`${styles.filterBtn} ${activeFilter === 'not-started' ? styles.active : ''}`}
                    onClick={() => setActiveFilter('not-started')}
                  >
                    Not Started
                  </button>
                </div>
              </div>

              <div className={styles.sortGroup}>
                <label className={styles.sortLabel}>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                >
                  <option value="recent">Recent Purchase</option>
                  <option value="title">Title A-Z</option>
                  <option value="author">Author A-Z</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </section>

          {/* Books Grid */}
          <section className={styles.booksSection}>
            {sortedBooks.length === 0 ? (
              <div className={styles.emptyState} data-aos="fade-up">
                <div className={styles.emptyIcon}>📚</div>
                <h3 className={styles.emptyTitle}>No books found</h3>
                <p className={styles.emptyText}>
                  {searchQuery ? 'Try adjusting your search terms' : 'Start building your library by purchasing books'}
                </p>
              </div>
            ) : (
              <div className={styles.booksGrid}>
                {sortedBooks.map((book, index) => (
                  <article
                    key={book.id}
                    className={styles.bookCard}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className={styles.bookImageContainer}>
                      <img
                        src={book.image}
                        alt={book.title}
                        className={styles.bookImage}
                      />
                      <div className={styles.bookOverlay}>
                        <button className={styles.readBtn}>
                          {book.status === 'not-started' ? 'Start Reading' : 'Continue Reading'}
                        </button>
                        <button className={styles.downloadBtn}>Download</button>
                      </div>
                      <div className={`${styles.statusBadge} ${getStatusBadge(book.status).class}`}>
                        {getStatusBadge(book.status).text}
                      </div>
                    </div>

                    <div className={styles.bookContent}>
                      <div className={styles.bookMeta}>
                        <span className={styles.bookGenre}>{book.genre}</span>
                        <div className={styles.bookRating}>
                          <span className={styles.stars}>⭐</span>
                          <span className={styles.ratingValue}>{book.rating}</span>
                        </div>
                      </div>

                      <h3 className={styles.bookTitle}>{book.title}</h3>
                      <p className={styles.bookAuthor}>by {book.author}</p>
                      <p className={styles.bookDescription}>{book.description}</p>

                      {book.status === 'reading' && (
                        <div className={styles.progressContainer}>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressFill}
                              style={{ width: `${book.progress}%` }}
                            ></div>
                          </div>
                          <span className={styles.progressText}>{book.progress}% complete</span>
                        </div>
                      )}

                      <div className={styles.bookFooter}>
                        <div className={styles.purchaseInfo}>
                          <div className={styles.bookPrice}>{book.price}</div>
                          <div className={styles.purchaseDate}>
                            Purchased {formatDate(book.purchaseDate)}
                          </div>
                        </div>
                        <div className={styles.bookActions}>
                          <button className={styles.actionBtn}>
                            {book.status === 'not-started' ? 'Start' : 'Read'}
                          </button>
                          <button className={styles.moreBtn}>⋯</button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default ReaderLib