import {useLayers, useLayersDispatch} from "../LayersContext.jsx";
import ParameterSlider from "./ParametersSlider.jsx";
import {useEffect, useState} from "react";


function Layer({layer}) {

    const [opacity, setOpacity] = useState(layer.defaultOpacity * 100);

    const dispatch = useLayersDispatch();

    useEffect(() => {
        dispatch({
            type: 'opacity',
            id: layer.id,
            opacity: opacity / 100
        })
    }, [opacity]);

    return (
        <div style={{display: 'flex', alignContent: 'center', marginBottom: 6, opacity: layer.visible ? 1 : .5 }}>
            <div style={{width: '100px', display: 'flex', alignContent: 'center' }}>
                <input type={'checkbox'} checked={layer.visible} onChange={() => dispatch({type: 'toggle', id: layer.id})} style={{width: 16, height: 16}} id={layer.id}/>
                <label htmlFor={layer.id} style={{marginLeft: 6 }}>{layer.id}</label>
            </div>
            <div style={{}}>
                <ParameterSlider disabled={!layer.visible} min={0} max={100} value={opacity} setValue={setOpacity} />
            </div>
        </div>
    )
}

export default function Layers({}) {

    const layers = useLayers();

    return (
        <div>
            { layers.map(layer => <Layer key={layer.id} layer={layer} /> )}
        </div>
    )

}
