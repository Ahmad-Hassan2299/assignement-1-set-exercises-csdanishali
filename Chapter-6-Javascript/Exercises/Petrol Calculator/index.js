// Function to calculate the total petrol cost
function calculateTotal() {
  // Get values from input fields
  const pricePerLitre = parseFloat(document.getElementById("pricePerLitre").value);
  const litresPurchased = parseFloat(document.getElementById("litresPurchased").value);

  // Calculate total cost
  const totalCost = pricePerLitre * litresPurchased;

  // Display result with 2 decimal places
  document.getElementById("totalCost").innerText = `Total Cost: $${totalCost.toFixed(2)}`;
}
