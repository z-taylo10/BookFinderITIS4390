import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/AccountsPage.css';
import { AuthContext } from '../context/AuthContext';

function AccountsPage() {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
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
              <h4>My Wishlist</h4>
              <div className="wishlist-item">Title <button>[+]</button> <button>[X]</button></div>
              <div className="wishlist-item">Title <button>[+]</button> <button>[X]</button></div>
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
            <h4>Shipping Information <button>[+]</button></h4>
            <p>Details</p>
          </div>
          <div className="payment-method">
            <h4>Payment Method <button>[+]</button></h4>
            <p>Details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;
