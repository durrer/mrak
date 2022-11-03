/**
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
    return (str[0]?.toUpperCase() ?? '') + str.slice(1);
}

/**
 * @param {string[]} arr
 * @returns {{ value: string, label: string}[]}
 */
export function toSelectOptions(arr) {
    return arr.map(
        x => ({ value: x, label: x })
    );
}

