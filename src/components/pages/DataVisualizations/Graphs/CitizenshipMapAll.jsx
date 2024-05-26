import React, { useState, useEffect } from 'react'; // Importing necessary hooks and functions from React
import Plot from 'react-plotly.js'; // Importing Plotly library for creating interactive graphs
import { connect } from 'react-redux'; // Importing Redux's connect function to connect this component to the store
import Table from './TableComponents/Table'; // Importing the Table component for displaying tabular data
import { colors } from '../../../../styles/data_vis_colors'; // Importing custom colors for styling

// Destructuring background_color and secondary_accent_color from the imported colors object
const { background_color, secondary_accent_color } = colors;

// Mapping state from the Redux store to props
const mapStateToProps = state => {
  return {
    citizenshipMapAllData: state.vizReducer.citizenshipMapAllData, // Accessing citizenship map data from the Redux store
  };
};

// Main functional component that receives props connected to the Redux store
function CitizenshipMapAll(props) {
  const { citizenshipMapAllData } = props; // Destructuring citizenshipMapAllData from props
  
  // State hooks for managing the axis data for the Plotly graph and rows for the table
  const [plotlyGraphAxis, setPlotlyGraphAxis] = useState({
    locationsAndText: [],
    z: [],
  });
  const [rowsForTable, setRowsForTable] = useState([]);

  // Effect hook to update local state when citizenshipMapAllData changes
  useEffect(() => {
    if (citizenshipMapAllData['countryGrantRateObj']!== undefined) {
      setPlotlyGraphAxis({
        locationsAndText: citizenshipMapAllData['countryGrantRateObj']['countries'], // Locations and text for the choropleth map
        z: citizenshipMapAllData['countryGrantRateObj']['countriesPercentGranteds'], // Data for the choropleth map
      });
    } else {
      setPlotlyGraphAxis({ locationsAndText: [], z: [] }); // Resetting graph data if undefined
    }
    if (citizenshipMapAllData.rowsForTable === undefined) {
      setRowsForTable([]); // Resetting table rows if undefined
    } else {
      setRowsForTable(citizenshipMapAllData.rowsForTable); // Updating table rows
    }
  }, [citizenshipMapAllData]); // Dependency array includes citizenshipMapAllData to re-run effect when it changes

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
      className="citizenship-map-all-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>
        Showing: Rates of 'granted' case decision by nationality of origin, for
        all offices
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
            bordercolor: secondary_accent_color, // Border color of hover labels
          },
          geo: {
            scope: geoScope, // Selected geographical scope
          },
          height: 500,
          width: 700,
        }}
        style={{
          width: '100%', // Width of the graph
          fontWeight: '900', // Font weight for text
          backgroundColor: background_color, // Background color of the graph area
        }}
      />
      {/* Dropdown menu for selecting geographical scope */}
      <label htmlFor="regionSelect">Select another region below</label>
      <select name="regionSelect" onChange={handleScopeChange}>
        {geoScopeArray.map(a => {
          return <option value={a}>{a.toUpperCase()}</option>; // Options for the dropdown menu
        })}
      </select>
      <p>Table view</p>
      {/* Table component for displaying data */}
      <Table
        bordered={true} // Whether the table borders should be visible
        rows={rowsForTable} // Rows to display in the table
        columns={columnsForTable} // Columns to display in the table
        tableWidth={'100%'} // Width of the table
        rowHeight={'50px'} // Height of each row in the table
        scroll={{ y: 550 }} // Scroll settings for the table
      />
    </div>
  );
}

// Connecting the component to the Redux store and exporting it
export default connect(mapStateToProps)(CitizenshipMapAll);