// Make the DIV element draggable:
const dragElementOne = function() {
  window.onload = function () {
    var title = document.getElementById('dragTitle');
    var draggable = document.getElementById('draggable');

    title.addEventListener('mousedown', function (e) {
      var offsetX = draggable.offsetLeft - e.clientX;
      var offsetY = draggable.offsetTop - e.clientY;

      function mouseMoveHandler(e) {
        draggable.style.left = e.clientX + offsetX + 'px';
        draggable.style.top = e.clientY + offsetY + 'px';
      }

      function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      }

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  };
};

export { dragElementOne };



