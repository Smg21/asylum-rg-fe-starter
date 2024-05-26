// Importing React, TableInnerSquare, and SubTable
import React from 'react';
import TableInnerSquare from './TableInnerSquare';
import SubTable from './SubTable';

// Defining a functional component named TableRow that takes props
function TableRow(props) {
  // Destructuring props to get columns, row, tableWidth, rowHeight
  const { columns, row, tableWidth, rowHeight } = props;
  
  // Returning JSX for rendering the component
  return (
    <div
      className="table-row"
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: tableWidth,
        overflow: 'hidden',
      }}
    >
      {/* Mapping over columns and rendering content based on the type of data */}
      {columns.map((property, idx) => {
        if (row) {
          if (typeof row[property] === 'object') {
            // If the property value is an object, render a SubTable
            return (
              <SubTable
                dataObject={row[property]}
                rowHeight={rowHeight}
                key={idx}
              />
            );
          } else {
            // Otherwise, render a TableInnerSquare
            return (
              <div key={idx} style={{ overflow: 'hidden', flex: '1' }}>
                <TableInnerSquare
                  innerData={row[property]}
                  rowHeight={rowHeight}
                />
              </div>
            );
          }
        }
      })}
    </div>
  );
}

// Exporting the TableRow component
export default TableRow;