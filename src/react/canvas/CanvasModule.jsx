import MapCanvas from "./MapCanvas.jsx";
import AntsCanvas from "./AntsCanvas.jsx";
import OdorsCanvas from "./OdorsCanvas.jsx";
import MouseEventsCanvas from "./MouseEventsCanvas.jsx";
import {useLayers} from "../LayersContext.jsx";
import {parameters} from "../../engine/parameters.js";

export default function CanvasModule({brushType, style}) {

    const layers = useLayers();

    return (
        <div style={style} className="canvas_container">
            { layers.find(v => v.id === 'odors' && v.visible) &&
                <OdorsCanvas style={{opacity: layers.find(v => v.id === 'odors').opacity }} />
            }
            { layers.find(v => v.id === 'map' && v.visible) &&
                <MapCanvas showVision={parameters.showVision} style={{opacity: layers.find(v => v.id === 'map').opacity }} />
            }
            { layers.find(v => v.id === 'ants' && v.visible) &&
                <AntsCanvas style={{opacity: layers.find(v => v.id === 'ants').opacity }} />
            }
            <MouseEventsCanvas brushType={brushType} />
        </div>
    )
}
