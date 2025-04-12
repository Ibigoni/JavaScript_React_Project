import React from 'react';

function VisualizationCanvas({ array, algorithm }) {
  // Determine if we're showing a sorting or pathfinding visualization
  const isPathfinding = algorithm === 'dijkstra' || algorithm === 'aStar';
  
  if (isPathfinding) {
    return (
      <div className="visualization-canvas pathfinding-grid">
        {/* For pathfinding, we'd normally render a grid */}
        <div className="grid-container">
          {/* Simplified placeholder for grid visualization */}
          <div className="grid-placeholder">
            <p>Pathfinding Visualization</p>
            <p>Actual implementation would show a grid with start/end points and walls</p>
          </div>
        </div>
      </div>
    );
  }
  
  // For sorting algorithms, render array bars
  return (
    <div className="visualization-canvas sorting-bars">
      <div className="bars-container">
        {array.map((item, index) => {
          // Handle if the item is an object with status
          const value = typeof item === 'object' ? item.value : item;
          const status = typeof item === 'object' ? item.status : '';
          
          return (
            <div 
              key={index}
              className={`bar ${status}`}
              style={{
                height: `${value * 3}px`,
                width: `${100 / array.length}%`,
                maxWidth: '30px',
                marginLeft: '1px',
                marginRight: '1px'
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default VisualizationCanvas;
