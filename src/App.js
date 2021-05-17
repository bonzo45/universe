import './App.css';
import {useEffect, useRef} from "react";

const unit = 4;
const canvasWidth = 1280;
const canvasHeight = 720;
const gapToBottom = unit * 10;
const gapToRight = gapToBottom;
const timelineWidth = canvasWidth - gapToRight;
const timelineHeight = unit * 4;

function drawYou(ctx) {
    const youRadius = unit * 6;
    const strokeColour = "red";
    const fillColour = "pink";
    const x = canvasWidth - gapToRight - youRadius / 2;
    const y = canvasHeight - gapToBottom - timelineHeight / 2;
    ctx.beginPath();
    ctx.strokeStyle = strokeColour;
    ctx.arc(x, y, youRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = fillColour;
    ctx.fill();
}

function drawTimeline(ctx) {
    const strokeColour = "red";
    const fillColour = "pink";
    const x = 0;
    const y = canvasHeight - gapToBottom - timelineHeight;
    ctx.rect(x, y, timelineWidth, timelineHeight)
    ctx.strokeStyle = strokeColour;
    ctx.stroke();
    ctx.fillStyle = fillColour;
    ctx.fill();
}

function drawPixel(ctx, x, y, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, 1, 1);
}

function drawPixels(ctx) {
    for (let i = 0; i < 1000; i++) {
        const x = Math.floor(Math.random() * canvasWidth);
        const y = Math.floor(Math.random() * canvasHeight);
        const lightness = Math.floor(Math.random() * 255);
        drawPixel(ctx, x, y, `rgb(${lightness} ${lightness} ${lightness}`);
    }
}

function App() {
    const canvasRef = useRef();

    // Measure the screen size to work out the number of rows, columns and size of the pokeballs.
    useEffect(() => {
        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = canvasHeight;
        canvasRef.current.style.width = canvasWidth + 'px';
        canvasRef.current.style.height = canvasHeight + 'px';
        const ctx = canvasRef.current.getContext('2d');

        drawPixels(ctx);
        drawYou(ctx);
        drawTimeline(ctx);

    }, [canvasRef])

    return (
        <div className="App">
                <canvas id="universe-canvas" ref={canvasRef} />
        </div>
    );
}

export default App;
