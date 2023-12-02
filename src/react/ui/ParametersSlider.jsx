import {useId} from "react";

export default function ParameterSlider({min, max, defaultValue, value, setValue, disabled=false}) {

    const id = useId();

    return (
        <div style={{display: 'flex'}}>
            <input disabled={disabled} className="me-3" type="range" min={min} max={max} value={value} id={id} onChange={(e) => setValue(e.target.value)} />
            { defaultValue && <button disabled={value === defaultValue} className={'small'} onClick={() => setValue(defaultValue)}>
                <i className="fa-solid fa-i-cursor me-0"></i>
            </button> }
        </div>
    )

}
