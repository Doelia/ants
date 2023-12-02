import {useRef, useState} from "react";
import {odor_food, odor_home} from "../../engine/engine.js";
import {parameters} from "../../engine/parameters.js";

export default function RemoveOdorsButton() {

    const [removingOdors, setRemovingOdors] = useState(false);
    const intervalRef = useRef(null);

    function removeOdors() {
        odor_food.dots.forEach(dot => dot.qte = 0);
        odor_home.dots.forEach(dot => dot.qte = 0);

        parameters.odor_enabled = false;
        setRemovingOdors(true);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            parameters.odor_enabled = true;
            setRemovingOdors(false);
        }, 3000);
    }

    return (
        <button onClick={removeOdors} disabled={removingOdors}>
            { removingOdors && <i className="fa-solid fa-spinner fa-spin"></i>}
            { !removingOdors && <i className="fa-solid fa-trash"></i>}
            { removingOdors ? 'Cleanup odors...' : 'Remove all odors'}
        </button>
    )
}
