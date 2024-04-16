
// Get the name of the SVG file
const nameArea = document.querySelector('#nameArea')
// Function to save SVG canvas as SVG
const saveSvgAsSVG = function() {

  let SVGname = nameArea.value

  // Convert SVG canvas to XML string
  const svgData = new XMLSerializer().serializeToString(svgCanvas);

  // Create a new Blob object with SVG data
  const blob = new Blob([svgData], { type: 'image/svg+xml' });

  // Create a temporary link element
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${SVGname}`+'.svg';
  link.click();
  console.log(`${SVGname}.svg saved successfully!`)
};

export { saveSvgAsSVG };