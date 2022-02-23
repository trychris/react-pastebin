//Not used
export function camelCaseToSentence(text) {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}

//Not used
export function arrayIntersection(array1, array2) {
    return array1.filter(value => array2.includes(value));
}

export function settle(arr) {
    return Promise.all(arr.map(promise =>
        promise.then(
            value => ({state: 'fullfilled', value}),
            value => ({state: 'rejected', value})
        )
    ))
}