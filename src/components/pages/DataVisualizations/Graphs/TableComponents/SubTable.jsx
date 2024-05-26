// Importing React and a component called TableInnerSquare
import React from 'react';
import TableInnerSquare from './TableInnerSquare';

// Defining a functional component named SubTable that takes props
function SubTable(props) {
  // Destructuring props to get dataObject and rowHeight
  const { dataObject, rowHeight } = props;
  
  // Returning JSX for rendering the component
  return (
    <div
      className="sub-table"
      style={{
        display: 'flex',
        flex: '1',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Mapping over entries of dataObject to render each entry */}
      {Object.entries(dataObject).map((entry, idx) => {
        return (
          <div
            className="sub-table-inner"
            style={{
              display: 'flex',
              flex: '1',
              overflow: 'hidden',
            }}
          >
            {/* Rendering two TableInnerSquare components for each entry */}
            <TableInnerSquare rowHeight={rowHeight} innerData={entry[0]} />
            <TableInnerSquare rowHeight={rowHeight} innerData={entry[1]} />
          </div>
        );
      })}
    </div>
  );
}

// Exporting the SubTable component
export default SubTable;