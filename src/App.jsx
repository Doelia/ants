import {useEffect, useState} from "react";
import {map, tick} from "./engine/engine.js";
import CanvasModule from "./react/canvas/CanvasModule.jsx";
import UIModule from "./react/ui/UIModule.jsx";
import {LayersProvider} from "./react/LayersContext.jsx";
import {timeToProcess} from "./react/timeToProcess.js";

export default function App() {

    const [brushType, setBrushType] = useState('null');
    const [isTicking, setIsTicking] = useState(true);
    const [debugMode, setDebugMode] = useState(false);

    useEffect(() => {
        if (map.dots.length == 0) {
            map.buildMap();
        }
        if (isTicking) {
            let i = setInterval(() => {
                let now = Date.now();
                tick();
                timeToProcess.gameTick = Date.now() - now;
            }, 1000/60);
            return () => clearInterval(i);
        }
    }, [isTicking]);

    return (
        <>
            <LayersProvider>
                <div className="global_container">
                    <CanvasModule brushType={brushType} />
                    <UIModule setBrushType={setBrushType} brushType={brushType} isTicking={isTicking} setIsTicking={setIsTicking} setDebugMode={setDebugMode} debugMode={debugMode}/>
                </div>
            </LayersProvider>
        </>
    )
}

