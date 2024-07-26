import React from 'react'; // Importing the React library
import { connect } from 'react-redux'; // Importing the connect function from React-Redux to connect the component to the Redux store
import { useParams } from 'react-router-dom'; // Importing useParams hook to get parameters from the URL
import CitizenshipMapAll from './Graphs/CitizenshipMapAll'; // Importing the CitizenshipMapAll component
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice'; // Importing the CitizenshipMapSingleOffice component
import TimeSeriesAll from './Graphs/TimeSeriesAll'; // Importing the TimeSeriesAll component
import OfficeHeatMap from './Graphs/OfficeHeatMap'; // Importing the OfficeHeatMap component
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice'; // Importing the TimeSeriesSingleOffice component
import YearLimitsSelect from './YearLimitsSelect'; // Importing the YearLimitsSelect component
import ViewSelect from './ViewSelect'; // Importing the ViewSelect component
import axios from 'axios'; // Importing axios for making HTTP requests
import { resetVisualizationQuery } from '../../../state/actionCreators'; // Importing the resetVisualizationQuery action creator
import { colors } from '../../../styles/data_vis_colors'; // Importing color styles
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount'; // Importing ScrollToTopOnMount utility

const { background_color } = colors; // Destructuring background_color from colors

// Main component for wrapping the graphs
function GraphWrapper(props) {
  const { set_view, dispatch } = props; // Destructuring props to get set_view and dispatch functions
  let { office, view } = useParams(); // Getting office and view parameters from the URL

  // If view is not set, default to 'time-series'
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }

  // Determine which map to render based on the office and view parameters
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  // Function to update the state with new data based on selected years, view, and office
  async function updateStateWithNewData(
    years,
    view,
    office,
    stateSettingCallback
  ) {
    // If no specific office is selected
    if (office === 'all' || !office) {
      const fiscalSummary = await axios.get(
        `https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary`,
        {
          params: {
            from: years[0],
            to: years[1],
          },
        }
      );

      const citizenshipSummary = await axios.get(
        `https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary`,
        {
          params: {
            from: years[0],
            to: years[1],
          },
        }
      );
      fiscalSummary.data.citizenshipResults = citizenshipSummary.data;
      console.log(fiscalSummary.data);
      stateSettingCallback(view, office, [fiscalSummary.data]);
    } else {
      // If a specific office is selected
      const fiscalSummary = await axios.get(
        `https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary`,
        {
          params: {
            from: years[0],
            to: years[1],
            office: office,
          },
        }
      );

      const citizenshipSummary = await axios.get(
        `https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary`,
        {
          params: {
            from: years[0],
            to: years[1],
            office: office,
          },
        }
      );
      fiscalSummary.data.citizenshipResults = citizenshipSummary.data;
      console.log(fiscalSummary.Data);
      stateSettingCallback(view, office, [fiscalSummary.data]); 
    }
  }

  // Function to clear the query
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
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
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper); // Connecting the component to the Redux store and exporting it

