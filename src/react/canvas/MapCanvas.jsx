import {useRef} from "react";
import {FOOD_MAX, RENDER_GRID_SIZE} from "../../engine/config.js";
import {ants, map} from "../../engine/engine.js";
import useNextFrame from "../hooks/useNextFrame.jsx";
import useCanvas from "../hooks/useCanvas.jsx";
import {timeToProcess} from "../timeToProcess.js";

function useImages() {

    const melon = useRef(null);
    const fraise = useRef(null);
    const citron = useRef(null);
    const home = useRef(null);

    return {
        assets: (
            <div className="assets" style={{display: "none"}}>
                <img ref={melon} src="/fruits/melon.png" alt=""/>
                <img ref={fraise} src="/fruits/fraise.png" alt=""/>
                <img ref={citron} src="/fruits/citron.png" alt=""/>
                <img ref={home} src="/house.png" alt=""/>
            </div>
        ),
        foodToImage: (dot) => {
            switch (((dot.x*dot.y)) % 3) {
                case 0: return fraise.current;
                case 1: return citron.current;
                default: return melon.current;
            }
        },
        home: () => {
            return home.current;
        }
    }
}

export default function MapCanvas({showVision, style}) {

    const [canvasRef, ctxRef] = useCanvas();

    const {assets, foodToImage, home} = useImages();

    const pixelSize = RENDER_GRID_SIZE;

    function render() {

        if (!ctxRef.current) return;

        const now = Date.now();

        const ctx = ctxRef.current;
        const canvas = canvasRef.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dots
        map.dots.forEach(dot => {

            if (dot.isHome) {
                ctx.beginPath();
                ctx.fillStyle = `rgb(0, 255, 255, .2)`
                ctx.roundRect(dot.x*pixelSize, dot.y*pixelSize, pixelSize, pixelSize, 20)
                ctx.fill();

                const img = home();
                ctx.drawImage(img, dot.x*RENDER_GRID_SIZE, dot.y * RENDER_GRID_SIZE, pixelSize, pixelSize);
            }
            else if (dot.food > 0) {
                ctx.beginPath();
                ctx.fillStyle = `rgb(255, 0, 255, .2)`
                ctx.roundRect(dot.x*pixelSize, dot.y*pixelSize, pixelSize, pixelSize, 20)
                ctx.fill();

                const img = foodToImage(dot);
                ctx.drawImage(img, dot.x*RENDER_GRID_SIZE, dot.y * RENDER_GRID_SIZE, pixelSize, pixelSize);

            } else {
                let r = null, g, b, radius = 0;
                if (dot.food > 0) {
                    r = 255; g = 0; b = 255;
                    radius = 5;
                }
                else if (dot.isHome > 0) {
                    r = 0; g = 255; b = 255;
                    radius = 5;
                }
                else if (dot.isWall > 0) {
                    r = 30; g = 30; b = 30;
                    radius = 5;
                }
                if (r !== null) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
                    ctx.roundRect(dot.x*pixelSize, dot.y*pixelSize, pixelSize, pixelSize, radius)
                    ctx.fill();
                }
            }

        });

        // Progress bar food
        map.dots.filter(dot => dot.food > 0).forEach(dot => {

            ctx.beginPath();
            ctx.fillStyle = `rgb(255, 255, 255, 1)`
            ctx.roundRect(dot.x*pixelSize+4, (dot.y+1)*pixelSize - (pixelSize/10) - 3, pixelSize - 8, pixelSize / 10, 100)
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = `rgb(255, 0, 255, .5)`
            ctx.strokeStyle = `rgb(255, 0, 255, .5)`
            ctx.roundRect(dot.x*pixelSize+4, (dot.y+1)*pixelSize - (pixelSize/10) - 3, (pixelSize-8) * dot.food / FOOD_MAX, pixelSize / 10, 100)
            ctx.fill();
            ctx.stroke();

        });

        // Grille
        map.dots.forEach(dot => {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200, 200, 200, 0.1)`
            ctx.roundRect(dot.x*pixelSize, dot.y*pixelSize, pixelSize, pixelSize, 10)
            ctx.stroke();
        });

        if (showVision && ants.current.length <= 30) {
            ctx.beginPath();
            for (let ant of ants.current) {
                ant.getVision(map)
                    .forEach(dot => {
                        ctx.fillStyle = `green`;
                        const dotOnMap = map.project(dot);
                        ctx.rect(dotOnMap.x*pixelSize, dotOnMap.y*pixelSize, pixelSize, pixelSize)
                        ctx.fillRect(dotOnMap.x*pixelSize, dotOnMap.y*pixelSize, pixelSize, pixelSize)
                    });
            }
            ctx.stroke();
        }

        timeToProcess.renderMap = Date.now() - now;
    }

    useNextFrame(render);


    return (
        <>
            {assets}
            <canvas id="map_canvas" ref={canvasRef} style={style}></canvas>
        </>
    )
}
