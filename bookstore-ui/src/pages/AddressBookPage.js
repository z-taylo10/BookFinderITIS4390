import React from 'react';
import '../stylesheets/AddressBookPage.css';

function AddressBookPage() {
  return (
    <div className="address-book-page">
      <h2>Manage Address Book</h2>
      <h3 className="subheading">Add a New Shipping Address:</h3>
      <form>
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="City" />
        <div className="state-zip">
          <input type="text" placeholder="State" />
          <input type="text" placeholder="Zip Code" />
        </div>
        <input type="text" placeholder="Phone Number" />
        <div className="buttons">
          <button type="submit" className="save-button">SAVE</button>
          <button type="button" className="cancel-button">CANCEL</button>
        </div>
      </form>
    </div>
  );
}

export default AddressBookPage;
