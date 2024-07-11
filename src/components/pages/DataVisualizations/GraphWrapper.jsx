import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll'; // Importing components for different graphs
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect'; // Importing select components
import ViewSelect from './ViewSelect';
import axios from 'axios'; // Importing Axios for API requests
import { resetVisualizationQuery, setData } from '../../../state/actionCreators'; // Importing Redux action creators
import { colors } from '../../../styles/data_vis_colors'; // Importing color definitions
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount'; // Utility function for scrolling

const { background_color } = colors; // Destructuring background color from colors object

function GraphWrapper(props) {
  const { set_view, dispatch } = props; // Destructuring props to get set_view function and dispatch

  let { office, view } = useParams(); // Getting 'office' and 'view' parameters from URL

  useEffect(() => {
    if (!view) {
      set_view('time-series'); // Setting default view to 'time-series' if not specified in URL
      view = 'time-series'; // Updating view variable to 'time-series'
    }
  }, [set_view, view]); // useEffect dependency array ensures it runs when set_view or view changes

  let map_to_render; // Declaring variable to hold the component to render based on 'office' and 'view'

  
  // Graph Rendering Logic (loom):
  if (!office) { // If 'office' is not specified
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />; // Render TimeSeriesAll component
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />; // Render OfficeHeatMap component
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />; // Render CitizenshipMapAll component
        break;
      default:
        break;
    }
  } else { // If 'office' is specified
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />; // Render TimeSeriesSingleOffice with 'office' prop
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />; // Render CitizenshipMapSingleOffice with 'office' prop
        break;
      default:
        break;
    }
  }

  
  //  Function to fetch new data from API based on selected years, view, and office (loom):
  async function updateStateWithNewData(years, view, office, stateSettingCallback) {
    try {
      let endpoint;

      
      // API Integration and Axios Usage (loom):
      if (office === 'all' || !office) {
        endpoint = 'fiscalSummary'; // Endpoint for fetching fiscal summary data
      } else {
        endpoint = `fiscalSummary?office=${office}`; // Endpoint for fetching fiscal summary data for a specific office
      }

      // Fetching data from API endpoints using Axios
      const [fiscalResponse, citizenshipResponse] = await Promise.all([
        axios.get(`https://hrf-asylum-be-b.herokuapp.com/cases/${endpoint}`, {
          params: {
            from: years[0], // Start year parameter
            to: years[1], // End year parameter
          },
        }),
        axios.get('https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary'), // Fetching citizenship summary data
      ]);

      // Constructing data object with fetched results
      let data = {
        fiscalResults: fiscalResponse.data, // Fiscal year data
        citizenshipResults: citizenshipResponse.data, // Citizenship data
      };

      dispatch(setData(data)); // Dispatching Redux action to set fetched data into application state
      stateSettingCallback(view, office, data); // Callback function to update state with new view, office, and data
    } catch (error) {
     
      // Error Handling and Debugging (loom):
      console.error('Error fetching data:', error); // Logging error message if data fetching fails
    }
  }

  // Function to clear query parameters
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office)); // Dispatching Redux action to reset visualization query
  };

  // JSX rendering
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color, // Applying background color style
      }}
    >
      <ScrollToTopOnMount /> {/* Component to scroll to top on mount */}
      {map_to_render} {/* Rendering the selected map component */}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} /> {/* Rendering view selection component */}
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData} // Passing props to YearLimitsSelect component
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper); // Connecting GraphWrapper component to Redux store
