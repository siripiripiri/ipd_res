const scoreElement = document.getElementById("score");
const predictedLabel = "{{ score }}";

fetch("/predict", {  // Replace with your actual prediction route
    method: "POST",
    // Add form data here (if applicable)
  })
  .then(response => response.json())
  .then(data => {
    const predictedLabel = data.score;  // Assuming the response has a "score" key
    console.log("Predicted Label:", predictedLabel);
    // Use the predictedLabel for further processing or display
  });

  if (predictedLabel === 1) {
    scoreElement.textContent = "High";
  } else {
    scoreElement.textContent = "Low";
  }
  
