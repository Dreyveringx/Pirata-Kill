const movableElement = document.getElementById("movableElement");

document.addEventListener("mousemove", (event) => {
    const xPosition = event.clientX;
    const windowWidth = window.innerWidth;
    const elementWidth = movableElement.offsetWidth;
    const maxX = windowWidth - elementWidth;
    const newX = Math.min(maxX, Math.max(0, xPosition - elementWidth / 2));

    movableElement.style.transform = `translateX(${newX}px)`;
});
