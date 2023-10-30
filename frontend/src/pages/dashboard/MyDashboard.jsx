import React, { useState } from 'react';
import './MyDashboard.css';

const MyDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={`my-dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar">
        <button className="w3-bar-item w3-button w3-large" onClick={closeSidebar}>
          Close &times;
        </button>
        {/* <a href="#" className="w3-bar-item w3-button">Link 1</a>
        <a href="#" className="w3-bar-item w3-button">Link 2</a>
        <a href="#" className="w3-bar-item w3-button">Link 3</a> */}
      </div>

      <div id="main">
        <div className="w3-teal">
          <button className="w3-button w3-teal w3-xlarge" onClick={openSidebar}>
            &#9776;
          </button>
          <div className="w3-container">
            <h1>My Page</h1>
          </div>
        </div>

        <img src="img_car.jpg" alt="Car" style={{ width: '100%' }} />

        <div className="w3-container">
          <p>In this example, the sidebar is hidden (style="display:none")</p>
          <p>It is shown when you click on the menu icon in the top left corner.</p>
          <p>When it is opened, it shifts the page content to the right.</p>
          <p>
            We use JavaScript to add a 25% left margin to the div element with id="main" when this happens. The value "25%"
            matches the width of the sidebar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
