import React from 'react';
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';
import '../../../styles/RenderLandingPage.less';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { downloadCsvData } from '../../../utils'; // Importing the function to download CSV data

function RenderLandingPage(props) {
  // Function to scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hook from react-router-dom to access the history object
  const history = useHistory();

  // Async function to handle downloading the CSV data
  const handleDownloadData = async () => {
    await downloadCsvData(); // Calls the imported function to download the CSV data
  };

  // Main component render method
  return (
    <div className="main">
      <div className="header">
        <div className="header-text-container">
          <h1 className="title">Asylum Office Grant Rate Tracker</h1>
          <h3 className="subtitle">
            An interactive tool for exploring USCIS data on Asylum Office decisions.
          </h3>
        </div>
      </div>

      <div className="graphs-section">
        {/* Section for displaying graphs */}
        <div className="graph-container">
          <img src={GrantRatesByOfficeImg} alt="Grant Rates By Office" className="graph-img" onClick={() => history.push('/graphs')} /> {/* Image for Grant Rates By Office graph */}
          <p className="graph-label">Grant Rates By Office</p>
        </div>
        <div className="graph-container">
          <img src={GrantRatesByNationalityImg} alt="Grant Rates By Nationality" className="graph-img" onClick={() => history.push('/graphs/all/citizenship')} /> {/* Image for Grant Rates By Nationality graph */}
          <p className="graph-label">Grant Rates By Nationality</p>
        </div>
        <div className="graph-container">
          <img src={GrantRatesOverTimeImg} alt="Grant Rates Over Time" className="graph-img" onClick={() => history.push('/graphs/all/time-series')} /> {/* Image for Grant Rates Over Time graph */}
          <p className="graph-label">Grant Rates Over Time</p>
        </div>
      </div>

      <div className="action-buttons">
        {/* Buttons for navigation and downloading data */}
        <Button type="primary" className="btn-primary" onClick={() => history.push('/graphs')}>View the Data</Button>
        <Button type="primary" className="btn-primary" onClick={handleDownloadData}>Download the Data</Button>
      </div>

      <div className="middle-section">
        {/* Section about the tool */}
        <div className="image-container">
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-photo" /> {/* Image of Human Rights First logo */}
        </div>
        <div className="text-container">
          <h3 className="section-title">About Our Tool</h3>
          <p className="section-description">
            Human Rights First has developed a user-friendly search tool to explore a dataset of asylum decisions from FY 2016 to May 2021. This tool allows users to search for information on asylum grant rates by year, nationality, and asylum office, visualize the data with charts and heat maps, and download the dataset.
          </p>
        </div>
      </div>

      <div className="bottom-section">
        {/* Section highlighting insights into systemic disparities */}
        <h1 className="section-title">Systemic Disparity Insights</h1>
        <div className="disparity-container">
          {/* Individual insights into disparity */}
          <div className="insight-item">
            <h2 className="insight-value">36%</h2>
            <p className="insight-description">Decrease in average grant rate from 44% in FY 2016 to 28% in FY 2020.</p>
          </div>
          <div className="insight-item">
            <h2 className="insight-value">5%</h2>
            <p className="insight-description">New York asylum office grant rate in FY 2020.</p>
          </div>
          <div className="insight-item">
            <h2 className="insight-value">6x Lower</h2>
            <p className="insight-description">Average grant rate of the New York asylum office compared to the San Francisco asylum office (FY 2017-2020).</p>
          </div>
        </div>
        <a href="https://humanrightsfirst.org/library/uscis-records-reveal-systemic-disparities-in-asylum-decisions/" target="_blank" rel="noopener noreferrer" className="learn-more-link">
          <Button type="primary" className="btn-primary">Learn More</Button> {/* Link to learn more about systemic disparities */}
        </a>
        <p onClick={scrollToTop} className="back-to-top">Back To Top ^</p> {/* Button to scroll back to the top of the page */}
      </div>
    </div>
  );
}

export default RenderLandingPage;
