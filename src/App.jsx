// Algorithm Visualizer Project
import React, { useState, useEffect, useRef } from 'react';
import './styles/App.css';

// Component imports
import Header from './components/Header';
import AlgorithmControls from './components/AlgorithmControls';
import VisualizationCanvas from './components/VisualizationCanvas';
import StatisticsDisplay from './components/StatisticsDisplay';

function App() {
  // State for array to be sorted/traversed
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50); // Animation speed (1-100)
  const [algorithm, setAlgorithm] = useState('quickSort');
  const [isRunning, setIsRunning] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [animationQueue, setAnimationQueue] = useState([]);
  const animationRef = useRef(null);

  // Generate random array
  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5);
    }
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
  };

  // Initialize array on component mount and when array size changes
  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  // Handle algorithm selection
  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  // Handle array size change
  const handleSizeChange = (e) => {
    setArraySize(Number(e.target.value));
  };

  // Handle speed change
  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  // Animation control functions
  const startVisualization = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setComparisons(0);
    setSwaps(0);
    
    // Create a copy of the array to work with
    const arrCopy = [...array];
    const animations = [];
    
    // Run the selected algorithm
    switch (algorithm) {
      case 'quickSort':
        quickSort(arrCopy, 0, arrCopy.length - 1, animations);
        break;
      case 'mergeSort':
        mergeSort(arrCopy, 0, arrCopy.length - 1, animations);
        break;
      case 'dijkstra':
        // Simplified for demonstration - actual implementation would differ
        dijkstraSimulation(animations);
        break;
      case 'aStar':
        // Simplified for demonstration - actual implementation would differ
        aStarSimulation(animations);
        break;
      default:
        quickSort(arrCopy, 0, arrCopy.length - 1, animations);
    }
    
    setAnimationQueue(animations);
    runAnimations(animations);
  };

  const runAnimations = (animations) => {
    if (animations.length === 0) {
      setIsRunning(false);
      return;
    }
    
    const newAnimations = [...animations];
    const currentAnimation = newAnimations.shift();
    
    // Apply the animation
    if (currentAnimation.type === 'compare') {
      setComparisons(prev => prev + 1);
      // Highlight elements being compared
      const newArr = [...array];
      newArr[currentAnimation.indices[0]] = {
        value: newArr[currentAnimation.indices[0]],
        status: 'comparing'
      };
      newArr[currentAnimation.indices[1]] = {
        value: newArr[currentAnimation.indices[1]],
        status: 'comparing'
      };
      setArray(newArr);
    } else if (currentAnimation.type === 'swap') {
      setSwaps(prev => prev + 1);
      // Perform the swap
      const newArr = [...array];
      const temp = newArr[currentAnimation.indices[0]];
      newArr[currentAnimation.indices[0]] = newArr[currentAnimation.indices[1]];
      newArr[currentAnimation.indices[1]] = temp;
      setArray(newArr);
    }
    
    // Schedule next animation
    const speedFactor = 101 - speed; // Invert speed so higher number = faster
    const timeoutDuration = speedFactor * 5; // Scale timeout duration (5-500ms)
    
    animationRef.current = setTimeout(() => {
      runAnimations(newAnimations);
    }, timeoutDuration);
  };

  const stopVisualization = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    setIsRunning(false);
  };

  // Reset the array and visualization state
  const resetArray = () => {
    stopVisualization();
    generateRandomArray();
  };

  // ALGORITHM IMPLEMENTATIONS
  
  // Quick Sort Implementation
  const quickSort = (arr, low, high, animations) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high, animations);
      quickSort(arr, low, pivotIndex - 1, animations);
      quickSort(arr, pivotIndex + 1, high, animations);
    }
  };

  const partition = (arr, low, high, animations) => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      // Compare current element with pivot
      animations.push({ type: 'compare', indices: [j, high] });
      
      if (arr[j] <= pivot) {
        i++;
        // Swap elements
        animations.push({ type: 'swap', indices: [i, j] });
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    // Swap pivot to its correct position
    animations.push({ type: 'swap', indices: [i + 1, high] });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    return i + 1;
  };

  // Merge Sort Implementation
  const mergeSort = (arr, left, right, animations) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSort(arr, left, mid, animations);
      mergeSort(arr, mid + 1, right, animations);
      merge(arr, left, mid, right, animations);
    }
  };

  const merge = (arr, left, mid, right, animations) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    // Create temporary arrays
    const leftArr = new Array(n1);
    const rightArr = new Array(n2);
    
    // Copy data to temp arrays
    for (let i = 0; i < n1; i++) {
      leftArr[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      rightArr[j] = arr[mid + 1 + j];
    }
    
    // Merge the temp arrays back into arr
    let i = 0;
    let j = 0;
    let k = left;
    
    while (i < n1 && j < n2) {
      // Compare elements from both subarrays
      animations.push({ type: 'compare', indices: [left + i, mid + 1 + j] });
      
      if (leftArr[i] <= rightArr[j]) {
        animations.push({ type: 'swap', indices: [k, left + i] });
        arr[k] = leftArr[i];
        i++;
      } else {
        animations.push({ type: 'swap', indices: [k, mid + 1 + j] });
        arr[k] = rightArr[j];
        j++;
      }
      k++;
    }
    
    // Copy remaining elements of leftArr if any
    while (i < n1) {
      animations.push({ type: 'swap', indices: [k, left + i] });
      arr[k] = leftArr[i];
      i++;
      k++;
    }
    
    // Copy remaining elements of rightArr if any
    while (j < n2) {
      animations.push({ type: 'swap', indices: [k, mid + 1 + j] });
      arr[k] = rightArr[j];
      j++;
      k++;
    }
  };

  // Simplified placeholder for Dijkstra's algorithm
  const dijkstraSimulation = (animations) => {
    // This is a placeholder - actual implementation would involve a grid/graph
    for (let i = 0; i < array.length; i++) {
      animations.push({ type: 'compare', indices: [i, i > 0 ? i - 1 : 0] });
      if (i % 3 === 0) {
        animations.push({ type: 'swap', indices: [i, i > 0 ? i - 1 : 0] });
      }
    }
  };

  // Simplified placeholder for A* algorithm
  const aStarSimulation = (animations) => {
    // This is a placeholder - actual implementation would involve a grid/graph
    for (let i = 0; i < array.length; i++) {
      animations.push({ type: 'compare', indices: [i, i < array.length - 1 ? i + 1 : array.length - 1] });
      if (i % 4 === 0) {
        animations.push({ type: 'swap', indices: [i, i < array.length - 1 ? i + 1 : array.length - 1] });
      }
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <AlgorithmControls 
          algorithm={algorithm}
          onAlgorithmChange={handleAlgorithmChange}
          arraySize={arraySize}
          onSizeChange={handleSizeChange}
          speed={speed}
          onSpeedChange={handleSpeedChange}
          onStart={startVisualization}
          onStop={stopVisualization}
          onReset={resetArray}
          isRunning={isRunning}
        />
        <VisualizationCanvas 
          array={array}
          algorithm={algorithm}
        />
        <StatisticsDisplay 
          comparisons={comparisons}
          swaps={swaps}
          algorithm={algorithm}
        />
      </div>
    </div>
  );
}

export default App;