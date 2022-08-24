import { Environment} from "https://deno.land/x/remapper@2.1.0/src/mod.ts"; //
export function Env() { // Dont Delete this function


// I was even kind enough to add the most non-efficient functions known to man.
function removeenvpiece(ids: string[], regex = false) {
    const envrem = new Environment(undefined, regex ? "Regex" : undefined);
    envrem.active = false
    ids.forEach( x => {
        envrem.id = x;
        envrem.push()
    })
}
function moveEnv(ids: string[], regex = false, posx: number, posy: number, posz: number) {
    const envMove = new Environment(undefined, regex ? "Regex" : undefined)
    envMove.position = [posx, posy, posz]
    ids.forEach( x => {
        envMove.id = x
        envMove.push()
    })
}




} //! Dont Delete this Bracket
