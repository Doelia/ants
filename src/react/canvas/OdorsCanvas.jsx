import {ODOR_SIZE, RENDER_GRID_SIZE} from "../../engine/config.js";
import {odor_food, odor_home} from "../../engine/engine.js";
import useNextFrame from "../hooks/useNextFrame.jsx";
import useCanvas from "../hooks/useCanvas.jsx";
import {timeToProcess} from "../timeToProcess.js";

export default function OdorsCanvas({style}) {

    const [canvasRef, ctxRef] = useCanvas();

    function render() {

        if (!ctxRef.current) return;

        const now = Date.now();

        const ctx = ctxRef.current;
        const canvas = canvasRef.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        odor_home.dots.forEach(dot => {
            let r, g, b;

            const qteFood = odor_food.project(dot).qte;
            const qteHome = dot.qte;

            r = 255 - (qteHome ? 20 + qteHome/100 : 0);
            g = 255 - (qteFood ? 20 + qteFood/100 : 0);
            b = 255;

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
            ctx.fillRect(dot.x*RENDER_GRID_SIZE, dot.y*RENDER_GRID_SIZE, RENDER_GRID_SIZE * ODOR_SIZE, RENDER_GRID_SIZE * ODOR_SIZE, 2)
        });

        timeToProcess.renderOdors = Date.now() - now;

    }

    useNextFrame(render);

    return (
        <canvas id="odors_canvas" ref={canvasRef} style={style}></canvas>
    )
}
