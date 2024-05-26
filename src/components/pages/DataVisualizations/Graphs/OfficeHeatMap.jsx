import React, { useState, useEffect } from 'react'; // Importing necessary hooks and functions from React
import { connect } from 'react-redux'; // Importing Redux's connect function to connect this component to the store
import Plot from 'react-plotly.js'; // Importing Plotly library for creating interactive graphs
import Table from './TableComponents/Table'; // Importing the Table component for displaying tabular data
import { colors } from '../../../../styles/data_vis_colors'; // Importing custom colors for styling

// Destructuring background_color from the imported colors object
const { background_color } = colors;

// Mapping state from the Redux store to props
const mapStateToProps = state => {
  return {
    officeHeatMapData: state.vizReducer.officeHeatMapData, // Accessing office heat map data from the Redux store
  };
};

// Main functional component that receives props connected to the Redux store
function OfficeHeatMap(props) {
  const { officeHeatMapData } = props; // Destructuring officeHeatMapData from props
  
  // State hooks for managing the axis data for the Plotly graph and rows for the table
  const [plotlyGraphAxis, setPlotlyGraphAxis] = useState({
    x: [],
    y: [],
    z: [],
  });
  const [rowsForTable, setRowsForTable] = useState([]);

  // Effect hook to update local state when officeHeatMapData changes
  useEffect(() => {
    if (officeHeatMapData['officeHeatMapDataObject']!== undefined) {
      setPlotlyGraphAxis({
        x: officeHeatMapData['officeHeatMapDataObject']['x'], // X-axis data
        y: officeHeatMapData['officeHeatMapDataObject']['y'], // Y-axis data
        z: officeHeatMapData['officeHeatMapDataObject']['z'], // Z-axis data for heatmap
      });
    } else {
      setPlotlyGraphAxis({ x: [], y: [], z: [] }); // Resetting graph data if undefined
    }
    if (officeHeatMapData.rowsForTable === undefined) {
      setRowsForTable([]); // Resetting table rows if undefined
    } else {
      setRowsForTable(officeHeatMapData.rowsForTable); // Updating table rows
    }
  }, [officeHeatMapData]); // Dependency array includes officeHeatMapData to re-run effect when it changes

  // Columns to be displayed in the table
  const columnsForTable = [
    'Year [Office]',
    'Total Cases',
    '% Granted',
    '% Admin Close / Dismissal',
    '% Denied',
  ];

  // Render method returns JSX for the component
  return (
    <div
      className="office-heat-map-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100px',
        justifyContent: 'center',
      }}
    >
      <p>Showing: Rates of 'granted' case decision by asylum office, by year</p>
      {/* Plotly graph component for displaying office heat map data */}
      <Plot
        data={[
          {
            x: plotlyGraphAxis['x'], // X-axis data
            y: plotlyGraphAxis['y'], // Y-axis data
            z: plotlyGraphAxis['z'], // Z-axis data for heatmap
            colorscale: [
              ['0.0', 'rgb(165,0,38)'],
              ['0.111111111111', 'rgb(215,48,39)'],
              ['0.222222222222', 'rgb(244,109,67)'],
              ['0.333333333333', 'rgb(253,174,97)'],
              ['0.444444444444', 'rgb(254,224,144)'],
              ['0.555555555556', 'rgb(224,243,248)'],
              ['0.666666666667', 'rgb(171,217,233)'],
              ['0.777777777778', 'rgb(116,173,209)'],
              ['0.888888888889', 'rgb(69,117,180)'],
              ['1.0', 'rgb(49,54,149)'],
            ],
            type: 'heatmap', // Type of plot
          },
        ]}
        layout={{
          title: 'USCIS Asylum Office Grant Rates by Year and Office', // Graph title
          height: 500,
          width: 700,
          paper_bgcolor: background_color, // Background color of the graph area
          hoverlabel: {
            bordercolor: background_color, // Border color of hover labels
          },
        }}
      />
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
export default connect(mapStateToProps)(OfficeHeatMap);