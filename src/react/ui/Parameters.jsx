import {useEffect, useState} from "react";
import ParameterSlider from "./ParametersSlider.jsx";
import {parameters} from "../../engine/parameters.js";

function useParameter(key, defaultValue, fn) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        parameters[key] = fn(value);
    }, [value]);

    return [value, setValue];
}

export default function Parameters() {

    const [population, setPopulation] = useParameter('n_ants_intended', 100,
        input => input
    );

    const [ant_forward_speed, setAntForwardSpeed] = useParameter('ant_forward_speed', 5,
        input => input/100
    );

    const [odor_evaporate_rate, set_odor_evaporate_rate] = useParameter('odor_evaporate_rate', 90,
        input => 1 - 1 / Math.pow(100 - input, 2)
    );

    const [odor_ant_stock, set_odor_ant_stock] = useParameter('odor_ant_stock', 5,
        input => Math.pow(10, input)
    );

    return (
        <table className="progress-bars">
            <tbody>
            <tr>
                <td> Population </td>
                <td className="value">{population}</td>
                <td> <ParameterSlider min={1} max={1000} defaultValue={100} value={population} setValue={setPopulation} /> </td>
            </tr>
            <tr>
                <td>Ant speed</td>
                <td className="value" style={{textAlign: 'right'}}>
                    {ant_forward_speed} / tick
                </td>
                <td>
                    <ParameterSlider title="Ant movement speed" min={0} max={20} defaultValue={5} value={ant_forward_speed} setValue={setAntForwardSpeed} />
                </td>
            </tr>
            <tr>
                <td>Odor evaporation</td>
                <td className="value">{odor_evaporate_rate}%</td>
                <td>
                    <ParameterSlider title="Odor evaporation" min={0} max={99} defaultValue={90} value={odor_evaporate_rate} setValue={set_odor_evaporate_rate} />
                </td>
            </tr>
            <tr>
                <td>Ant odor stock</td>
                <td className="value">{odor_ant_stock}</td>
                <td>
                    <ParameterSlider title="Ant odor stock" min={0} max={10} defaultValue={5} value={odor_ant_stock} setValue={set_odor_ant_stock} />
                </td>
            </tr>
            </tbody>
        </table>
    )

}
