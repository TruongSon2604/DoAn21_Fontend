import React, { useState, useRef, useEffect } from 'react';
import './ImageSearchScanner.scss';

const ImageSearchScanner = ({ onImageSearchComplete }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let progressInterval;

    if (isScanning) {
      progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2; // Faster scanning - increases by 2% each time
        });
      }, 30); // 30ms × 50 steps = ~1.5 seconds total
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isScanning]);

  useEffect(() => {
    if (scanProgress === 100 && isScanning) {
      setTimeout(() => {
        setIsScanning(false);
        setScanComplete(true);

        // Call the callback function with the selected image
        if (onImageSearchComplete && selectedImage) {
          onImageSearchComplete(selectedImage);
        }
      }, 500);
    }
  }, [scanProgress, isScanning, selectedImage, onImageSearchComplete]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Reset states
      setScanComplete(false);
      setScanProgress(0);

      // Create URL for image preview
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);

        // Start scanning animation after a short delay
        setTimeout(() => {
          setIsScanning(true);
        }, 300);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleReset = () => {
    setSelectedImage(null);
    setScanComplete(false);
    setScanProgress(0);
    setIsScanning(false);
    fileInputRef.current.value = '';
  };

  return (
    <div className="image-search-scanner">
      <div className="image-search-scanner__header">
        <h3 className="image-search-scanner__title">Find similar images using AI</h3>
        <p className="image-search-scanner__subtitle">Upload an image to find similar products</p>
      </div>

      <div className="image-search-scanner__content">
        <div
          className={`image-search-scanner__preview ${isScanning ? 'scanning' : ''} ${scanComplete ? 'scanned' : ''}`}
        >
          {selectedImage ? (
            <>
              <img src={selectedImage} alt="Selected" className="image-search-scanner__img" />

              {isScanning && (
                <>
                  <div className="image-search-scanner__scan-overlay">
                    <div className="image-search-scanner__scan-line"></div>
                    <div className="image-search-scanner__scan-glow"></div>
                  </div>
                  <div className="image-search-scanner__scan-grid"></div>

                  <div className="image-search-scanner__loading-text">
                    Đang phân tích... {scanProgress}%
                  </div>
                </>
              )}

              {scanComplete && (
                <div className="image-search-scanner__complete-badge">
                  <span className="image-search-scanner__complete-icon">✓</span>
                </div>
              )}
            </>
          ) : (
            <div className="image-search-scanner__placeholder">
              <div className="image-search-scanner__upload-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11L12 8 15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 7.01029 15.8767 7.03C14.9925 4.64071 12.7133 3 10 3C6.13401 3 3 6.13401 3 10C3 12.2979 4.10536 14.3475 5.78586 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 21H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>Choose an image to search</p>
            </div>
          )}
        </div>

        <div className="image-search-scanner__controls">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="image-search-scanner__input"
          />

          {!selectedImage ? (
            <button
              className="image-search-scanner__button image-search-scanner__button--primary"
              onClick={handleButtonClick}
            >
              Select Image
            </button>
          ) : (
            <div className="image-search-scanner__button-group">
              {scanComplete ? (
                <button
                  className="image-search-scanner__button image-search-scanner__button--secondary"
                  onClick={handleReset}
                >
                  Search for another image
                </button>
              ) : (
                <button
                  className="image-search-scanner__button image-search-scanner__button--secondary"
                  onClick={handleReset}
                  disabled={isScanning}
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>

        {(isScanning || scanComplete) && (
          <div className="image-search-scanner__progress-container">
            <div className="image-search-scanner__progress-bar">
              <div
                className="image-search-scanner__progress-fill"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSearchScanner;
