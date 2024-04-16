// Da App

// Eraser functionality variables
const eraser = document.querySelector("#eraser");
const eraserOff = document.querySelector("#eraserOff");

// Variable Eleemnts
const brushSizeElement = document.querySelector("#brushSize");

// Variables
let brushSize = `${brushSizeElement.value}` + "px";
let idCount = 0;
let svgsOnCanvas = [];

let canvasWidth = 500;
let canvasHeight = 500;
let canvasBackgroundColor = "white";

// Get all radio buttons with class "eraserRadio"
const radioButtons = document.querySelectorAll('input[class="eraserRadio"]');

// Add event listener to each radio button
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("click", function () {
    // Uncheck all other radio buttons
    radioButtons.forEach((rb) => {
      if (rb !== radioButton) {
        rb.checked = false;
      }
    });
  });
});

// Function to get mouse position relative to SVG canvas
const getMousePosition = function (event) {
  const CTM = svgCanvas.getScreenCTM();
  if (CTM) {
    const mouseX = (event.clientX - CTM.e) / CTM.a;
    const mouseY = (event.clientY - CTM.f) / CTM.d;
    return { x: mouseX, y: mouseY };
  } else {
    return { x: event.clientX, y: event.clientY };
  }
};

// Create SVG Drawing pad
function createDrawingArea() {
  const drawingArea = document.querySelector(".svgContainer");
  const svgBox = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgBox.setAttribute("width", canvasWidth);
  svgBox.setAttribute("height", canvasHeight);
  svgBox.setAttribute("id", "svgCanvas");
  svgBox.style.backgroundColor = canvasBackgroundColor;
  drawingArea.appendChild(svgBox);
}
createDrawingArea();
const svgCanvas = document.querySelector("#svgCanvas");

// FIXED Circle Drawing Class and Function
class Circle1 {
  constructor(name, cx, cy, r, stroke, strokewidth, fill) {
    (this.name = name),
      (this.cx = cx),
      (this.cy = cy),
      (this.r = r),
      (this.stroke = stroke),
      (this.strokewidth = strokewidth),
      (this.fill = fill);
  }

  createCircleElement(parentName) {
    const svgCircle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    svgCircle.setAttribute("id", this.name);
    svgCircle.setAttribute("cx", this.cx);
    svgCircle.setAttribute("cy", this.cy);
    svgCircle.setAttribute("r", this.r);
    svgCircle.setAttribute("stroke", this.stroke);
    svgCircle.setAttribute("stroke-width", this.strokewidth);
    svgCircle.setAttribute("fill", this.fill);
    const parent = parentName;
    parent.appendChild(svgCircle);
    console.log(`${this.name} created successfully!`);
  }
}

// Draw a circle with the mouse
const drawCircleWithMouse = function (svgCanvas) {
  let isDrawing = false;
  let startX = 0;
  let startY = 0;

  // Function to start drawing
  const startDrawing = function (event) {
    isDrawing = true;
    const { x, y } = getMousePosition(event);
    startX = x;
    startY = y;
  };

  // Function to continue drawing
  const continueDrawing = function (event) {
    if (isDrawing) {
      const { x, y } = getMousePosition(event);
      const radius = Math.sqrt(
        Math.pow(x - startX, 2) + Math.pow(y - startY, 2)
      );
      const circle = new Circle1(
        "SC1",
        startX,
        startY,
        radius,
        "black",
        2,
        "none"
      );
      circle.createCircleElement(svgCanvas);
    }
  };

  // Function to stop drawing
  const stopDrawing = function () {
    isDrawing = false;
  };

  // Event listeners
  svgCanvas.addEventListener("mousedown", startDrawing);
  svgCanvas.addEventListener("mousemove", continueDrawing);
  svgCanvas.addEventListener("mouseup", stopDrawing);
  svgCanvas.addEventListener("mouseleave", stopDrawing);
};
// drawCircleWithMouse(svgCanvas);

function paintBrushLogicRun() {
  // Drawing Lines and Paths with the mouse

  const drawOnCanvasWithPath = function (svgCanvas) {
    let isDrawing = false;
    let previousX = 0;
    let previousY = 0;

    // Function to start drawing
    const startDrawing = function (event) {
      if (eraserOff.checked) {
        brushSize = `${brushSizeElement.value}` + "px";
        isDrawing = true;
        idCount += 1;
        const NewSvgPath = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
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
        console.log(svgPath);
        svgsOnCanvas.push(svgPath);
        console.log(svgsOnCanvas);
      }
    };

    // Function to continue drawing
    const continueDrawing = function (event) {
      if (isDrawing && eraserOff.checked) {
        const svgPath = svgCanvas.lastChild;
        const { x, y } = getMousePosition(event);
        const path = svgPath.getAttribute("d") + ` L${x} ${y}`;
        svgPath.setAttribute("d", path);
        previousX = x;
        previousY = y;
      }
    };

    // Function to stop drawing
    const stopDrawing = function () {
      isDrawing = false;
    };

    // Event listeners
    svgCanvas.addEventListener("mousedown", startDrawing);
    svgCanvas.addEventListener("mousemove", continueDrawing);
    svgCanvas.addEventListener("mouseup", stopDrawing);
    svgCanvas.addEventListener("mouseleave", stopDrawing);
  };

  // Call the function and pass the SVG canvas

  if (eraserOff.checked) {
    drawOnCanvasWithPath(svgCanvas);
  }
}
paintBrushLogicRun();

function eraserLogicRun() {
  const eraseElement = function (event) {
    if (eraser.checked) {
      const targetElement = event.target;
      if (event.target != svgCanvas) {
        targetElement.remove();
        const index = svgsOnCanvas.indexOf(targetElement);
        if (index > -1) {
          svgsOnCanvas.splice(index, 1);
          console.log(`${targetElement.id} removed from svgsOnCanvas array`);
        }
      }
    }
  };

  // Event listener for eraser functionality
  svgCanvas.addEventListener("click", eraseElement);
}
eraserLogicRun();
