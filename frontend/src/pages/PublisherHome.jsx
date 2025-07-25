import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from '../styles/PublisherHome.module.css'
import { Link } from 'react-router-dom'

function PublisherHome() {
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

  const publications = [
    {
      id: 1,
      title: "The Blockchain Revolution",
      genre: "Technology",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "2024-01-15",
      price: "0.05 ETH",
      status: "published",
      sales: 245,
      revenue: "12.25 ETH",
      rating: 4.8,
      reviews: 89,
      description: "Explore how blockchain technology is transforming industries and reshaping our digital future."
    },
    {
      id: 2,
      title: "Digital Nomad's Guide",
      genre: "Lifestyle",
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "2024-01-10",
      price: "0.03 ETH",
      status: "published",
      sales: 189,
      revenue: "5.67 ETH",
      rating: 4.6,
      reviews: 67,
      description: "Master the art of remote work and travel while building a successful career."
    },
    {
      id: 3,
      title: "Quantum Computing Basics",
      genre: "Science",
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "2024-01-08",
      price: "0.04 ETH",
      status: "draft",
      sales: 0,
      revenue: "0 ETH",
      rating: 0,
      reviews: 0,
      description: "A beginner-friendly introduction to the fascinating world of quantum computing."
    },
    {
      id: 4,
      title: "Sustainable Living",
      genre: "Environment",
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "2024-01-05",
      price: "0.02 ETH",
      status: "published",
      sales: 312,
      revenue: "6.24 ETH",
      rating: 4.7,
      reviews: 124,
      description: "Practical tips and strategies for living an eco-friendly lifestyle in the modern world."
    },
    {
      id: 5,
      title: "AI Ethics & Society",
      genre: "Philosophy",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "2024-01-03",
      price: "0.06 ETH",
      status: "review",
      sales: 0,
      revenue: "0 ETH",
      rating: 0,
      reviews: 0,
      description: "Examining the ethical implications of artificial intelligence in our society."
    },
    {
      id: 6,
      title: "Creative Writing Mastery",
      genre: "Education",
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400",
      publishDate: "2023-12-28",
      price: "0.03 ETH",
      status: "published",
      sales: 156,
      revenue: "4.68 ETH",
      rating: 4.8,
      reviews: 78,
      description: "Unlock your creative potential with proven techniques from bestselling authors."
    }
  ]

  const publisherStats = {
    totalBooks: publications.length,
    publishedBooks: publications.filter(book => book.status === 'published').length,
    totalSales: publications.reduce((sum, book) => sum + book.sales, 0),
    totalRevenue: publications.reduce((sum, book) => sum + parseFloat(book.revenue.split(' ')[0]), 0).toFixed(2),
    averageRating: (publications.filter(book => book.rating > 0).reduce((sum, book) => sum + book.rating, 0) / publications.filter(book => book.rating > 0).length).toFixed(1),
    totalReviews: publications.reduce((sum, book) => sum + book.reviews, 0)
  }

  const filteredBooks = publications.filter(book => {
    const matchesFilter = activeFilter === 'all' || book.status === activeFilter
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.publishDate) - new Date(a.publishDate)
      case 'title':
        return a.title.localeCompare(b.title)
      case 'sales':
        return b.sales - a.sales
      case 'revenue':
        return parseFloat(b.revenue.split(' ')[0]) - parseFloat(a.revenue.split(' ')[0])
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return { text: 'Published', class: styles.statusPublished }
      case 'draft':
        return { text: 'Draft', class: styles.statusDraft }
      case 'review':
        return { text: 'Under Review', class: styles.statusReview }
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
    <div className={styles.publisherHome}>


      <main className={styles.main}>
        <div className={styles.container}>
          {/* Header Section */}
          <section className={styles.pageHeader} data-aos="fade-up">
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>Publisher Dashboard</h1>
              <p className={styles.pageSubtitle}>
                Manage your publications and track your success on the blockchain
              </p>
            </div>

            <div className={styles.quickActions}>
              <Link to={'/p/publish/new'}>
                <button className={styles.primaryBtn}>Publish New Book</button>
              </Link>
              <Link to={'/p/publications'}>
                <button className={styles.secondaryBtn}>View Publications</button>
              </Link>
            </div>
          </section>

          {/* Stats Section */}
          <section className={styles.statsSection} data-aos="fade-up" data-aos-delay="200">
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📚</div>
                <div className={styles.statNumber}>{publisherStats.totalBooks}</div>
                <div className={styles.statLabel}>Total Books</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>✅</div>
                <div className={styles.statNumber}>{publisherStats.publishedBooks}</div>
                <div className={styles.statLabel}>Published</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📊</div>
                <div className={styles.statNumber}>{publisherStats.totalSales}</div>
                <div className={styles.statLabel}>Total Sales</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>💰</div>
                <div className={styles.statNumber}>{publisherStats.totalRevenue} ETH</div>
                <div className={styles.statLabel}>Total Revenue</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>⭐</div>
                <div className={styles.statNumber}>{publisherStats.averageRating}</div>
                <div className={styles.statLabel}>Avg Rating</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>💬</div>
                <div className={styles.statNumber}>{publisherStats.totalReviews}</div>
                <div className={styles.statLabel}>Reviews</div>
              </div>
            </div>
          </section>

          {/* Controls Section */}
          <section className={styles.controls} data-aos="fade-up" data-aos-delay="400">
            <div className={styles.searchContainer}>
              <div className={styles.searchBox}>
                <div className={styles.searchIcon}>🔍</div>
                <input
                  type="text"
                  placeholder="Search your publications..."
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
                    className={`${styles.filterBtn} ${activeFilter === 'published' ? styles.active : ''}`}
                    onClick={() => setActiveFilter('published')}
                  >
                    Published
                  </button>
                  <button
                    className={`${styles.filterBtn} ${activeFilter === 'draft' ? styles.active : ''}`}
                    onClick={() => setActiveFilter('draft')}
                  >
                    Drafts
                  </button>
                  <button
                    className={`${styles.filterBtn} ${activeFilter === 'review' ? styles.active : ''}`}
                    onClick={() => setActiveFilter('review')}
                  >
                    Under Review
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
                  <option value="recent">Recent</option>
                  <option value="title">Title A-Z</option>
                  <option value="sales">Most Sales</option>
                  <option value="revenue">Highest Revenue</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </section>

          {/* Publications Grid */}
          <section className={styles.publicationsSection}>
            {sortedBooks.length === 0 ? (
              <div className={styles.emptyState} data-aos="fade-up">
                <div className={styles.emptyIcon}>📚</div>
                <h3 className={styles.emptyTitle}>No publications found</h3>
                <p className={styles.emptyText}>
                  {searchQuery ? 'Try adjusting your search terms' : 'Start by publishing your first book'}
                </p>
                <button className={styles.publishBtn}>Publish Your First Book</button>
              </div>
            ) : (
              <div className={styles.publicationsGrid}>
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
                        <button className={styles.editBtn}>Edit</button>
                        <button className={styles.viewBtn}>View Details</button>
                      </div>
                      <div className={`${styles.statusBadge} ${getStatusBadge(book.status).class}`}>
                        {getStatusBadge(book.status).text}
                      </div>
                    </div>

                    <div className={styles.bookContent}>
                      <div className={styles.bookMeta}>
                        <span className={styles.bookGenre}>{book.genre}</span>
                        {book.rating > 0 && (
                          <div className={styles.bookRating}>
                            <span className={styles.stars}>⭐</span>
                            <span className={styles.ratingValue}>{book.rating}</span>
                          </div>
                        )}
                      </div>

                      <h3 className={styles.bookTitle}>{book.title}</h3>
                      <p className={styles.bookDescription}>{book.description}</p>

                      <div className={styles.bookStats}>
                        <div className={styles.statItem}>
                          <span className={styles.statValue}>{book.sales}</span>
                          <span className={styles.statLabel}>Sales</span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statValue}>{book.revenue}</span>
                          <span className={styles.statLabel}>Revenue</span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statValue}>{book.reviews}</span>
                          <span className={styles.statLabel}>Reviews</span>
                        </div>
                      </div>

                      <div className={styles.bookFooter}>
                        <div className={styles.publishInfo}>
                          <div className={styles.bookPrice}>{book.price}</div>
                          <div className={styles.publishDate}>
                            Published {formatDate(book.publishDate)}
                          </div>
                        </div>
                        <div className={styles.bookActions}>
                          <button className={styles.actionBtn}>
                            {book.status === 'draft' ? 'Continue' : 'Manage'}
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

export default PublisherHome
