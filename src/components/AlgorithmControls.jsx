import React from 'react';
import PropTypes from 'prop-types';

function AlgorithmControls({ 
  algorithm, 
  onAlgorithmChange, 
  arraySize, 
  onSizeChange, 
  speed, 
  onSpeedChange, 
  onStart, 
  onStop, 
  onReset,
  isRunning 
}) {
  const minArrSize = 10;
  const maxArrSize = 50;
  const minSpeed = 1;
  const maxSpeed = 50; 

  return (
    <div className="controls-panel">
      <div className="control-group">
        <label htmlFor="algorithm">Algorithm:</label>
        <select 
          id="algorithm" 
          value={algorithm} 
          onChange={onAlgorithmChange}
          disabled={isRunning}
        >
          <optgroup label="Sorting Algorithms">
            <option value="quickSort">Quick Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="bubbleSort">Bubble Sort</option>
            <option value="insertionSort">Insertion Sort</option>
          </optgroup>
          <optgroup label="Pathfinding Algorithms">
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="aStar">A* Algorithm</option>
          </optgroup>
        </select>
      </div>
      
      <div className="control-group">
        <label htmlFor="arraySize">Array Size:</label>
        <input 
          type="range" 
          id="arraySize" 
          min={minArrSize} 
          max={maxArrSize} 
          value={arraySize} 
          onChange={onSizeChange}
          disabled={isRunning}
        />
        <span>{arraySize}</span>
      </div>
      
      <div className="control-group">
        <label htmlFor="speed">Animation Speed:</label>
        <input 
          type="range" 
          id="speed" 
          min={minSpeed} 
          max={maxSpeed}
          value={speed} 
          onChange={onSpeedChange}
          disabled = {isRunning}
        />
        <span>{speed}%</span>
      </div>
      
      <div className="button-group">
        <button 
          onClick={onStart}
          disabled={isRunning}
          className="start-btn"
        >
          Start
        </button>
        <button 
          onClick={onStop}
          disabled={!isRunning}
          className="stop-btn"
        >
          Stop
        </button>
        <button 
          onClick={onReset}
          disabled={isRunning}
          className="reset-btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

AlgorithmControls.propTypes = {
  algorithm: PropTypes.string.isRequired,
  onAlgorithmChange: PropTypes.func.isRequired,
  arraySize: PropTypes.number.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  speed: PropTypes.number.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired
} 
export default AlgorithmControls;