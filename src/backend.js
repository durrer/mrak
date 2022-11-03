/** @type {Record<string, (...a: any) => Promise>} */
export const backend = new Proxy(google.script.run, {
    get (runner, fn) {
        return (...args) => new Promise((res, rej) => {
            runner
                .withSuccessHandler(res)
                .withFailureHandler(rej)
                [fn](...args);
        });
    }
});

