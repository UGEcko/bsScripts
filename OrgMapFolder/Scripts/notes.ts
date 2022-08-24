
import { notesBetween, CustomEvent} from "https://deno.land/x/remapper@2.1.0/src/mod.ts"

export function NoteMods() {
//Put all note mods in here

new CustomEvent(0).assignTrackParent(["RedNotes","BlueNotes"],"Player",true).push() // Im not even sure if this works properly



notesBetween(0,100, (note) => {
    if (note.type == 1) {
        note.noteGravity = false
        note.noteLook = false
        note.track.value = "BlueNotes"
        note.offset = 5
        note.push()
    }

    if (note.type == 0) {
        note.noteGravity = false
        note.noteLook = false
        note.track.value = "RedNotes"
        note.offset = 10
        note.push()
    }
})





} 
// Note types: 1 = blue / 0 = red




