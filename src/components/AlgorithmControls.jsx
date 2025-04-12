import React from 'react';

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
          min="10" 
          max="100" 
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
          min="1" 
          max="100" 
          value={speed} 
          onChange={onSpeedChange}
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

export default AlgorithmControls;