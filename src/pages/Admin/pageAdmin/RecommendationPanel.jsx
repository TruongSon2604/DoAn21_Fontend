import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import "./RecommendationPanel.scss";
import { apiGet, apiGetAI } from "../../../Service/apiService";

const RecommendationPanel = () => {
  // Sample data for recommended coffee products with simplified structure
  const [recommendedProducts, setRecommendedProducts] = useState([
  ]);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;

  const getPredict = async () => {
    const rp = await apiGetAI("/predict-restock");
    if (rp.success) {
      console.log("alo", rp.data);
      setRecommendedProducts(rp.data);
    }
  };
  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([getPredict()]);
    };

    fetchAllData();
  }, []);
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recommendedOrder");
  const [searchQuery, setSearchQuery] = useState("");

  // Compute low stock items (stock less than 20% of recommended order)
  const isLowStock = (product) => {
    return product.currentStock < product.recommendedOrder * 0.2;
  };

  // Filtered products based on current filter settings
  const filteredProducts = recommendedProducts
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (product) =>
        categoryFilter === "all" || product.category === categoryFilter
    )
    .filter((product) => !showLowStockOnly || isLowStock(product))
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "currentStock") {
        return a.currentStock - b.currentStock;
      } else if (sortBy === "recommendedOrder") {
        return b.recommendedOrder - a.recommendedOrder;
      }
      return 0;
    });

  // Categories for filter dropdown
  const categories = [
    "all",
    ...new Set(recommendedProducts.map((product) => product.category)),
  ];

  // Totals for stats
  const totalLowStockItems = recommendedProducts.filter((p) =>
    isLowStock(p)
  ).length;
  const totalRecommendedUnits = recommendedProducts.reduce(
    (sum, p) => sum + p.recommendedOrder,
    0
  );

  // Selected products for bulk order
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Toggle product selection
  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Function to handle bulk add to order
  const handleBulkAddToOrder = () => {
    if (selectedProducts.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm");
      return;
    }

    alert(`Đã thêm ${selectedProducts.length} sản phẩm vào đơn hàng`);
    // In a real app, you would update your order state here
    setSelectedProducts([]);
  };

  // Function to handle adding product to order
  const handleAddToOrder = (productId) => {
    alert(`Đã thêm sản phẩm ID ${productId} vào đơn hàng`);
    // In a real app, you would update your order state here
  };

  // Function to handle viewing product details
  const handleViewDetails = (productId) => {
    const product = recommendedProducts.find((p) => p.id === productId);
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  // State for product detail modal
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="content">
        <Header />
        <section className="dashboard">
          <div className="recommendation-section">
            <h2>Gợi Ý Nhập Kho Cà Phê</h2>

            {/* Statistics Cards */}
            <div className="recommendation-stats">
              <div className="stat-card">
                <h3>Sản Phẩm Sắp Hết Hàng</h3>
                <div className="stat-value">{totalLowStockItems}</div>
                <div className="stat-change positive">
                  <i className="fas fa-arrow-down"></i> 8% so với tuần trước
                </div>
              </div>

              <div className="stat-card">
                <h3>Tổng Đề Xuất Nhập Hàng</h3>
                <div className="stat-value">{totalRecommendedUnits} đơn vị</div>
                <div className="stat-change negative">
                  <i className="fas fa-arrow-up"></i> 12% so với tuần trước
                </div>
              </div>

              <div className="stat-card">
                <h3>Tổng Sản Phẩm</h3>
                <div className="stat-value">{recommendedProducts.length}</div>
                <div className="stat-change neutral">
                  <i className="fas fa-minus"></i> Không thay đổi
                </div>
              </div>

              <div className="stat-card">
                <h3>Danh Mục Sản Phẩm</h3>
                <div className="stat-value">{categories.length - 1}</div>
                <div className="stat-change positive">
                  <i className="fas fa-arrow-up"></i> 1 danh mục mới
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="recommendation-filters">
              <div className="filter-group search-group">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="filter-input search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <span className="filter-label">Danh mục:</span>
                <select
                  className="filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category === "all" ? "Tất cả danh mục" : category}
                    </option>
                  ))}
                </select>

                <span className="filter-label">Sắp xếp theo:</span>
                <select
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommendedOrder">Số lượng đề xuất</option>
                  <option value="currentStock">Tồn kho hiện tại</option>
                  <option value="name">Tên sản phẩm</option>
                </select>

                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="lowStockOnly"
                    checked={showLowStockOnly}
                    onChange={() => setShowLowStockOnly(!showLowStockOnly)}
                  />
                  <label htmlFor="lowStockOnly">Chỉ hiện sắp hết hàng</label>
                </div>
              </div>
            </div>

            {/* Bulk Action */}
            {selectedProducts.length > 0 && (
              <div className="bulk-action-bar">
                <span>{selectedProducts.length} sản phẩm đã chọn</span>
                <button
                  className="btn btn-primary"
                  onClick={handleBulkAddToOrder}
                >
                  Thêm tất cả vào đơn hàng
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedProducts([])}
                >
                  Bỏ chọn tất cả
                </button>
              </div>
            )}

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-header">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="product-checkbox"
                    />
                  </div>
                  <div className="product-image">
                    <img src={`${API_URL_LOCAL}/${product.image}`} alt={product.name} />
                    <span className="recommendation-badge">Đề xuất</span>
                    {isLowStock(product) && (
                      <span className="low-stock-badge">Sắp hết hàng</span>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-category">{product.category}</div>

                    <div className="product-stats">
                      <div className="stat">
                        <div className="label">Tồn kho</div>
                        <div className="value">
                          {product.currentStock} đơn vị
                        </div>
                      </div>
                      <div className="stat highlight-stat">
                        <div className="label">Đề xuất nhập</div>
                        <div className="value prediction-value">
                          {product.recommendedOrder} đơn vị
                        </div>
                      </div>
                      <div className="stat">
                        <div className="label">Nhà cung cấp</div>
                        <div className="value">{product.supplier}</div>
                      </div>
                      <div className="stat">
                        <div className="label">Ngày đặt cuối</div>
                        <div className="value">{product.lastOrderDate}</div>
                      </div>
                    </div>

                    <div className="product-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToOrder(product.id)}
                      >
                        Thêm vào đơn hàng
                      </button>
                      <button
                        className="btn btn-outline"
                        onClick={() => handleViewDetails(product.id)}
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredProducts.length >= 6 &&
              filteredProducts.length < recommendedProducts.length && (
                <button className="load-more">Xem thêm sản phẩm</button>
              )}

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
              <div className="no-results">
                <p>Không tìm thấy sản phẩm phù hợp với bộ lọc đã chọn</p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                    setShowLowStockOnly(false);
                  }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Product Detail Modal */}
      {showDetailModal && selectedProduct && (
        <div className="product-detail-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{selectedProduct.name}</h3>
              <button
                className="close-button"
                onClick={() => setShowDetailModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-columns">
                <div className="detail-image">
                <img src={`${API_URL_LOCAL}/${selectedProduct.image}`} alt={selectedProduct.name} />
                  {/* <img src={selectedProduct.image} alt={selectedProduct.name} /> */}
                </div>
                <div className="detail-info">
                  <div className="detail-row">
                    <span className="detail-label">Danh mục:</span>
                    <span className="detail-value">
                      {selectedProduct.category}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Nhà cung cấp:</span>
                    <span className="detail-value">
                      {selectedProduct.supplier}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Tồn kho hiện tại:</span>
                    <span className="detail-value">
                      {selectedProduct.currentStock} đơn vị
                    </span>
                  </div>
                  <div className="detail-row highlight-row">
                    <span className="detail-label">Đề xuất nhập kho:</span>
                    <span className="detail-value">
                      {selectedProduct.recommendedOrder} đơn vị
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Đơn hàng cuối:</span>
                    <span className="detail-value">
                      {selectedProduct.lastOrderDate}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Trạng thái:</span>
                    <span className="detail-value">
                      {isLowStock(selectedProduct) ? (
                        <span className="status-low">Sắp hết hàng</span>
                      ) : (
                        <span className="status-ok">Còn hàng</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleAddToOrder(selectedProduct.id);
                    setShowDetailModal(false);
                  }}
                >
                  Thêm vào đơn hàng
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setShowDetailModal(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationPanel;
