let dataset = [];
let currentIndex = 0;

// Fetch the dataset
fetch('static/data/experiment_results.json')
  .then(response => response.json())
  .then(data => {
    dataset = data;
    updateCounter(); // Update the counter when the dataset is loaded
    displayExample();
  })
  .catch(error => console.error('Error loading dataset:', error));

// Display the current example
function displayExample() {
  if (dataset.length === 0) return;

  const example = dataset[currentIndex];
  document.getElementById('original-comment').textContent = example.original;
  document.getElementById('reasoning').textContent = example.reasoning;
  document.getElementById('paraphrase').textContent = example.paraphrase;
  updateCounter(); // Update the counter whenever an example is displayed
}

// Update the counter of examples
function updateCounter() {
  const counterElement = document.getElementById('example-counter');
  if (counterElement) {
    counterElement.textContent = `Example ${currentIndex + 1} of ${dataset.length}`;
  }
}

// Navigate to the previous example
function previousExample() {
  if (currentIndex > 0) {
    currentIndex--;
    displayExample();
  }
}

// Navigate to the next example
function nextExample() {
  if (currentIndex < dataset.length - 1) {
    currentIndex++;
    displayExample();
  }
}

// Add event listeners for navigation buttons
document.addEventListener('DOMContentLoaded', () => {
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  if (prevButton) {
    prevButton.addEventListener('click', previousExample);
  }

  if (nextButton) {
    nextButton.addEventListener('click', nextExample);
  }

  // Initialize the counter element
  updateCounter();
});