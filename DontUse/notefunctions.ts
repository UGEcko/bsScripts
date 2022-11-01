// deno-lint-ignore-file no-explicit-any
import { Difficulty, CustomEvent, Note, notesBetween, rand, EASE } from "https://deno.land/x/remapper@2.1.0/src/mod.ts"

// Types for presets
export type effectsTypes = "Notes" | "Bombs" | "Both"

export function streamFX(start: number, end: number, offset: number, beatOffset: any, ease?: EASE) {

        const startbeat = start + beatOffset
        const endbeat = end + beatOffset
    
        notesBetween(startbeat, endbeat, x=> {
            if (x.type == 0) {
                x.offset = offset
                x.animate.position = [[-1.8,-2.3,0,0],[0,0,0,0.25, ease]]
            }
            if (x.type == 1) {
                x.offset = offset
                x.animate.position = [[1.8,2.3,0,0],[0,0,0,0.25, ease]]
            }
        })
    }


export function dropFX(start: number, end: number, offset: number, beatOffset: any, types: effectsTypes,  ease?: EASE) {
// The types parameter already contains a "preset." If you wish to change the behavior of the effect, change them here, not in the script
    const startbeat = start + beatOffset
    const endbeat = end + beatOffset

    if (types == "Notes") {
        notesBetween(startbeat, endbeat, x=> {
            if (x.type == 0) { // 0 = Red
                x.offset = offset
                x.animate.scale = [[6.9,6.9,6.9,0],[1,1,1,0.25, ease]]
                x.animate.dissolve = [[0,0],[1,0.1]]
                x.animate.rotation = [[rand(-5,-45),rand(-45,0),rand(-45,0),0],[0,0,0,0.25, ease]]
                x.animate.localRotation = [[rand(0,360),rand(0,360),rand(0,360),0], [0,0,0,0.4, ease]]
            }
            if (x.type == 1) { // 1 = Blue
                x.offset = offset
                x.animate.scale = [[6.9,6.9,6.9,0],[1,1,1,0.25, ease]]
                x.animate.dissolve = [[0,0],[1,0.1]]
                x.animate.rotation = [[rand(-5,-45),rand(0,45),rand(0,45),0],[0,0,0,0.25, ease]]
                x.animate.localRotation = [[rand(0,360),rand(0,360),rand(0,360),0], [0,0,0,0.4, ease]]
            }
        })
    } else if(types == "Bombs") {
        notesBetween(startbeat, endbeat, x=> {
            if (x.type == 3) { // 3 = Bomb
                x.offset = offset
                x.animate.scale = [[6.9,6.9,6.9,0],[1,1,1,0.25, ease]]
                x.animate.dissolve = [[0,0],[1,0.1]]
                x.animate.rotation = [[rand(-5,-45),rand(-45,0),rand(-45,0),0],[0,0,0,0.25, ease]]
                x.animate.localRotation = [[rand(0,360),rand(0,360),rand(0,360),0], [0,0,0,0.4, ease]]
            }
        })
    } else if(types == "Both") {

        notesBetween(startbeat, endbeat, x=> {
            if (x.type == 0) { // 0 = Red
                x.offset = offset
                x.animate.scale = [[6.9,6.9,6.9,0],[1,1,1,0.25, ease]]
                x.animate.dissolve = [[0,0],[1,0.1]]
                x.animate.rotation = [[rand(-5,-45),rand(-45,0),rand(-45,0),0],[0,0,0,0.25, ease]]
                x.animate.localRotation = [[rand(0,360),rand(0,360),rand(0,360),0], [0,0,0,0.4, ease]]
            }
            if (x.type == 1) { // 1 = Blue
                x.offset = offset
                x.animate.scale = [[6.9,6.9,6.9,0],[1,1,1,0.25, ease]]
                x.animate.dissolve = [[0,0],[1,0.1]]
                x.animate.rotation = [[rand(-5,-45),rand(0,45),rand(0,45),0],[0,0,0,0.25, ease]]
                x.animate.localRotation = [[rand(0,360),rand(0,360),rand(0,360),0], [0,0,0,0.4, ease]]
            }
            if (x.type == 3) { // 3 = Bomb
                x.offset = offset
                x.animate.scale = [[6.9,6.9,6.9,0],[1,1,1,0.25, ease]]
                x.animate.dissolve = [[0,0],[1,0.1]]
                x.animate.rotation = [[rand(-5,-45),rand(-45,0),rand(-45,0),0],[0,0,0,0.25, ease]]
                x.animate.localRotation = [[rand(0,360),rand(0,360),rand(0,360),0], [0,0,0,0.4, ease]]
            }
            
        })

    }



    // Personal Settings:
    // Offset: 1
    // Ease: "easeOutQuad"
}


    

    
