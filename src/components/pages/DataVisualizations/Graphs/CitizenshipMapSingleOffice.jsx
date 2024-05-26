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
    citizenshipMapData: state.vizReducer.offices[office].citizenshipMapData, // Accessing citizenship map data for a specific office
  };
};

// Main functional component that receives props connected to the Redux store
function CitizenshipMapSingleOffice(props) {
  const { office, citizenshipMapData } = props; // Destructuring office and citizenshipMapData from props
  
  // State hooks for managing the axis data for the Plotly graph and rows for the table
  const [plotlyGraphAxis, setPlotlyGraphAxis] = useState({
    locationsAndText: [],
    z: [],
  });
  const [rowsForTable, setRowsForTable] = useState([]);

  // Effect hook to update local state when citizenshipMapData changes
  useEffect(() => {
    if (citizenshipMapData['countryGrantRateObj']!== undefined) {
      setPlotlyGraphAxis({
        locationsAndText: citizenshipMapData['countryGrantRateObj']['countries'], // Locations and text for the choropleth map
        z: citizenshipMapData['countryGrantRateObj']['countriesPercentGranteds'], // Data for the choropleth map
      });
    } else {
      setPlotlyGraphAxis({ locationsAndText: [], z: [] }); // Resetting graph data if undefined
    }
    if (citizenshipMapData.rowsForTable === undefined) {
      setRowsForTable([]); // Resetting table rows if undefined
    } else {
      setRowsForTable(citizenshipMapData.rowsForTable); // Updating table rows
    }
  }, [citizenshipMapData]); // Dependency array includes citizenshipMapData to re-run effect when it changes

  // Array of geographical scopes for the dropdown menu
  const geoScopeArray = [
    'world',
    'europe',
    'asia',
    'africa',
    'north america',
    'south america',
  ];

  // State hook for managing the selected geographical scope
  const [geoScope, setGeoScope] = useState('world');

  // Handler function for changing the selected geographical scope
  const handleScopeChange = e => {
    const { value } = e.target; // Getting the selected value
    setGeoScope(value); // Updating the state with the selected value
  };

  // Columns to be displayed in the table
  const columnsForTable = [
    'Citizenship',
    'Total Cases',
    '% Granted',
    '% Admin Close / Dismissal',
    '% Denied',
  ];

  // Render method returns JSX for the component
  return (
    <div
      className="citizenship-map-single-office-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100px',
        justifyContent: 'center',
      }}
    >
      <p>
        Showing: Rates of 'granted' case decision by nationality of origin, for{' '}
        {office}
      </p>
      {/* Plotly graph component for displaying citizenship map data */}
      <Plot
        data={[
          {
            type: 'choropleth', // Type of plot
            locationmode: 'country names', // Mode for specifying locations
            locations: plotlyGraphAxis['locationsAndText'], // Locations for the map
            z: plotlyGraphAxis['z'], // Data for the map
            text: plotlyGraphAxis['locationsAndText'], // Text labels for the map
            colorscale: [
              [0, 'rgb(255,78,17)'], // Color scale for the map
              [0.5, 'rgb(250,183,51)'],
              [1, 'rgb(105,179,76)'],
            ],
            colorbar: {
              title: 'Grant %', // Title for the color bar
            },
          },
        ]}
        layout={{
          title: 'USCIS Asylum Grant Rates by Citizenship of Asylum Seeker', // Graph title
          paper_bgcolor: background_color, // Background color of the graph area
          hoverlabel: {
            bordercolor: background_color, // Border color of hover labels
          },
          geo: {
            scope: geoScope, // Selected geographical scope
          },
          height: 500,
          width: 700,
        }}
        style={{ width: '100%', fontWeight: '900' }} // Style adjustments for the graph
      />
      {/* Dropdown menu for selecting geographical scope */}
      <label for="regionSelect">Select another region below</label>
      <select name="regionSelect" onChange={handleScopeChange}>
        {geoScopeArray.map(a => {
          return <option value={a}>{a.toUpperCase()}</option>; // Options for the dropdown menu
        })}
      </select>
      <p>Table view</p>
      {/* Table component for displaying data */}
      <Table
        rows={rowsForTable} // Rows to display in the table
        columns={columnsForTable} // Columns to display in the table
        tableWidth={'100%'} // Width of the table
        rowHeight={'50px'} // Height of each row in the table
      />
    </div>
  );
}

// Connecting the component to the Redux store and exporting it
export default connect(mapStateToProps)(CitizenshipMapSingleOffice);