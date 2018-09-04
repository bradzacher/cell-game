declare module 'spritesmith' {
    interface ConstructorParams {
        engine ?: string
        engineOpts ?: any
    }
    interface RunParams extends ConstructorParams {
        src : string[]
    }
    interface ProcessImagesParams {
        padding ?: number
        exportOpts ?: any
        algorithm ?: string
        algorithmOpts ?: any
    }

    interface ProcessImagesReturn {
        image : ReadableStream
        coordinates : Record<string, {
            x : number
            y : number
            width : number
            height : number
        }>
        properties : {
            width : number
            height : number
        }
    }
    type RunResult = Pick<ProcessImagesReturn, Exclude<keyof ProcessImagesReturn, 'image'>> & {
        image : Buffer
    }

    export class Spritesmith {
        public static run(params : RunParams, callback : (err : Error | null, result : RunResult) => void) : void

        public constructor(params ?: ConstructorParams)

        public createImages(src : string[], callback : (err : Error | null, images : any) => void) : void
        public processImages(images : any, params : ProcessImagesParams) : ProcessImagesReturn
    }
}
