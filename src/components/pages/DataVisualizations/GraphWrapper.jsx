import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import test_data from '../../../data/test_data.json';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

//background color
const { background_color } = colors;
//Main Component
function GraphWrapper(props) {
  //extract set_view function and dispatch method from props 
  const { set_view, dispatch } = props;
  //Use react router dom hook to get current route parameters
  let { office, view } = useParams();
  //If no view parameter is present, default to 'time-series'
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  //Determine which graph to render based on the presence of an office parameter + selected view
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

  //Function to fetch the data and update the state with new data
  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    /*
          _                                                                             _
        |                                                                                 |
        |   Example request for once the `/summary` endpoint is up and running:           |
        |                                                                                 |
        |     `${url}/summary?to=2022&from=2015&office=ZLA`                               |
        |                                                                                 |
        |     so in axios we will say:                                                    |
        |                                                                                 |     
        |       axios.get(`${url}/summary`, {                                             |
        |         params: {                                                               |
        |           from: <year_start>,                                                   |
        |           to: <year_end>,                                                       |
        |           office: <office>,       [ <-- this one is optional! when    ]         |
        |         },                        [ querying by `all offices` there's ]         |
        |       })                          [ no `office` param in the query    ]         |
        |                                                                                 |
          _                                                                             _
                                   -- Mack 
    
    */
//fetch data from API endpoint //API ENDPOINTS //
    if (office === 'all' || !office) {
      axios
        .get(process.env.REACT_APP_API_URI, {
          // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
          params: {
            from: years[0],
            to: years[1],
          },
        })
        .then(result => {
          //Update the state with the fetched data instead of mock data in production
          stateSettingCallback(view, office, test_data); // <-- `test_data` here can be simply replaced by `result.data` in prod! (TESTDATA)
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      axios
        .get(process.env.REACT_APP_API_URI, {
          // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
          params: {
            from: years[0],
            to: years[1],
            office: office,
          },
        })
        .then(result => {
          //Update the state with fetched data instead of mock data in production 
          stateSettingCallback(view, office, test_data); // <-- `test_data` here can be simply replaced by `result.data` in prod!(TESTDATA)
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  //Function to clear the current visualization query
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));//Dispatch action to reset the query
  };

  //render the component 
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
      <ScrollToTopOnMount /> {/*Scroll to top on component mount*/ }
      {map_to_render} {/* Render the determined graph */}
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
        <ViewSelect set_view={set_view} /> {/* Select view option */}
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        /> {/* Select year limits and handle data updates */}
      </div>
    </div>
  );
}
// Export the connected component
export default connect()(GraphWrapper);
