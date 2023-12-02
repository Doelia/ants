import {createContext, useContext, useReducer} from 'react';

const initialLayers = [
    { id: 'ants', visible: true, opacity: 1, defaultOpacity: 1 },
    { id: 'odors', visible: true, opacity: .5, defaultOpacity: .4 },
    { id: 'map', visible: true, opacity: 1, defaultOpacity: 1 },
];

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

export function LayersProvider({ children }) {
    const [layers, dispatch] = useReducer(
        tasksReducer,
        initialLayers
    );

    return (
        <TasksContext.Provider value={layers}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

export function useLayers() {
    return useContext(TasksContext);
}

export function useLayersDispatch() {
    return useContext(TasksDispatchContext);
}

function tasksReducer(layers, action) {
    switch (action.type) {
        case 'toggle': {
            return layers.map(l => {
                if (l.id === action.id) {
                    return {
                        ...l,
                        visible: !l.visible,
                    };
                } else {
                    return l;
                }
            });
        }
        case 'opacity': {
            return layers.map(l => {
                if (l.id === action.id) {
                    return {
                        ...l,
                        opacity: action.opacity,
                    };
                } else {
                    return l;
                }
            });
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

