import { dragElementOne } from './uiTools.js';
import { saveSvgAsSVG } from './saveAndLoad.js';


// Event listener for home button
const homeButton = function() {
  location.href = "/"
};
document.getElementById('homeButton').addEventListener('click', homeButton);

// Event listener for page2 button
const page2 = function() {
  location.href = "/canvasPage"
};
document.querySelector('#page2Button').addEventListener('click', page2);

// Event listener for page3 button
const page3 = function() {
  location.href = "/aboutPage"
};
document.querySelector('#page3Button').addEventListener('click', page3);






// Get the current page
const currentPage = window.location.pathname;
// Check if the current page is "canvasPage"
if (currentPage === "/canvasPage") {
  // Add drag element functionality
  dragElementOne();

  // Event listener for save button
  const saveButton = document.querySelector('#saveButton');
  saveButton.addEventListener('click', saveSvgAsSVG);
}