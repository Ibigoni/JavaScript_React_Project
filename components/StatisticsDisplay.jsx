import React from 'react';

function StatisticsDisplay({ comparisons, swaps, algorithm}) {
  //Getting algorithm complexity information
  const getComplexity = (algo) => {
    const complexities = {
      quickSort: {
        time: 'O(n log n) average, O(n^2) worst case',
        space: 'O(log n)'
      },
      mergeSort: {
        time: 'O(n log n)',
        space: 'O(n)'
      },
      bubbleSort: {
        time: 'O(n^2)',
        space: 'O(1)'
      },
      insertionSort: {
        time: 'O(n^2)',
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

    return complexities[algo] || { time: 'unknown', space: 'Unknown'}
  };

  const complexity = getComplexity(algorithm);
  const isPathfinding = algorithm === 'dijkstra' || algorithm === 'aStar';

  return (
    <div className="statistics-panel">
      <h3>Performance Metrics</h3>

      <div className="metrics">
        <div className="metric">
          <span classNam="metric-label">
            {isPathfinding ? 'Node Visited:' : 'Comparisons:'}
            </span>
            <span className="metric-value">{comparisons}
          </span>
        </div>

        <div className="metric">
          <span className="metric-label">
            {isPathfinding ? 'Path Changes:' : 'Swaps:'}
          </span>
          <span className="metric-value">{swaps}</span>
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

export default StatisticsDisplay;