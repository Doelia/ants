import {useEffect, useRef} from "react";

export default function useNextFrame(fn) {

    const requestRef = useRef();

    function render() {
        fn();
        requestRef.current = requestAnimationFrame(render);
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(render);
        return () => { cancelAnimationFrame(requestRef.current) };
    }, []);

}
