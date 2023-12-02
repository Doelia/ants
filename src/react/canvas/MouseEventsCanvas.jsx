import {useEffect, useRef} from "react";
import {FOOD_MAX, RENDER_GRID_SIZE} from "../../engine/config.js";
import {deleteAntsOnDot, map, odor_food, odor_home} from "../../engine/engine.js";
import useCanvas from "../hooks/useCanvas.jsx";

export default function MouseEventsCanvas({brushType}) {

    const [canvasRef] = useCanvas();
    const isMouseDown = useRef();

    const pixelSize = RENDER_GRID_SIZE;

    function paintOnMap(xy) {

        if (brushType === 'null') {
            return;
        }

        const dotMap = map.project(xy);
        if (dotMap.unBreakable) {
            return;
        }

        if (brushType === 'wall') {
            dotMap.isWall = true;
            dotMap.food = 0;
            deleteAntsOnDot(dotMap);
        }

        if (brushType === 'food') {
            dotMap.food = FOOD_MAX;
            dotMap.isWall = false;
        }

        if (brushType === 'odor_food') {
            const dot = odor_food.project(xy);
            dot.qte = 2555;
        }
        if (brushType === 'odor_home') {
            const dot = odor_home.project(xy);
            dot.qte = 2555;
        }

        if (brushType === 'clear') {
            dotMap.isWall = false;
            dotMap.food = 0;

            const dotOdorHome = odor_home.project(xy);
            dotOdorHome.qte = 0;

            const dotOdorFood = odor_food.project(xy);
            dotOdorFood.qte = 0;
        }
    }

    useEffect(() => {
        function onMouseMove(e) {
            e = projectMousePositionOnCanvas(e);
            const xy = {x: e.x/pixelSize, y: e.y/pixelSize};
            if (isMouseDown.current) {
                paintOnMap(xy);
            }
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousemove', onMouseMove);
        return () => canvas.removeEventListener('mousemove', onMouseMove);
    });

    useEffect(() => {
        function onMouseDown(e) {
            e = projectMousePositionOnCanvas(e);
            const xy = {x: e.x/pixelSize, y: e.y/pixelSize};
            paintOnMap(xy);
            isMouseDown.current = true;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mousedown', onMouseDown);
        return () => canvas.removeEventListener('mousedown', onMouseDown);
    });

    useEffect(() => {
        function onMouseUp() {
            isMouseDown.current = false;
        }
        const canvas = canvasRef.current;
        canvas.addEventListener('mouseup', onMouseUp);
        return () => canvas.removeEventListener('mouseup', onMouseUp);
    });

    return (
        <canvas ref={canvasRef} id="canvas_mouse" style={{ cursor:
            brushType === 'null' ? ''
            : brushType === 'clear' ? 'no-drop'
            : 'cell'
        }}></canvas>
    )
}

function projectMousePositionOnCanvas(e) {

    const bounds = event.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    // take scale effect into account
    const scale = bounds.width / event.target.width;
    const xScaled = x / scale;
    const yScaled = y / scale;

    return {x: xScaled, y: yScaled};

}
