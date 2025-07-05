import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ReaderNav from './ReaderNav'
import styles from '../styles/BookDetails.module.css'
import { useParams } from 'react-router-dom'

function BookDetails() {
  const [selectedFormat, setSelectedFormat] = useState('pdf')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  const {id}=useParams();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
  }, [])

  // Sample book data - in real app this would come from props or API
  const book = {
    id: 1,
    title: "The Blockchain Revolution: Transforming Industries Through Decentralized Technology",
    author: "Dr. Sarah Chen",
    genre: "Technology",
    price: "0.05",
    currency: "ETH",
    rating: 4.8,
    reviews: 342,
    pages: 456,
    language: "English",
    publishDate: "January 15, 2024",
    isbn: "978-0-123456-78-9",
    description: "Dive deep into the revolutionary world of blockchain technology and discover how it's reshaping industries across the globe. This comprehensive guide explores the fundamental concepts, real-world applications, and future potential of decentralized systems. From cryptocurrency and smart contracts to supply chain management and digital identity, learn how blockchain is creating new possibilities for transparency, security, and innovation. Whether you're a business leader, developer, or curious enthusiast, this book provides the knowledge you need to understand and leverage the power of blockchain technology.",
    features: [
      "Comprehensive coverage of blockchain fundamentals",
      "Real-world case studies and applications",
      "Expert insights from industry leaders",
      "Practical implementation strategies",
      "Future trends and predictions"
    ],
    tableOfContents: [
      "Introduction to Blockchain Technology",
      "Cryptographic Foundations",
      "Consensus Mechanisms",
      "Smart Contracts and DApps",
      "Cryptocurrency and Digital Assets",
      "Enterprise Blockchain Solutions",
      "Regulatory Landscape",
      "Future of Decentralized Systems"
    ],
    authorBio: "Dr. Sarah Chen is a leading blockchain researcher and consultant with over 15 years of experience in distributed systems. She holds a Ph.D. in Computer Science from MIT and has worked with Fortune 500 companies to implement blockchain solutions. She is a frequent speaker at technology conferences and has published numerous papers on blockchain technology.",
    formats: [
      { type: 'pdf', name: 'PDF', price: '0.05' },
    //   { type: 'epub', name: 'EPUB', price: '0.05' },
    //   { type: 'audiobook', name: 'Audiobook', price: '0.08' }
    ]
  }

  const handlePurchase = () => {
    setShowPurchaseModal(true)
  }

  const handleConfirmPurchase = () => {
    // Handle purchase logic here
    console.log('Purchasing book:', {
      bookId: book.id,
      format: selectedFormat,
      quantity: quantity,
      price: book.formats.find(f => f.type === selectedFormat)?.price
    })
    setShowPurchaseModal(false)
    alert('Purchase successful! The book has been added to your library.')
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className={styles.star}>★</span>)
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className={styles.halfStar}>★</span>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className={styles.emptyStar}>☆</span>)
    }

    return stars
  }

  return (
    <div className={styles.bookDetails}>
      <ReaderNav />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Book Header */}
          <section className={styles.bookHeader} data-aos="fade-up">
            <div className={styles.bookCover}>
              <div className={styles.coverDesign}>
                <div className={styles.coverTitle}>{book.title}</div>
                <div className={styles.coverAuthor}>by {book.author}</div>
                <div className={styles.coverGenre}>{book.genre}</div>
                <div className={styles.coverDecoration}>
                  <div className={styles.decorLine}></div>
                  <div className={styles.decorDot}></div>
                  <div className={styles.decorLine}></div>
                </div>
              </div>
            </div>

            <div className={styles.bookInfo}>
              <div className={styles.genreBadge}>{book.genre}</div>
              <h1 className={styles.bookTitle}>{book.title}</h1>
              <p className={styles.bookAuthor}>by {book.author}</p>
              
              <div className={styles.bookMeta}>
                <div className={styles.rating}>
                  <div className={styles.stars}>
                    {renderStars(book.rating)}
                  </div>
                  <span className={styles.ratingValue}>{book.rating}</span>
                  <span className={styles.reviewCount}>({book.reviews} reviews)</span>
                </div>
                
                <div className={styles.bookStats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Pages:</span>
                    <span className={styles.statValue}>{book.pages}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Language:</span>
                    <span className={styles.statValue}>{book.language}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Published:</span>
                    <span className={styles.statValue}>{book.publishDate}</span>
                  </div>
                </div>
              </div>

              <div className={styles.priceSection}>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{book.price} {book.currency}</span>
                  <span className={styles.priceLabel}>Digital Edition</span>
                </div>
                
                <div className={styles.formatSelector}>
                  <label className={styles.formatLabel}>Format:</label>
                  <div className={styles.formatOptions}>
                    {book.formats.map(format => (
                      <button
                        key={format.type}
                        className={`${styles.formatBtn} ${selectedFormat === format.type ? styles.active : ''}`}
                        onClick={() => setSelectedFormat(format.type)}
                      >
                        {format.name}
                        <span className={styles.formatPrice}>{format.price} ETH</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.actionButtons}>
                <button className={styles.purchaseBtn} onClick={handlePurchase}>
                  <span className={styles.btnIcon}>🛒</span>
                  Purchase Now
                </button>
                <button className={styles.previewBtn}>
                  <span className={styles.btnIcon}>👁️</span>
                  Preview
                </button>
                <button 
                  className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
                  onClick={toggleWishlist}
                >
                  <span className={styles.btnIcon}>{isWishlisted ? '❤️' : '🤍'}</span>
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          </section>

          {/* Book Content Tabs */}
          <section className={styles.bookContent} data-aos="fade-up" data-aos-delay="200">
            <div className={styles.tabNavigation}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'description' ? styles.active : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'contents' ? styles.active : ''}`}
                onClick={() => setActiveTab('contents')}
              >
                Table of Contents
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'author' ? styles.active : ''}`}
                onClick={() => setActiveTab('author')}
              >
                About Author
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.active : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'description' && (
                <div className={styles.descriptionTab} data-aos="fade-in">
                  <h3 className={styles.tabTitle}>About This Book</h3>
                  <p className={styles.description}>{book.description}</p>
                  
                  <h4 className={styles.featuresTitle}>Key Features</h4>
                  <ul className={styles.featuresList}>
                    {book.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <span className={styles.featureIcon}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'contents' && (
                <div className={styles.contentsTab} data-aos="fade-in">
                  <h3 className={styles.tabTitle}>Table of Contents</h3>
                  <div className={styles.chapterList}>
                    {book.tableOfContents.map((chapter, index) => (
                      <div key={index} className={styles.chapterItem}>
                        <span className={styles.chapterNumber}>{String(index + 1).padStart(2, '0')}</span>
                        <span className={styles.chapterTitle}>{chapter}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'author' && (
                <div className={styles.authorTab} data-aos="fade-in">
                  <h3 className={styles.tabTitle}>About the Author</h3>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorAvatar}>
                      <span className={styles.authorInitials}>SC</span>
                    </div>
                    <div className={styles.authorDetails}>
                      <h4 className={styles.authorName}>{book.author}</h4>
                      <p className={styles.authorBio}>{book.authorBio}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className={styles.reviewsTab} data-aos="fade-in">
                  <h3 className={styles.tabTitle}>Reader Reviews</h3>
                  <div className={styles.reviewsSummary}>
                    <div className={styles.overallRating}>
                      <div className={styles.ratingNumber}>{book.rating}</div>
                      <div className={styles.ratingStars}>
                        {renderStars(book.rating)}
                      </div>
                      <div className={styles.totalReviews}>{book.reviews} reviews</div>
                    </div>
                  </div>
                  
                  <div className={styles.reviewsList}>
                    <div className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewerName}>Alex Johnson</div>
                        <div className={styles.reviewRating}>
                          {renderStars(5)}
                        </div>
                      </div>
                      <p className={styles.reviewText}>
                        "Excellent comprehensive guide to blockchain technology. The author explains complex concepts in an accessible way."
                      </p>
                    </div>
                    
                    <div className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewerName}>Maria Garcia</div>
                        <div className={styles.reviewRating}>
                          {renderStars(4.5)}
                        </div>
                      </div>
                      <p className={styles.reviewText}>
                        "Great practical insights and real-world examples. Highly recommended for anyone interested in blockchain."
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPurchaseModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Confirm Purchase</h3>
              <button 
                className={styles.closeBtn}
                onClick={() => setShowPurchaseModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.purchaseDetails}>
                <h4 className={styles.purchaseBookTitle}>{book.title}</h4>
                <p className={styles.purchaseAuthor}>by {book.author}</p>
                
                <div className={styles.purchaseFormat}>
                  <span className={styles.formatLabel}>Format: </span>
                  <span className={styles.selectedFormat}>
                    {book.formats.find(f => f.type === selectedFormat)?.name}
                  </span>
                </div>
                
                <div className={styles.purchasePrice}>
                  <span className={styles.totalLabel}>Total: </span>
                  <span className={styles.totalPrice}>
                    {book.formats.find(f => f.type === selectedFormat)?.price} ETH
                  </span>
                </div>
              </div>
            </div>
            
            <div className={styles.modalActions}>
              <button 
                className={styles.cancelBtn}
                onClick={() => setShowPurchaseModal(false)}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmBtn}
                onClick={handleConfirmPurchase}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookDetails