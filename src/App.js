import './App.css';
import {useEffect, useRef} from "react";
import anime from "animejs";

const unit = 4;
const canvasWidth = 1280;
const canvasHeight = 720;
const gapToBottom = unit * 10;
const gapToRight = gapToBottom;
const timelineWidth = canvasWidth - gapToRight;
const timelineHeight = unit * 4;
const youRadius = unit * 6;

function blankCanvas(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
}

function drawPixel(ctx, x, y, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, 1, 1);
}

function drawPixels(ctx) {
    for (let i = 0; i < 300; i++) {
        const x = Math.floor(Math.random() * canvasWidth);
        const y = Math.floor(Math.random() * canvasHeight);
        const lightness = Math.floor(Math.random() * 255);
        drawPixel(ctx, x, y, `rgb(${lightness} ${lightness} ${lightness}`);
    }
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

function drawYou(ctx, ballPosition) {
    const strokeColour = "red";
    const fillColour = "pink";
    ctx.beginPath();
    ctx.strokeStyle = strokeColour;
    ctx.arc(ballPosition.x, ballPosition.y, youRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = fillColour;
    ctx.fill();
}

function animateYou(ctx) {
    let ballPosition = {
        x: canvasWidth / 2,
        y: canvasHeight / 2,
    }

    function render() {
        blankCanvas(ctx);
        drawPixels(ctx);
        drawTimeline(ctx);
        drawYou(ctx, ballPosition);
    }

    anime.timeline({
        targets: ballPosition,
        loop: true,
        update: render,
        duration: 2000,
    }).add({
        keyframes: [
            {
                x: canvasWidth / 2,
                y: canvasHeight / 2,
            },
            {
                x: canvasWidth - gapToRight - youRadius / 2,
                y: canvasHeight - gapToBottom - timelineHeight / 2,
            },
        ],
        easing: 'cubicBezier(0.450, 0.010, 0.010, 1.000)',
    });
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

        animateYou(ctx);
    }, [canvasRef])

    return (
        <div className="App">
                <canvas id="universe-canvas" ref={canvasRef} />
        </div>
    );
}

export default App;
