import {useRef} from "react";
import {RENDER_GRID_SIZE} from "../../engine/config.js";
import {ants} from "../../engine/engine.js";
import useNextFrame from "../hooks/useNextFrame.jsx";
import {toRadians} from "../../engine/functions/trigo.js";
import useCanvas from "../hooks/useCanvas.jsx";
import {timeToProcess} from "../timeToProcess.js";

export default function AntsCanvas({style}) {

    const [canvasRef, ctxRef] = useCanvas();

    const ant_red = useRef(null);
    const ant_black = useRef(null);

    function render() {

        if (!ctxRef.current) return;
        if (!ant_red.current || !ant_black.current) return;

        const now = Date.now();

        const ctx = ctxRef.current;
        const canvas = canvasRef.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let t of ants.current) {
            rotateAndPaintImage(ctx, t.myFood > 0 ?ant_red.current : ant_black.current, toRadians(t.angle), t.x*RENDER_GRID_SIZE, t.y * RENDER_GRID_SIZE, 8, 8);
        }

        timeToProcess.renderAnts = Date.now() - now;

    }

    useNextFrame(render);

    return (
        <>
            <div className="assets" style={{display: "none"}}>
                <img ref={ant_black} src="/ant_black.png" style={{display: 'none'}} alt=""/>
                <img ref={ant_red} src="/ant_red.png" style={{display: 'none'}} alt=""/>
            </div>
            <canvas id="ants_canvas" ref={canvasRef} style={style}></canvas>
        </>
    )
}

function rotateAndPaintImage(context, image, angleInRad, positionX, positionY, width, height) {
    context.translate(positionX, positionY);
    context.rotate( angleInRad);
    context.drawImage( image, -width/2, -height/2, width, height);
    context.rotate(-angleInRad);
    context.translate(-positionX, -positionY);
}

