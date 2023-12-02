import {tick} from "../../engine/engine.js";
import useNextFrame from "../hooks/useNextFrame.jsx";
import useForceRender from "../hooks/useForceRender.js";
import {timeToProcess} from "../timeToProcess.js";

export default function Debug({isTicking, setIsTicking}) {

    const forceRender = useForceRender();
    useNextFrame(forceRender);

    return (
        <div>
            <div style={{display: 'flex'}}>
                <button onClick={() => setIsTicking(!isTicking)}>{isTicking ? 'Stop' : 'Start'}</button>
                <button onClick={() => tick()}>tick</button>
            </div>
            <div>
                <div> Game tick: {timeToProcess.gameTick}ms </div>
                <div> Render map: {timeToProcess.renderMap}ms </div>
                <div> Render ants: {timeToProcess.renderAnts}ms </div>
                <div> Render odors: {timeToProcess.renderOdors}ms </div>
            </div>
        </div>
    )
}
