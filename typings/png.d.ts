declare module '*.png' {
    export interface PNG {
        image : HTMLImageElement
        x : number
        y : number
        width : number
        height : number
    }

    const v : PNG

    export default v
}
