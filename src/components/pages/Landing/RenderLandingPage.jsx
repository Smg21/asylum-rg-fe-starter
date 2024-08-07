import React from 'react'; // Importing the React library
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png'; // Importing image for Grant Rates by Office
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png'; // Importing image for Grant Rates by Nationality
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png'; // Importing image for Grant Rates Over Time
import HrfPhoto from '../../../styles/Images/paper-stack.jpg'; // Importing an image for the middle section
import '../../../styles/RenderLandingPage.less'; // Importing styles for this component
import { Button } from 'antd'; // Importing Button component from Ant Design library
import { useHistory } from 'react-router-dom'; // Importing useHistory hook for navigation
import { downloadCsvData } from '../../../utils'; // Importing the function to download CSV data

// Main component for rendering landing page
function RenderLandingPage(props) {
  // Function to scroll page back to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // useHistory hook gives us access to history instance for navigation
  const history = useHistory();

  return (
    <div className="main">
      {/* Header Section */}
      <div className="header">
        <div className="hrf-logo-img-container">
          {/* Placeholder for Human Rights First logo image */}
        </div>
        <div className="header-text-container">
          {/* Title and subtitle for landing page */}
          <h1 className="title">Asylum Office Grant Rate Tracker</h1>
          <h3 className="subtitle">
            An interactive tool for exploring USCIS data on Asylum Office decisions.
          </h3>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="graphs-section">
        <div className="grant-rates-by-office-graph-container">
          <img
            src={GrantRatesByOfficeImg}
            alt="Grant Rates By Office Graph"
            className="gr-office-img"
          />
          <p>Search Grant Rates By Office</p>
        </div>
        <div className="grant-rates-by-nationality-container">
          <img
            src={GrantRatesByNationalityImg}
            alt="Grant Rates By Nationality Graph"
            className="gr-nationality-img"
          />
          <p>Search Grant Rates By Nationality</p>
        </div>
        <div className="grant-rates-over-time-container">
          <img
            src={GrantRatesOverTimeImg}
            alt="Grant Rates Over Time Graph"
            className="gr-overtime-img"
          />
          <p>Search Grant Rates Over Time</p>
        </div>
      </div>
      <div className="view-more-data-btn-container">
        <Button
          type="default"
          style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
          onClick={() => history.push('/graphs')}
        >
          View the Data
        </Button>
      </div>


      {/* Middle Section with an image and some explanatory text */}
      <div className="middle-section">
        <div className="image-container">
          {/* Image related to Human Rights First */}
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-img" />
        </div>
        <div className="middle-section-text-container">
          <h3>About Our Tool</h3>
          <p>
            Human Rights First has developed a user-friendly search tool to explore a dataset of asylum decisions from FY 2016 to May 2021. This tool allows users to search for information on asylum grant rates by year, nationality, and asylum office, visualize the data with charts and heat maps, and download the dataset.
          </p>
        </div>
      </div>

      {/* Bottom Section with key statistics and insights */}
      <div className="bottom-section">
        <div className="section-title-div">
          <h1 className="section-title">Systemic Disparity Insights</h1>
        </div>
        <div className="disparity-container">
          <div className="bottom-data-box">
            {/* Statistic showing decrease in average grant rate */}
            <h2>36%</h2>
            <h3>Decrease in average grant rate from 44% in FY 2016 to 28% in FY 2020.</h3>
          </div>
          <div className="bottom-data-box">
            {/* Statistic for New York asylum office grant rate */}
            <h2>5%</h2>
            <h3>New York asylum office grant rate in FY 2020.</h3>
          </div>
          <div className="bottom-data-box">
            {/* Statistic showing disparity in grant rates */}
            <h2>6x Lower</h2>
            <h3>Average grant rate of the New York asylum office compared to the...</h3>
          </div>
        </div>
        {/* Link to scroll back to the top of the page */}
        <div className="back-to-top" onClick={scrollToTop}>Back to Top</div>
      </div>
    </div>
  );
}

export default RenderLandingPage; // Exporting the component so it can be used in other parts of the app





