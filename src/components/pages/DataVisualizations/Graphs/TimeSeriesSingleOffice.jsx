import React, { useState, useEffect } from 'react'; // Importing necessary hooks and functions from React
import { connect } from 'react-redux'; // Importing Redux's connect function to connect this component to the store
import Plot from 'react-plotly.js'; // Importing Plotly library for creating interactive graphs
import Table from './TableComponents/Table'; // Importing the Table component for displaying tabular data
import { colors } from '../../../../styles/data_vis_colors'; // Importing custom colors for styling

// Destructuring background_color from the imported colors object
const { background_color } = colors;

// Mapping state from the Redux store to props, including ownProps for dynamic data fetching
const mapStateToProps = (state, ownProps) => {
  const { office } = ownProps;
  return {
    timeSeriesData: state.vizReducer.offices[office].timeSeriesData, // Accessing time series data for a specific office
  };
};

// Main functional component that receives props connected to the Redux store
function TimeSeriesSingleOffice(props) {
  const { office, timeSeriesData } = props; // Destructuring office and timeSeriesData from props
  const currentYear = new Date().getFullYear(); // Current year for initial graph setup
  
  // State hooks for managing the axis data for the Plotly graph and rows for the table
  const [plotlyGraphAxis, setPlotlyGraphAxis] = useState({
    x: [2015, currentYear], // Initial x-axis values
    y: [], // Initial y-axis values
  });
  const [rowsForTable, setRowsForTable] = useState([]);

  // Effect hook to update local state when timeSeriesData changes
  useEffect(() => {
    if (timeSeriesData['singleOfficeDataObject']!== undefined) {
      setPlotlyGraphAxis({
        x: timeSeriesData['singleOfficeDataObject']['xYears'], // X-axis data
        y: timeSeriesData['singleOfficeDataObject']['yTotalPercentGranteds'], // Y-axis data
      });
    } else {
      setPlotlyGraphAxis({ x: [2015, currentYear], y: [] }); // Resetting graph data if undefined
    }
    if (timeSeriesData.rowsForTable === undefined) {
      setRowsForTable([]); // Resetting table rows if undefined
    } else {
      setRowsForTable(timeSeriesData.rowsForTable); // Updating table rows
    }
  }, [timeSeriesData, currentYear]); // Dependency array includes timeSeriesData and currentYear to re-run effect when they change

  // Columns to be displayed in the table
  const columnsForTable = [
    'Fiscal Year',
    'Total Cases',
    '% Granted',
    '% Admin Close / Dismissal',
    '% Denied',
  ];

  // Render method returns JSX for the component
  return (
    <div
      className="time-series-single-office-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
      }}
    >
      <p>Showing: Time series data for all USCIS Asylum Offices - ({office})</p>
      {/* Plotly graph component for displaying time series data */}
      <Plot
        data={[
          {
            x: plotlyGraphAxis['x'], // X-axis data
            y: plotlyGraphAxis['y'], // Y-axis data
            type: 'scatter', // Type of plot
            mode: 'lines+markers', // Display mode
            yMax: 1, // Maximum y-axis value
            dy: 1, // Marker size
            dx: 1, // Marker spacing
          },
        ]}
        layout={{
          title: `Asylum Grant Rate for the ${office} Asylum Office Over Time`, // Graph title
          height: 500,
          width: 700,
          yaxis: {
            range: [0, 100], // Y-axis range
            title: `Asylum Grant Rate %`, // Y-axis title
            autotick: false, // Disable automatic tick generation
            dtick: 10, // Tick interval
          },
          xaxis: {
            range: [
              plotlyGraphAxis['x'][0], // Minimum x-axis value
              plotlyGraphAxis['x'][plotlyGraphAxis['x'].length - 1], // Maximum x-axis value
            ],
            title: `Fiscal Year`, // X-axis title
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
        columns={columnsForTable} // Columns to display in the table
        rows={rowsForTable} // Rows to display in the table
        tableWidth={'100%'} // Width of the table
        rowHeight={'50px'} // Height of each row in the table
      />
    </div>
  );
}

// Connecting the component to the Redux store and exporting it
export default connect(mapStateToProps)(TimeSeriesSingleOffice);