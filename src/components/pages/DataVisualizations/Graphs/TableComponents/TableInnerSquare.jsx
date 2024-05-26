// Importing React and colors from styles
import React from 'react';
import { colors } from '../../../../../styles/data_vis_colors';

// Extracting background_color from colors
const { background_color } = colors;

// Defining a functional component named TableInnerSquare that takes props
function TableInnerSquare(props) {
  // Destructuring props to get innerData and rowHeight
  const { innerData, rowHeight } = props;
  
  // Returning JSX for rendering the component
  return (
    <div
      className="table-inner-square"
      style={{
        backgroundColor: background_color,
        border: '1px solid lightgray',
        height: rowHeight,
        overflow: 'hidden',
        padding: '2%',
        width: '100%',
        flex: '1',
      }}
    >
      {/* Displaying the innerData passed as prop */}
      {innerData}
    </div>
  );
}

// Exporting the TableInnerSquare component
export default TableInnerSquare;