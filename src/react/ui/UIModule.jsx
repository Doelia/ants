import BrushSelection from "./BrushSelection.jsx";
import Parameters from "./Parameters.jsx";
import Layers from "./Layers.jsx";
import Debug from "./Debug.jsx";
import RemoveOdorsButton from "./RemoveOdorsButton.jsx";

export default function UIModule({setBrushType, brushType, isTicking, setIsTicking, debugMode, setDebugMode}) {

    return (
        <div className="ui_container">

            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h1>Ant simulator</h1>
                    <a href="https://github.com/Doelia/ants" className="small button" style={{marginBottom: 0}}>
                        <i className="fa-brands fa-github me-2"></i>
                        github
                    </a>
                </div>

                <h2><i className="fa-solid fa-brush me-2"></i> Map edition</h2>
                <div>
                    <BrushSelection setBrushType={setBrushType} brushType={brushType}/>
                </div>
                <div style={{marginTop: '10px'}}>
                    <RemoveOdorsButton />
                </div>

                <h2><i className="fa-solid fa-gear me-2"></i> Parameters</h2>
                <Parameters/>

                <h2><i className="fa-solid fa-layer-group me-2"></i> Layers</h2>
                <Layers/>

                { debugMode && <>
                    <h2><i className="fa-solid fa-bug me-2"></i> Debug</h2>
                    <Debug setIsTicking={setIsTicking} isTicking={isTicking} />
                </> }
            </div>

            <div style={{borderTop: '1px solid #cccccc', paddingTop: 10}}>
                <div style={{fontSize: 12, opacity: .75, display: 'flex', justifyContent: 'space-between'}}>
                    <span>
                        © 2023 <a href="https://stephanewouters.fr">Stéphane Wouters</a>
                    </span>
                    <span style={{cursor: 'pointer', opacity: debugMode ? 1 : .5}} onClick={() => setDebugMode(old => !old)}>
                        <i className={'fa-solid me-2 fa-toggle-' + (debugMode ? 'on' : 'off')}></i>
                        Debug mode
                    </span>
                </div>
            </div>
        </div>
    )
}
