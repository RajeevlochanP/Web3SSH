import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ReaderNav from './ReaderNav'
import { Link } from 'react-router-dom'
import styles from '../styles/ReaderHome.module.css'

function ReaderHome() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
  }, [])

  const featuredBooks = [
    {
      id: 1,
      title: "The Blockchain Revolution",
      author: "Sarah Chen",
      genre: "Technology",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Explore how blockchain technology is transforming industries and reshaping our digital future.",
      rating: 4.8,
      price: "0.05 ETH"
    },
    {
      id: 2,
      title: "Digital Nomad's Guide",
      author: "Marcus Rodriguez",
      genre: "Lifestyle",
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Master the art of remote work and travel while building a successful career.",
      rating: 4.6,
      price: "0.03 ETH"
    },
    {
      id: 3,
      title: "Quantum Computing Basics",
      author: "Dr. Emily Watson",
      genre: "Science",
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "A beginner-friendly introduction to the fascinating world of quantum computing.",
      rating: 4.9,
      price: "0.04 ETH"
    },
    {
      id: 4,
      title: "Sustainable Living",
      author: "Green Earth Collective",
      genre: "Environment",
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Practical tips and strategies for living an eco-friendly lifestyle in the modern world.",
      rating: 4.7,
      price: "0.02 ETH"
    },
    {
      id: 5,
      title: "AI Ethics & Society",
      author: "Prof. David Kim",
      genre: "Philosophy",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Examining the ethical implications of artificial intelligence in our society.",
      rating: 4.5,
      price: "0.06 ETH"
    },
    {
      id: 6,
      title: "Creative Writing Mastery",
      author: "Luna Martinez",
      genre: "Education",
      image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Unlock your creative potential with proven techniques from bestselling authors.",
      rating: 4.8,
      price: "0.03 ETH"
    }
  ]

  const genres = [
    { name: "Technology", icon: "💻", count: 1250 },
    { name: "Science Fiction", icon: "🚀", count: 890 },
    { name: "Business", icon: "💼", count: 670 },
    { name: "Health", icon: "🏥", count: 540 },
    { name: "Education", icon: "📚", count: 980 },
    { name: "Fiction", icon: "📖", count: 1560 }
  ]

  return (
    <div className={styles.readerHome}>
      <ReaderNav />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent} data-aos="fade-up">
              <h1 className={styles.heroTitle}>
                Discover Your Next <span className={styles.highlight}>Great Read</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Explore thousands of books published on the blockchain. Own your reading experience.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>10,000+</div>
                  <div className={styles.statLabel}>Books Available</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>50,000+</div>
                  <div className={styles.statLabel}>Active Readers</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>1,200+</div>
                  <div className={styles.statLabel}>Authors</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Genres Section */}
        <section className={styles.genres}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle} data-aos="fade-up">Browse by Genre</h2>
            <div className={styles.genresGrid}>
              {genres.map((genre, index) => (
                <div
                  key={genre.name}
                  className={styles.genreCard}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className={styles.genreIcon}>{genre.icon}</div>
                  <h3 className={styles.genreName}>{genre.name}</h3>
                  <p className={styles.genreCount}>{genre.count} books</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className={styles.featuredBooks}>
          <div className={styles.container}>
            <div className={styles.sectionHeader} data-aos="fade-up">
              <h2 className={styles.sectionTitle}>Featured Books</h2>
              <p className={styles.sectionSubtitle}>
                Handpicked selections from our community of readers and authors
              </p>
            </div>

            <div className={styles.booksGrid}>
              {featuredBooks.map((book, index) => (
                <article
                  key={book.id}
                  className={styles.bookCard}
                  data-aos="fade-up"
                  data-aos-delay={index * 150}
                >
                  <div className={styles.bookImageContainer}>
                    <img
                      src={book.image}
                      alt={book.title}
                      className={styles.bookImage}
                    />
                    <div className={styles.bookOverlay}>
                      <Link to={`/r/bookdet/${book.id}`}>
                        <button className={styles.previewButton}>Preview</button>
                      </Link>
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

                    <div className={styles.bookFooter}>
                      <div className={styles.bookPrice}>{book.price}</div>
                      <Link to={`/r/bookdet/${book.id}`}>
                        <button className={styles.exploreButton}>Explore</button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reading Progress Section */}
        <section className={styles.readingProgress}>
          <div className={styles.container}>
            <div className={styles.progressContent} data-aos="fade-up">
              <h2 className={styles.progressTitle}>Continue Reading</h2>
              <div className={styles.progressBooks}>
                <div className={styles.progressBook}>
                  <div className={styles.progressBookCover}></div>
                  <div className={styles.progressInfo}>
                    <h4>The Blockchain Revolution</h4>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: '65%' }}></div>
                    </div>
                    <span className={styles.progressText}>65% complete</span>
                  </div>
                </div>
                <div className={styles.progressBook}>
                  <div className={styles.progressBookCover}></div>
                  <div className={styles.progressInfo}>
                    <h4>Digital Nomad's Guide</h4>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{ width: '32%' }}></div>
                    </div>
                    <span className={styles.progressText}>32% complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ReaderHome