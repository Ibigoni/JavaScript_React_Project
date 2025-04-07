//Algorithm Visualizer Project
import React, { useState, useEffect, useRef } from 'react';

import Header from './components/Header';
import AlgorithmControls from './components/AlgorithmControls';
import VisualizationCanvas from './Components/VisualizationCanvas';
import StatisticsDisplay from './Components/StatisticsDisplay';

function App() {
  // State for array to be sorted/traversed


  //Generate random array
  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < newArray.length; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5);
    }
    setArray(newArray);
    setComparisions(0);
    setSwaps(0);
  };

  // Initialize array on component mount and when array size changes
  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  // Handle array size change
  const handleSizeChange = (e) => {
    setArraySize(Number(e.target.value));
  };

  //Handle speed change
  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  //Animation control functions
  const startVisualization = () => {
    if (isRunning) return;

    setIsRunning(true);
    setComparisons(0);
    setSwaps(0);

    // Creating a copy of the array to work with
    const arrCopy = [...array];
    const animations = [];

    // Run the selected algorithm
    switch (algorithm) {
      case 'quickSort':
        quickSort(arrCopy, 0, arrCopy.length - 1, animations);
        break;
      case 'mergeSort':
        mergeSort(arrCopy, 0, arrCopy.lenght - 1, animations);
        break;
      case 'dijkstra':
        dijsktraSimulation(animations);
        break;
      case 'aStar':
        aStartSimulation(animations);
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

    const newAniamtions = [...animations];
    const currentAnimation = newAniamtions.shift();

    //Applying the animations
    if (currentAnimation.type === 'compare') {
      setComparisions(prev => prev + 1);
      // Highlight elements being compared
      const newArr = [...array];
      newArr[currentAnimation.indices[0]] = {
        value: newArr[currentAnimation.indices[0]],
        status: 'comparing'
      };
      setArray(newArr);
    } else if (currentAnimation.type === 'swap') {
      setSwaps(prev => prev + 1);
      // Performing the swap
      const newArr = [...array];
      const temp = newArr[currentAnimation.indices[0]];
      newArr[currentAnimation.indices[0]] = newArr[currentAnimation.indices[1]];
      newArr[currentAnimation.indices[1]] = temp;
      setArray(newArr);
    }

    //Next animation being scheduled
    // const
  }
}





