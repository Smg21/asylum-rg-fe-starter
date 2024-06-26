import React from 'react';
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';
import '../../../styles/RenderLandingPage.less'; // Importing the styles for this component
import { Button } from 'antd'; // Importing Button component from Ant Design library
import { useHistory } from 'react-router-dom'; // Importing useHistory hook for navigation
import { downloadCsvData } from '../../../utils'; // Importing the function to download CSV data

function RenderLandingPage(props) {
  // This function smoothly scrolls the page back to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // useHistory hook gives us access to the history instance for navigation
  const history = useHistory();

  // This function handles the data download action
  const handleDownloadData = async () => {
    await downloadCsvData();
  };

  return (
    <div className="main">
      {/* Header Section */}
      <div className="header">
        <div className="hrf-logo-img-container">
          {/* Logo image for Human Rights First */}
        </div>
        <div className="header-text-container">
          {/* Title and subtitle for the landing page */}
          <h1 className="title">Asylum Office Grant Rate Tracker</h1>
          <h3 className="subtitle">
            An interactive tool for exploring USCIS data on Asylum Office decisions.
          </h3>
        </div>
      </div>

      {/* Graphs Section */}
      <div className="graphs-section">
        <div className="graph-box">
          {/* Image for Grant Rates By Office - clicking navigates to the graphs page */}
          <img src={GrantRatesByOfficeImg} alt="Grant Rates By Office" onClick={() => history.push('/graphs')} />
          <p>Grant Rates By Office</p>
        </div>
        <div className="graph-box">
          {/* Image for Grant Rates By Nationality - clicking navigates to nationality graph */}
          <img src={GrantRatesByNationalityImg} alt="Grant Rates By Nationality" onClick={() => history.push('/graphs/all/citizenship')} />
          <p>Grant Rates By Nationality</p>
        </div>
        <div className="graph-box">
          {/* Image for Grant Rates Over Time - clicking navigates to time-series graph */}
          <img src={GrantRatesOverTimeImg} alt="Grant Rates Over Time" onClick={() => history.push('/graphs/all/time-series')} />
          <p>Grant Rates Over Time</p>
        </div>
      </div>

      {/* Buttons for Viewing and Downloading Data */}
      <div className="view-more-data-btn-container">
        <Button type="primary" className="data-button" onClick={() => history.push('/graphs')}>View the Data</Button>
        <Button type="primary" className="data-button" onClick={handleDownloadData}>Download the Data</Button>
      </div>

      {/* Middle Section with an image and some explanatory text */}
      <div className="middle-section">
        <div className="image-container">
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
            <h2>36%</h2>
            <h3>Decrease in average grant rate from 44% in FY 2016 to 28% in FY 2020.</h3>
          </div>
          <div className="bottom-data-box">
            <h2>5%</h2>
            <h3>New York asylum office grant rate in FY 2020.</h3>
          </div>
          <div className="bottom-data-box">
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

export default RenderLandingPage;
