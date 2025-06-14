// Algorithm Visualizer Project
import React, { useState, useEffect, useRef } from 'react';
import './styles/App.css';

// Component imports
import Header from './components/Header';
import AlgorithmControls from './components/AlgorithmControls';
import VisualizationCanvas from './components/VisualizationCanvas';
import StatisticsDisplay from './components/StatisticsDisplay';

function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState('quickSort');
  const [isRunning, setIsRunning] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [animationQueue, setAnimationQueue] = useState([]);
  const animationRef = useRef(null);

  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({ value: Math.floor(Math.random() * 100) + 5, status: 'default' });
    }
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
  };

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const handleAlgorithmChange = (e) => setAlgorithm(e.target.value);
  const handleSizeChange = (e) => setArraySize(Number(e.target.value));
  const handleSpeedChange = (e) => setSpeed(Number(e.target.value));

  const startVisualization = () => {
    if (isRunning) return;

    setIsRunning(true);
    setComparisons(0);
    setSwaps(0);

    const arrCopy = [...array];
    const animations = [];

    switch (algorithm) {
      case 'quickSort':
        quickSort(arrCopy, 0, arrCopy.length - 1, animations);
        break;
      case 'mergeSort':
        mergeSort(arrCopy, 0, arrCopy.length - 1, animations);
        break;
      case 'bubbleSort': // Added Bubble Sort here
        bubbleSort(arrCopy, animations);
        break;
      case 'dijkstra':
        dijkstraSimulation(animations);
        break;
      case 'aStar':
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

    setArray(prevArray => prevArray.map(item => ({ ...item, status: 'default' })));

    if (currentAnimation.type === 'compare') {
      setComparisons(prev => prev + 1);
      setArray(prevArray => {
        const newArr = [...prevArray];
        const [idx1, idx2] = currentAnimation.indices;
        newArr[idx1] = { ...newArr[idx1], status: 'comparing' };
        newArr[idx2] = { ...newArr[idx2], status: 'comparing' };
        return newArr;
      });
    } else if (currentAnimation.type === 'swap') {
      setSwaps(prev => prev + 1);
      setArray(prevArray => {
        const newArr = [...prevArray];
        const [idx1, idx2] = currentAnimation.indices;
        const val1 = newArr[idx1].value;
        const val2 = newArr[idx2].value;
        newArr[idx1] = { value: val2, status: 'swapping' };
        newArr[idx2] = { value: val1, status: 'swapping' };
        return newArr;
      });
    }

    const speedFactor = 101 - speed;
    const timeoutDuration = speedFactor * 5;

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

  const resetArray = () => {
    stopVisualization();
    generateRandomArray();
  };

  // Quick Sort
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
      animations.push({ type: 'compare', indices: [j, high] });

      if (arr[j].value <= pivot.value) {
        i++;
        animations.push({ type: 'swap', indices: [i, j] });
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    animations.push({ type: 'swap', indices: [i + 1, high] });
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    return i + 1;
  };

  // Merge Sort
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
    const leftArr = new Array(n1);
    const rightArr = new Array(n2);

    for (let i = 0; i < n1; i++) leftArr[i] = arr[left + i];
    for (let j = 0; j < n2; j++) rightArr[j] = arr[mid + 1 + j];

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      animations.push({ type: 'compare', indices: [left + i, mid + 1 + j] });

      if (leftArr[i].value <= rightArr[j].value) {
        animations.push({ type: 'swap', indices: [k, left + i] });
        arr[k++] = leftArr[i++];
      } else {
        animations.push({ type: 'swap', indices: [k, mid + 1 + j] });
        arr[k++] = rightArr[j++];
      }
    }

    while (i < n1) {
      animations.push({ type: 'swap', indices: [k, left + i] });
      arr[k++] = leftArr[i++];
    }

    while (j < n2) {
      animations.push({ type: 'swap', indices: [k, mid + 1 + j] });
      arr[k++] = rightArr[j++];
    }
  };

  // Bubble Sort (NEWLY ADDED)
  const bubbleSort = (arr, animations) => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        animations.push({ type: 'compare', indices: [j, j + 1] });

        if (arr[j].value > arr[j + 1].value) {
          animations.push({ type: 'swap', indices: [j, j + 1] });
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
  };

  // Placeholder for Dijkstra
  const dijkstraSimulation = (animations) => {
    for (let i = 0; i < array.length; i++) {
      animations.push({ type: 'compare', indices: [i, i > 0 ? i - 1 : 0] });
      if (i % 3 === 0) {
        animations.push({ type: 'swap', indices: [i, i > 0 ? i - 1 : 0] });
      }
    }
  };

  // Placeholder for A*
  const aStarSimulation = (animations) => {
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
