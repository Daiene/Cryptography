document.addEventListener("DOMContentLoaded", function () {
  const magnifyingGlass = document.getElementById("magnifying-glass");
  const titleContainer = document.getElementById("title-and-magnifying-glass");
  const spans = titleContainer.querySelectorAll("h1 span");
  const titleContainerWidth = titleContainer.getBoundingClientRect().width;
  let positionX = 0;

  function measureTextWidth(text, font) {
    const canvas = measureTextWidth.canvas || (measureTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  function animateLetter(span, newText, newStyle) {
    const originalWidth = measureTextWidth(span.textContent, getComputedStyle(span).font);
    span.style.fontSize = newStyle.fontSize;
    span.style.color = newStyle.color;
    span.style.fontWeight = newStyle.fontWeight;
    span.textContent = newText;

    // Limitar a largura do texto substituto à largura do texto original
    const newWidth = measureTextWidth(newText, getComputedStyle(span).font);
    if (newWidth > originalWidth) {
      span.style.fontSize = `${parseFloat(span.style.fontSize) * (originalWidth / newWidth)}%`;
    }

    setTimeout(() => {
      span.style.fontSize = '';
      span.style.color = '';
      span.style.fontWeight = '';
      span.textContent = span.dataset.originalText;
    }, 100);
  }

  function animation() {
    if (window.screen.width >= 992) {
      positionX += 5;
      if (positionX >= titleContainerWidth - magnifyingGlass.getBoundingClientRect().width) {
        return;
      }
    } else {
      positionX += 3;
      if (positionX >= titleContainerWidth - 20) {
        magnifyingGlass.style.display = 'none';
        return;
      }
    }

    magnifyingGlass.style.left = positionX + 'px';

    spans.forEach(span => {
      const spanRect = span.getBoundingClientRect();
      const magnifyingGlassRect = magnifyingGlass.getBoundingClientRect();
      const magnifyingGlassPointX = magnifyingGlassRect.left + 35;

      if (magnifyingGlassPointX < spanRect.right && magnifyingGlassPointX > spanRect.left) {
        switch (span.textContent) {
          case 'E':
            animateLetter(span, 'ENTER', { fontSize: '100%', color: '#3ED672', fontWeight: 'bold' });
            break;
          case 'I':
            animateLetter(span, 'IMES', { fontSize: '100%', color: '#3ED672', fontWeight: 'bold' });
            break;
          case 'A':
            animateLetter(span, 'AI', { fontSize: '100%', color: '#3ED672', fontWeight: 'bold' });
            break;
          default:
            span.style.transform = 'scale(1.2)';
            break;
        }
      } else {
        span.style.transform = 'scale(1)';
      }
    });

    requestAnimationFrame(animation);
  }

  spans.forEach(span => {
    span.dataset.originalText = span.textContent;
  });

  animation();
});