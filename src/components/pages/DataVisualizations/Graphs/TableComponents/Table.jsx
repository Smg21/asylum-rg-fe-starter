// Importing React, TableRow, and colors from styles
import React from 'react';
import TableRow from './TableRow';
import { colors } from '../../../../../styles/data_vis_colors';

// Extracting primary_accent_color from colors
const { primary_accent_color } = colors;

// Defining a functional component named Table that takes props
function Table(props) {
  // Destructuring props to get rows, columns, tableWidth, and rowHeight
  const { rows, columns, tableWidth, rowHeight } = props;
  
  // Returning JSX for rendering the component
  return (
    <div
      className="g-table"
      style={{
        display: 'flex',
        width: tableWidth,
        flexDirection: 'column',
        margin: '5% auto',
        overflow: 'hidden',
      }}
    >
      {/* Rendering column IDs */}
      <div
        className="column-id-container"
        style={{
          display: 'flex',
          width: tableWidth,
          height: rowHeight,
        }}
      >
        {columns.map((column, idx) => {
          return (
            <div
              className="column-id"
              style={{
                backgroundColor: primary_accent_color,
                border: '1px solid black',
                color: 'white',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={idx}
            >
              {column}
            </div>
          );
        })}
      </div>
      
      {/* Rendering rows */}
      <div className="rows-container">
        {rows.map((row, idx) => {
          return (
            <TableRow
              key={idx}
              row={row}
              rowId={idx}
              tableWidth={tableWidth}
              rowHeight={rowHeight}
              columns={columns}
            />
          );
        })}
      </div>
    </div>
  );
}

// Exporting the Table component
export default Table;