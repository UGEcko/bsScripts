import { Difficulty } from "https://deno.land/x/remapper@2.1.0/src/mod.ts"
import * as NoteMods from './Scripts/notes.ts/'
import * as EnvMods from './Scripts/env.ts/'
import * as WallMods from './Scripts/walls.ts/'
import * as MiscScript from './Scripts/misc.ts/'
import * as PlayerMods from './Scripts/player.ts/'

const map = new Difficulty("input.dat","output.dat");

Notemods.NoteMods()
EnvMods.Env()
WallMods.WallMods()
MiscScript.MiscScripts()
PlayerMods.playerMods()


    const notRelease = true // if you want... If notRelease = false it will exportZip with the proper files.

if (!notRelease) {
    exportZip()
}
map.save
