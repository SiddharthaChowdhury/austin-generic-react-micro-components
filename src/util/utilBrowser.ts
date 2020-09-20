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

export function adjustColor (color: string, amount: number) {
    /*
        color: '#ColHex'
        amount: -255 <- 0 -> 255
            Where: 
                value: 0    - is the exact color
                value -255  - is the darkest of the color (ie black)
                value 255   - is the lightest of the color (ie white)
            Hint: play between -200 and 200
    */
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}