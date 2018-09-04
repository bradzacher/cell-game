declare module 'rollup-pluginutils' {
    export function addExtension(name : string, ext ?: string) : string

    interface Scope {
        addDeclaration(node : any, isBlockDeclaration : boolean, isVar : boolean) : void
        contains(id : string) : boolean
    }
    export function attachScopes(ast : any, name : string) : Scope

    export function createFilter(include ?: string | string[], exclude ?: string | string[]) : (id : string) => boolean

    interface DataToEsmOptions {
        compact ?: boolean
        indent ?: string
        preferConst ?: boolean
        objectShorthand ?: boolean
        namedExports ?: boolean
    }
    export function dataToEsm(data : Record<string, any>, options : DataToEsmOptions) : string

    export function makeLegalIdentifier(name : string) : string
}
