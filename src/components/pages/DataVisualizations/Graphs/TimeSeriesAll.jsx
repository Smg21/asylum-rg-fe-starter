import React, { useState, useEffect } from 'react'; // Importing necessary hooks and functions from React
import Plot from 'react-plotly.js'; // Importing Plotly library for creating interactive graphs
import { connect } from 'react-redux'; // Importing Redux's connect function to connect this component to the store
import Table from './TableComponents/Table'; // Importing the Table component for displaying tabular data
import { colors } from '../../../../styles/data_vis_colors'; // Importing custom colors for styling

// Destructuring background_color from the imported colors object
const { background_color } = colors;

// Mapping state from the Redux store to props
const mapStateToProps = state => {
  return {
    timeSeriesAllData: state.vizReducer.timeSeriesAllData, // Accessing time series data from the Redux store
  };
};

// Main functional component that receives props connected to the Redux store
function TimeSeriesAll(props) {
  const { timeSeriesAllData } = props; // Destructuring timeSeriesAllData from props
  
  // Getting the current year for use in the graph's x-axis range
  const currentYear = new Date().getFullYear();

  // State hook for managing rows displayed in the table
  const [rowsForAllDisplay, setRowsForAllDisplay] = useState([]);

  // Defining columns to be displayed in the table
  const columnsForAllDisplay = [
    'Fiscal Year',
    'Total Cases',
    '% Granted',
    '% Admin Close / Dismissal',
    '% Denied',
  ];

  // Effect hook to update local state when timeSeriesAllData changes
  useEffect(() => {
    if (timeSeriesAllData.rowsForAllDisplay === undefined) {
      setRowsForAllDisplay([]);
    } else {
      setRowsForAllDisplay(timeSeriesAllData.rowsForAllDisplay); // Updating state with data from Redux store
    }
  }, [timeSeriesAllData]); // Dependency array includes timeSeriesAllData to re-run effect when it changes

  // Render method returns JSX for the component
  return (
    <div
      className="time-series-all-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100px',
        justifyContent: 'center',
      }}
    >
      <p>Showing: Time series data for all USCIS Asylum Offices</p>
      {/* Plotly graph component for displaying time series data */}
      <Plot
        data={[
          {
            x: timeSeriesAllData['xYears'], // X-axis data
            y: timeSeriesAllData['yTotalPercentGranteds'], // Y-axis data
            type: 'scatter', // Type of plot
            mode: 'lines+markers', // How points are connected
            dy: 1,
            dx: 1, // Adjusting point spacing for clarity
          },
        ]}
        layout={{
          title: 'Asylum Grant Rate for All USCIS Asylum Offices Over Time', // Graph title
          height: 500,
          width: 700,
          yaxis: {
            range: [0, 100], // Y-axis range
            title: `Asylum Grant Rate %`, // Y-axis label
            autotick: false,
            dtick: 10, // Tick interval
          },
          xaxis: {
            range: [
              timeSeriesAllData[0] || 2015, // X-axis range start
              timeSeriesAllData[timeSeriesAllData.length - 1] || currentYear, // X-axis range end
            ],
            title: 'Fiscal Year', // X-axis label
          },
          paper_bgcolor: background_color, // Background color of the graph area
          hoverlabel: {
            bordercolor: background_color, // Border color of hover labels
          },
        }}
      />
      <p>Table view</p>
      {/* Table component for displaying data */}
      <Table
        columns={columnsForAllDisplay} // Columns to display in the table
        rows={rowsForAllDisplay} // Rows to display in the table
        tableWidth={'100%'} // Width of the table
        rowHeight={'50px'} // Height of each row in the table
      />
    </div>
  );
}

// Connecting the component to the Redux store and exporting it
export default connect(mapStateToProps)(TimeSeriesAll);