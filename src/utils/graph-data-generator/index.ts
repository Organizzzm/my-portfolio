export default function generateSmoothGraph(numPoints: number, minValue: number, maxValue: number, smoothness: number) {
  const transitionFunction = easeInOutSine; // Use easeInOutSine function
  const graph = [];
  let previousValue!: number;

  // Generating a start point
  const initialPoint = getRandomValue(minValue, maxValue);
  graph.push(initialPoint);

  // Generate the other points
  previousValue = initialPoint;

  for (let i = 1; i < numPoints; i++) {
    const randomValue = getRandomValue(minValue, maxValue);

    // Generate intermediate values using the transition function
    for (let j = 0; j < smoothness; j++) {
      const t = j / smoothness;
      const value = previousValue + transitionFunction(t) * (randomValue - previousValue);
      graph.push(value);
    }

    previousValue = randomValue;
  }

  return graph;
}

function getRandomValue(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Smooth transition from the previous value to a random value
function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
  // -(cos(π * t) - 1) / 2
  // -0.5 * (Math.cos(Math.PI * t) - 1);
}
