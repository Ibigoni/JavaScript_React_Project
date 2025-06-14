import React from 'react';
import PropTypes from 'prop-types';

function StatisticsDisplay({ comparisons, swaps, algorithm }) {
  // Get algorithm complexity information
  const getComplexity = (algo) => {
    const complexities = {
      quickSort: {
        time: 'O(n log n) average, O(n²) worst case',
        space: 'O(log n)'
      },
      mergeSort: {
        time: 'O(n log n)',
        space: 'O(n)'
      },
      bubbleSort: {
        time: 'O(n²)',
        space: 'O(1)'
      },
      insertionSort: {
        time: 'O(n²)',
        space: 'O(1)'
      },
      dijkstra: {
        time: 'O((V + E) log V)',
        space: 'O(V)'
      },
      aStar: {
        time: 'O(E)',
        space: 'O(V)'
      }
    };
    
    return complexities[algo] || { time: 'Unknown', space: 'Unknown' };
  };
  
  const complexity = getComplexity(algorithm);
  const isPathfinding = algorithm === 'dijkstra' || algorithm === 'aStar';

  
  return (
    <div className="statistics-panel">
      <h3>Performance Metrics</h3>
      
      <div className="metrics">
        <div className="metric">
          <span className="metric-label">
            {isPathfinding ? 'Nodes Visited:' : 'Comparisons:'}
          </span>
          <span className="metric-value">{comparisons ?? 0}</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">
            {isPathfinding ? 'Path Changes:' : 'Swaps:'}
          </span>
          <span className="metric-value">{swaps ?? 0}</span>
        </div>
      </div>
      
      <div className="complexity-info">
        <h4>Algorithm Complexity</h4>
        <p><strong>Time:</strong> {complexity.time}</p>
        <p><strong>Space:</strong> {complexity.space}</p>
      </div>
    </div>
  );
}

StatisticsDisplay.PropTypes = {
  comparisons: PropTypes.number,
  swaps: PropTypes.number,
  algorithm: PropTypes.string.isRequired
};

export default StatisticsDisplay;