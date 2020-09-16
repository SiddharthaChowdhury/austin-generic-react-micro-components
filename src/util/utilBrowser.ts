export function debounce (fn: any, delay: number) {
    let timeoutID: any = null
    return function () {
        clearTimeout(timeoutID)
        const args = arguments;
        // @ts-ignore
        const that: any = this;
        timeoutID = setTimeout(function () {
            fn.apply(that, args)
        }, delay)
    }
}
