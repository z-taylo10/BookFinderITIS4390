import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/AccountsPage.css';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';

function AccountsPage() {
  const { signOut } = useContext(AuthContext);
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddShipping = () => {
    navigate('/address-book');
  };

  return (
    <div className="accounts-page">
      <div className="account-header">
        <div className="user-info">
          <div className="user-image">[User Image]</div>
          <div className="user-details">
            <p>NAME: JOHN DOE</p>
            <p>EMAIL: JOHNDOE@XYZ.COM</p>
            <p>PHONE NUMBER:</p>
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>LOG OUT</button>
      </div>
      <div className="account-content">
        <div className="left-column">
          <div className="digital-library">
            <h3>My Digital Library</h3>
            <div className="wishlist">
              <div className="wishlist-header">
                <h4>My Wishlist:</h4>
                <img src="/expand.png" alt="Expand" className="expand-icon" onClick={toggleExpand} />
              </div>
              {(isExpanded ? wishlist : wishlist.slice(0, 2)).map((item, index) => (
                <div key={index} className="wishlist-item">
                  <span>{item.title}: {item.authors}, ${item.price}</span>
                  <button onClick={() => addToCart(item)} className="accounts-page add-to-cart-button">
                    <img src="/blackcart.png" alt="Add to Cart" className="cart-icon" />
                    <span className="add-text">ADD</span>
                  </button>
                  <button onClick={() => removeFromWishlist(index)} className="remove-button">
                    <img src="/trash.png" alt="Remove from Wishlist" className="remove-icon" />
                  </button>
                </div>
              ))}
            </div>
            <div className="order-history">
              <h4>Order History</h4>
              <div className="order-item">Title</div>
              <div className="order-item">Title</div>
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="shipping-info">
            <div className="shipping-header">
              <h4>Shipping Information</h4>
              <div className="add-container">
                <span className="add-text">ADD</span>
                <img src="/add.png" alt="Add" className="add-icon" onClick={handleAddShipping} />
              </div>
            </div>
            <p>Details</p>
          </div>
          <div className="payment-method">
            <div className="payment-header">
              <h4>Payment Method</h4>
              <div className="add-container">
                <span className="add-text">ADD</span>
                <img src="/add.png" alt="Add" className="add-icon" />
              </div>
            </div>
            <p>Details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;
