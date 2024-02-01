htmx.onLoad(function() {

// return

function scaleContent() {
  const screenWidth = window.innerWidth;
  const contentNode = document.getElementById('main-content-wrapper')
  const contentWidth = contentNode.offsetWidth; 
  const ratio = screenWidth / contentWidth;
  contentNode.style.transform = `scale(${ratio})`;
  contentNode.style.transformOrigin = '0 0';
}

window.onresize = scaleContent();
  setTimeout(scaleContent, 100); // This delay is for webfonts. TODO: fix CLS
})