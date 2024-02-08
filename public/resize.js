htmx.onLoad(function() {

// return

function scaleContent() {
  
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const contentNode = document.getElementById('main-content-wrapper')
  const contentWidth = contentNode.offsetWidth; 
  const contentHeight = contentNode.offsetHeight; 
  let ratio = screenWidth / contentWidth;
  if (ratio * contentHeight > screenHeight) {
    ratio = screenHeight / contentHeight;
  }
  contentNode.style.transform = `scale(${ratio})`;
  contentNode.style.transformOrigin = 'top';
}

window.addEventListener("resize", scaleContent)
screen.orientation.addEventListener("change", scaleContent)

setTimeout(scaleContent, 100); // This delay is for webfonts. TODO: fix CLS
})
