import { useState } from "react";

/**
 * @param {() => Promise} createPromise
 * @returns {[any, boolean]}
 */
export function useAsync(createPromise) {
    const [state, setState] = useState({ primed: false, settled: false, result: undefined });
    
    if (!state.primed) {
        createPromise().then(v => setState({
            primed: true,
            settled: true,
            result: v
        }));

        setState({
            primed: true,
            settled: false,
            result: undefined,
        });
    }

    return [state.result, state.settled];
}

