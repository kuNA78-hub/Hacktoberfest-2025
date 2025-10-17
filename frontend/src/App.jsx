import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Product Card Component
const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x400/EEEEEE/666666?text=Image+Not+Found';
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => onViewDetails(product.id)}
    >
      <img
        src={product.image}
        alt={product.name}
        onError={handleImageError}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'contain',
          marginBottom: '12px',
        }}
      />
      <h3 style={{ margin: '0 0 8px 0', color: '#007185', fontSize: '16px', lineHeight: '1.3' }}>
        {product.name}
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ color: '#FFA41C', fontSize: '14px', marginRight: '4px' }}>
          {renderStars(product.rating)}
        </span>
        <span style={{ color: '#565959', fontSize: '12px' }}>
          ({product.rating})
        </span>
      </div>
      <p
        style={{
          color: '#565959',
          margin: '0 0 12px 0',
          fontSize: '14px',
          lineHeight: '1.4',
          height: '40px',
          overflow: 'hidden',
        }}
      >
        {product.description}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#B12704' }}>
          ${product.price}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          style={{
            background: '#FFD814',
            color: '#0F1111',
            border: '1px solid #FCD200',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Product Detail Component
const ProductDetail = ({ product, onBack, onAddToCart, onBuyNow }) => {
  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/600x600/EEEEEE/666666?text=Image+Not+Found';
  };

  return (
    <div style={{ background: '#FFFFFF', padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: '#007185',
          cursor: 'pointer',
          fontSize: '14px',
          marginBottom: '16px',
        }}
      >
        ← Back to search results
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: '32px' }}>
        <div style={{ position: 'sticky', top: '20px' }}>
          <img
            src={product.image}
            alt={product.name}
            onError={handleImageError}
            style={{
              width: '100%',
              maxHeight: '500px',
              objectFit: 'contain',
              background: '#FFFFFF',
            }}
          />
        </div>
        <div>
          <h1 style={{ color: '#0F1111', fontSize: '24px', marginBottom: '8px' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: '#FFA41C', fontSize: '16px', marginRight: '8px' }}>
              {renderStars(product.rating)}
            </span>
            <span style={{ color: '#007185', fontSize: '14px' }}>
              {product.rating} ratings | {product.reviews.length} reviews
            </span>
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#B12704',
              marginBottom: '16px',
            }}
          >
            ${product.price}
          </div>
          <p
            style={{ color: '#0F1111', lineHeight: '1.5', marginBottom: '24px', fontSize: '14px' }}
          >
            {product.description}
          </p>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <button
              onClick={() => onAddToCart(product)}
              style={{
                background: '#FFD814',
                color: '#0F1111',
                border: '1px solid #FCD200',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                flex: 1,
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => onBuyNow(product)}
              style={{
                background: '#FFA41C',
                color: '#0F1111',
                border: '1px solid #FF8F00',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                flex: 1,
              }}
            >
              Buy Now
            </button>
          </div>
          <div>
            <h3 style={{ color: '#0F1111', fontSize: '18px', marginBottom: '16px' }}>
              Customer reviews
            </h3>
            {product.reviews.map((review, index) => (
              <div
                key={index}
                style={{
                  borderTop: '1px solid #E0E0E0',
                  padding: '16px 0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ color: '#0F1111' }}>{review.user}</strong>
                  <span style={{ color: '#FFA41C' }}>{renderStars(review.rating)}</span>
                </div>
                <p style={{ color: '#0F1111', margin: '0 0 8px 0', fontSize: '14px' }}>
                  {review.comment}
                </p>
                <small style={{ color: '#565959' }}>{review.date}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    festive: false,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.festive) params.append('festive', 'true');

      const response = await axios.get('/api/products?' + params);
      setProducts(response.data.products);
    } catch (error) {
      console.log('Error:', error);
      setError('Cannot connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const processPayment = () => {
    alert('Thank you for your purchase! Your order has been placed.');
    setCart([]);
    setShowCart(false);
  };

  const buyNow = (product) => {
    addToCart(product);
    setShowCart(true);
  };

  const viewProductDetails = async (productId) => {
    try {
      const response = await axios.get('/api/products/' + productId);
      setSelectedProduct(response.data.product);
    } catch (error) {
      console.log('Error fetching product details:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      festive: false,
    });
    setSearchTerm('');
  };

  // Cart Sidebar Component
  const CartSidebar = () => {
    const handleImageError = (e) => {
      e.target.src = 'https://via.placeholder.com/100x100/EEEEEE/666666?text=Image+Not+Found';
    };

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '400px',
          height: '100vh',
          background: '#FFFFFF',
          padding: '24px',
          boxShadow: '-5px 0 15px rgba(0,0,0,0.1)',
          zIndex: 1000,
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <h2 style={{ color: '#0F1111', margin: 0, fontSize: '20px' }}>Shopping Cart</h2>
          <button
            onClick={() => setShowCart(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#565959',
            }}
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#565959', fontSize: '16px' }}>
            Your cart is empty
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  marginBottom: '24px',
                  paddingBottom: '24px',
                  borderBottom: '1px solid #E0E0E0',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  onError={handleImageError}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#007185', fontSize: '16px' }}>
                    {item.name}
                  </h4>
                  <p
                    style={{ margin: '0 0 8px 0', color: '#B12704', fontWeight: 'bold', fontSize: '18px' }}
                  >
                    ${item.price}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      style={{
                        padding: '4px 8px',
                        border: '1px solid #D5D9D9',
                        borderRadius: '8px',
                        background: '#F0F2F2',
                      }}
                    >
                      {[...Array(10).keys()].map((n) => (
                        <option key={n + 1} value={n + 1}>
                          {n + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#007185',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div
              style={{
                borderTop: '1px solid #E0E0E0',
                paddingTop: '16px',
                marginTop: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                <span>Subtotal ({getCartItemCount()} items):</span>
                <span style={{ color: '#B12704' }}>${getTotalPrice().toFixed(2)}</span>
              </div>
              <button
                onClick={processPayment}
                style={{
                  background: '#FFD814',
                  color: '#0F1111',
                  border: '1px solid #FCD200',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  width: '100%',
                }}
              >
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFFFFF',
        fontFamily: "'Arial', sans-serif",
        color: '#0F1111',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#131921',
          padding: '10px 0',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <h1
              style={{
                color: '#FFFFFF',
                margin: 0,
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              E-Commerce
            </h1>
            <div style={{ flex: 1, display: 'flex' }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px 0 0 4px',
                  fontSize: '16px',
                }}
              />
              <button
                style={{
                  background: '#FEBD69',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '0 4px 4px 0',
                  cursor: 'pointer',
                }}
              >
                🔍
              </button>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              style={{
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Cart ({getCartItemCount()})
            </button>
          </div>
        </div>
      </div>

      {/* Navigation / Filters */}
      <div style={{ background: '#232F3E', padding: '8px 0' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 20px' }}>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              alignItems: 'center',
              color: '#FFFFFF',
            }}
          >
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                background: '#FFFFFF',
                color: '#0F1111',
              }}
            >
              <option value="all">All Departments</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                width: '100px',
              }}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                width: '100px',
              }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="checkbox"
                checked={filters.festive}
                onChange={(e) => handleFilterChange('festive', e.target.checked)}
              />
              Deals
            </label>
            <button
              onClick={clearFilters}
              style={{
                background: '#FEBD69',
                color: '#0F1111',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '20px' }}>
        {showCart && <CartSidebar />}
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />
        ) : (
          <>
            {error && (
              <div
                style={{
                  background: '#FFF3F3',
                  color: '#B12704',
                  padding: '16px',
                  borderRadius: '4px',
                  marginBottom: '20px',
                  textAlign: 'center',
                }}
              >
                {error}
              </div>
            )}
            {loading ? (
              <div style={{ textAlign: 'center', color: '#565959', fontSize: '16px' }}>
                Loading products...
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '20px' }}>{products.length} results</h2>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={viewProductDetails}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
                {products.length === 0 && !loading && (
                  <div
                    style={{
                      textAlign: 'center',
                      color: '#565959',
                      fontSize: '16px',
                      marginTop: '40px',
                    }}
                  >
                    No results found. Try different keywords or remove filters.
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;