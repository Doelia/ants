import {useEffect, useRef} from "react";
import useForceRender from "./useForceRender";

export default function useRenderLoop() {

    const forceRender = useForceRender();
    const requestRef = useRef();

    function render() {
        forceRender();
        requestRef.current = requestAnimationFrame(render);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(render);
        return () => { cancelAnimationFrame(requestRef.current) };
    }, []);

}
