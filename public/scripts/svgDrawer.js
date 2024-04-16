// Create SVG Drawing pad
const createDrawingArea = function() {
  const drawingArea = document.querySelector('.svgContainer');
  const svgBox = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgBox.setAttribute("width","500")
  svgBox.setAttribute("height","500")
  svgBox.setAttribute("id","svgCanvas")
  svgBox.style.backgroundColor = 'white'
  drawingArea.appendChild(svgBox)
}

createDrawingArea();

const svgCanvas = document.querySelector('#svgCanvas')
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Function to get mouse position relative to SVG canvas
const getMousePosition = function(event) {
  const CTM = svgCanvas.getScreenCTM();
  if (CTM) {
    const mouseX = (event.clientX - CTM.e) / CTM.a;
    const mouseY = (event.clientY - CTM.f) / CTM.d;
    return { x: mouseX, y: mouseY };
  } else {
    return { x: event.clientX, y: event.clientY };
  }
};

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Variables

let brushSize = "1px";
let idCount = 0;
let svgsOnCanvas = [];

// ////////////////////////////////////////////////////////////////


// Circle Drawing Class and Function
class Circle1{
  constructor(name, cx, cy, r, stroke, strokewidth, fill) {
    this.name = name,    
    this.cx = cx,
    this.cy = cy,
    this.r = r,
    this.stroke = stroke,
    this.strokewidth = strokewidth,
    this.fill = fill
  }

  createCircleElement(parentName) {
    const svgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    svgCircle.setAttribute("id",this.name)
    svgCircle.setAttribute("cx",this.cx)
    svgCircle.setAttribute("cy",this.cy)
    svgCircle.setAttribute("r",this.r)
    svgCircle.setAttribute("stroke",this.stroke)
    svgCircle.setAttribute("stroke-width",this.strokewidth)
    svgCircle.setAttribute("fill",this.fill)
    const parent = parentName
    parent.appendChild(svgCircle)
    console.log(`${this.name} created successfully!`)
  }

}

// ////////////////////////////////////////////////////////////////



// Drawing Lines and Paths with the mouse

const drawOnCanvasWithPath = function(svgCanvas) {
  let isDrawing = false;
  let previousX = 0;
  let previousY = 0;

  // Function to start drawing
  const startDrawing = function(event) {
    isDrawing = true;
    idCount += 1;
    const NewSvgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let svgPath = NewSvgPath;
    svgPath.id = idCount;
    svgPath.setAttribute("stroke", "black");
    svgPath.setAttribute("stroke-width", brushSize);
    svgPath.setAttribute("fill", "none");
    svgCanvas.appendChild(svgPath);
    const { x, y } = getMousePosition(event);
    svgPath.setAttribute("d", `M${x} ${y}`);
    previousX = x;
    previousY = y;
    console.log(svgPath)
    svgsOnCanvas.push(svgPath);
    console.log(svgsOnCanvas)
  };

  // Function to continue drawing
  const continueDrawing = function(event) {
    if (isDrawing) {
      const svgPath = svgCanvas.lastChild;
      const { x, y } = getMousePosition(event);
      const path = svgPath.getAttribute("d") + ` L${x} ${y}`;
      svgPath.setAttribute("d", path);
      previousX = x;
      previousY = y;
    }
  };

  // Function to stop drawing
  const stopDrawing = function() {
    isDrawing = false;
  };

  // Event listeners
  svgCanvas.addEventListener("mousedown", startDrawing);
  svgCanvas.addEventListener("mousemove", continueDrawing);
  svgCanvas.addEventListener("mouseup", stopDrawing);
  svgCanvas.addEventListener("mouseleave", stopDrawing);
};

// Call the function and pass the SVG canvas
drawOnCanvasWithPath(svgCanvas);




// Draw a circle wit hthe mouse

const drawCircleWithMouse = function(svgCanvas) {
  let isDrawing = false;
  let startX = 0;
  let startY = 0;

  // Function to start drawing
  const startDrawing = function(event) {
    isDrawing = true;
    const { x, y } = getMousePosition(event);
    startX = x;
    startY = y;
  };

  // Function to continue drawing
  const continueDrawing = function(event) {
    if (isDrawing) {
      const { x, y } = getMousePosition(event);
      const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
      const circle = new Circle1("SC1", startX, startY, radius, "black", 2, "none");
      circle.createCircleElement(svgCanvas);
    }
  };

  // Function to stop drawing
  const stopDrawing = function() {
    isDrawing = false;
  };

  // Event listeners
  svgCanvas.addEventListener("mousedown", startDrawing);
  svgCanvas.addEventListener("mousemove", continueDrawing);
  svgCanvas.addEventListener("mouseup", stopDrawing);
  svgCanvas.addEventListener("mouseleave", stopDrawing);
};

// Call the function passing the SVG canvas
// drawCircleWithMouse(svgCanvas);





