import {useEffect, useRef} from "react";
import {GRID_HEIGHT, GRID_WIDTH, RENDER_GRID_SIZE} from "../../engine/config.js";

export default function useCanvas() {

    const ctxRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {

        if (!canvasRef) return;
        const canvas = canvasRef.current;

        canvas.width = GRID_WIDTH * RENDER_GRID_SIZE;
        canvas.height = GRID_HEIGHT * RENDER_GRID_SIZE;

        ctxRef.current = canvas.getContext("2d");

    }, [canvasRef]);

    return [canvasRef, ctxRef];

}
