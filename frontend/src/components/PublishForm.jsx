import { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from '../styles/PublishForm.module.css'
import { getAllNodes, registeNode } from '../helper/storageFunctions'
import { registerBook,registerBookPipeline } from '../helper/clickFunctions'

function PublishForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    genre: '',
    price: '',
    selectedNode: '',
    tokenId:'',
    file: null
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [avaNodes,setAvaNodes]=useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    })
    async function forNodes() {
      let avaNodes=await getAllNodes();
      console.log(avaNodes);
      setAvaNodes(avaNodes);
    }
    forNodes();
  }, [])

  useEffect(()=>{
    console.log("avaNodes: ",avaNodes);
  },[avaNodes])

  const genres = [
    'Technology',
    'Science Fiction',
    'Business',
    'Health',
    'Education',
    'Fiction',
    'Non-Fiction',
    'Biography',
    'History',
    'Philosophy',
    'Science',
    'Art',
    'Travel',
    'Cooking',
    'Self-Help',
    'Romance',
    'Mystery',
    'Thriller',
    'Fantasy',
    'Horror'
  ]

  // Available nodes with their details
  const availableNodes = [
    {
      id: 'node1',
      address: '0x742d35Cc6634C0532925a3b8D404d3aaBf5c1234',
      maxStorage: '500 GB',
      location: 'North America',
      status: 'Active',
      reliability: '99.9%',
      speed: 'High'
    },
    {
      id: 'node2',
      address: '0x8f3e2B1a9C7d6E5f4A3b2C1d0E9f8A7b6C5d4E3f',
      maxStorage: '1 TB',
      location: 'Europe',
      status: 'Active',
      reliability: '99.8%',
      speed: 'Medium'
    },
    {
      id: 'node3',
      address: '0x1A2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0b',
      maxStorage: '750 GB',
      location: 'Asia Pacific',
      status: 'Active',
      reliability: '99.7%',
      speed: 'High'
    },
    {
      id: 'node4',
      address: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e',
      maxStorage: '2 TB',
      location: 'South America',
      status: 'Active',
      reliability: '99.6%',
      speed: 'Medium'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleNodeSelection = (nodeId) => {
    setFormData(prev => ({
      ...prev,
      selectedNode: nodeId
    }))
    
    // Clear node selection error
    if (errors.selectedNode) {
      setErrors(prev => ({
        ...prev,
        selectedNode: ''
      }))
    }
  }

  const handleFileChange = (file) => {
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/epub+zip', 'text/plain']
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          file: 'Please upload a PDF, EPUB, or TXT file'
        }))
        return
      }

      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          file: 'File size must be less than 50MB'
        }))
        return
      }

      setFormData(prev => ({
        ...prev,
        file: file
      }))

      // Create preview URL for display
      setPreviewUrl(URL.createObjectURL(file))
      
      // Clear file error
      if (errors.file) {
        setErrors(prev => ({
          ...prev,
          file: ''
        }))
      }
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Book name is required'
    } else if (formData.name.length < 3) {
      newErrors.name = 'Book name must be at least 3 characters'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters'
    }

    if (!formData.genre) {
      newErrors.genre = 'Please select a genre'
    }

    if (!formData.price) {
      newErrors.price = 'Price is required'
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price'
    }

    if (!formData.selectedNode) {
      newErrors.selectedNode = 'Please select a storage node'
    }

    if (!formData.file) {
      newErrors.file = 'Please upload your book file'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      console.log(formData);
      registerBookPipeline(formData);
      // // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 2000))
      
      // // Here you would typically upload the file and submit the form data
      // const selectedNodeData = availableNodes.find(node => node.id === formData.selectedNode)
      // console.log('Publishing book:', {
      //   ...formData,
      //   selectedNodeData
      // })
      
      // Reset form on success
      setFormData({
        name: '',
        description: '',
        genre: '',
        price: '',
        selectedNode: '',
        file: null
      })
      setPreviewUrl(null)
      
      alert('Book published successfully!')
      
    } catch (error) {
      console.error('Error publishing book:', error)
      alert('Error publishing book. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeFile = () => {
    setFormData(prev => ({
      ...prev,
      file: null
    }))
    setPreviewUrl(null)
    if (errors.file) {
      setErrors(prev => ({
        ...prev,
        file: ''
      }))
    }
  }

  return (
    <div className={styles.publishForm}>
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Page Header */}
          <section className={styles.pageHeader} data-aos="fade-up">
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>Publish New Book</h1>
              <p className={styles.pageSubtitle}>
                Share your knowledge with the world on the blockchain
              </p>
            </div>
          </section>

          {/* Publishing Form */}
          <section className={styles.formSection} data-aos="fade-up" data-aos-delay="200">
            <div className={styles.formContainer}>
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Book Information */}
                <div className={styles.formGroup} data-aos="fade-up" data-aos-delay="300">
                  <h2 className={styles.sectionTitle}>Book Information</h2>
                  
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Book Title <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`${styles.input} ${errors.name ? styles.error : ''}`}
                      placeholder="Enter your book title"
                    />
                    {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="description" className={styles.label}>
                      Description <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
                      placeholder="Describe your book, its content, and what readers will learn..."
                      rows="6"
                    />
                    <div className={styles.charCount}>
                      {formData.description.length} characters
                    </div>
                    {errors.description && <span className={styles.errorText}>{errors.description}</span>}
                  </div>

                  <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="genre" className={styles.label}>
                        Genre <span className={styles.required}>*</span>
                      </label>
                      <select
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        className={`${styles.select} ${errors.genre ? styles.error : ''}`}
                      >
                        <option value="">Select a genre</option>
                        {genres.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                      {errors.genre && <span className={styles.errorText}>{errors.genre}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="price" className={styles.label}>
                        Price (ETH) <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.priceInput}>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className={`${styles.input} ${errors.price ? styles.error : ''}`}
                          placeholder="0.05"
                          step="0.001"
                          min="0"
                        />
                        <span className={styles.currency}>ETH</span>
                      </div>
                      {errors.price && <span className={styles.errorText}>{errors.price}</span>}
                    </div>
                  </div>
                </div>

                {/* Blockchain Configuration */}
                <div className={styles.formGroup} data-aos="fade-up" data-aos-delay="400">
                  <h2 className={styles.sectionTitle}>Blockchain Storage Configuration</h2>
                  
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      Select Storage Node <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.helpText}>
                      Choose a blockchain node where your book will be stored. Each node offers different storage capacities and geographic locations.
                    </div>
                    
                    <div className={styles.nodeGrid}>
                      {avaNodes.map((node) => (
                        <div
                          key={node.nodeAddress}
                          className={`${styles.nodeCard} ${formData.selectedNode === node.nodeAddress ? styles.selected : ''}`}
                          onClick={() => handleNodeSelection(node.nodeAddress)}
                        >
                          <div className={styles.nodeHeader}>
                            <input
                              type="radio"
                              id={node.nodeAddress}
                              name="selectedNode"
                              value={node.address}
                              checked={formData.selectedNode === node.nodeAddress}
                              onChange={() => handleNodeSelection(node.nodeAddress)}
                              className={styles.nodeRadio}
                            />
                            <div className={styles.nodeStatus}>
                              <div className={`${styles.statusIndicator} ${styles.active}`}></div>
                              <span className={styles.statusText}>{node.isActive}</span>
                            </div>
                          </div>
                          
                          <div className={styles.nodeInfo}>
                            <div className={styles.nodeAddress}>
                              <span className={styles.addressLabel}>Node Address:</span>
                              <span className={styles.addressValue}>{node.nodeAddress}</span>
                            </div>
                            
                            <div className={styles.nodeDetails}>
                              <div className={styles.nodeDetail}>
                                <span className={styles.detailIcon}>💾</span>
                                <div className={styles.detailInfo}>
                                  <span className={styles.detailLabel}>Max Storage</span>
                                  <span className={styles.detailValue}>{parseFloat(node.maxStorage).toFixed(0)}</span>
                                </div>
                              </div>
                              
                              <div className={styles.nodeDetail}>
                                <span className={styles.detailIcon}>🌍</span>
                                <div className={styles.detailInfo}>
                                  <span className={styles.detailLabel}>Location</span>
                                  <span className={styles.detailValue}>{"New York"}</span>
                                </div>
                              </div>
                              
                              <div className={styles.nodeDetail}>
                                <span className={styles.detailIcon}>⚡</span>
                                <div className={styles.detailInfo}>
                                  <span className={styles.detailLabel}>Speed</span>
                                  <span className={styles.detailValue}>{"High"}</span>
                                </div>
                              </div>
                              
                              <div className={styles.nodeDetail}>
                                <span className={styles.detailIcon}>🛡</span>
                                <div className={styles.detailInfo}>
                                  <span className={styles.detailLabel}>Reliability</span>
                                  <span className={styles.detailValue}>{"Medium"}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {errors.selectedNode && <span className={styles.errorText}>{errors.selectedNode}</span>}
                  </div>
                </div>

                {/* File Upload */}
                <div className={styles.formGroup} data-aos="fade-up" data-aos-delay="500">
                  <h2 className={styles.sectionTitle}>Book File</h2>
                  
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      Upload Book File <span className={styles.required}>*</span>
                    </label>
                    
                    {!formData.file ? (
                      <div
                        className={`${styles.fileUpload} ${dragActive ? styles.dragActive : ''} ${errors.file ? styles.error : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <div className={styles.uploadIcon}>📁</div>
                        <div className={styles.uploadText}>
                          <p className={styles.uploadTitle}>Drag and drop your book file here</p>
                          <p className={styles.uploadSubtitle}>or click to browse</p>
                        </div>
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e.target.files[0])}
                          className={styles.fileInput}
                          accept=".pdf,.epub,.txt"
                        />
                        <div className={styles.fileFormats}>
                          Supported formats: PDF, EPUB, TXT (Max 50MB)
                        </div>
                      </div>
                    ) : (
                      <div className={styles.filePreview}>
                        <div className={styles.fileInfo}>
                          <div className={styles.fileIcon}>📄</div>
                          <div className={styles.fileDetails}>
                            <div className={styles.fileName}>{formData.file.name}</div>
                            <div className={styles.fileSize}>
                              {(formData.file.size / (1024 * 1024)).toFixed(2)} MB
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className={styles.removeFile}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {errors.file && <span className={styles.errorText}>{errors.file}</span>}
                  </div>
                </div>

                {/* Form Actions */}
                <div className={styles.formActions} >
                  <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
                        // Navigate back or reset form
                        window.history.back()
                      }
                    }}
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className={styles.publishBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner}></span>
                        Publishing...
                      </>
                    ) : (
                      'Publish Book'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default PublishForm