import { Vec2, Vec3, arrMul, arrAdd, Geometry } from "https://deno.land/x/remapper@3.1.2/src/mod.ts"
import { arrRound } from "https://raw.githubusercontent.com/UGEcko/bsScripts/a9dae46b21e2eb5bc75fcd6a6923351495eb2713/ReMapper/Functions/arrRound.ts"
export type axis = "X" | "Y" | "Z"
function filterAndExtractRandom(datFilePath: string, filterSubstring: string): SceneObject | undefined {
    try {
      const jsonData = JSON.parse(Deno.readTextFileSync(datFilePath))
      const objects: SceneObject[] = jsonData.objects
      const spawnerObjects = objects.filter(obj => obj.track === filterSubstring)
  
      if (spawnerObjects.length > 0) {
        const randomIndex = Math.floor(Math.random() * spawnerObjects.length)
        const randomSpawnerObject = spawnerObjects[randomIndex]
        const { pos, rot, scale, track } = randomSpawnerObject
        return { pos, rot, scale, track }
      } else {
        console.log('No objects with "spawner" track found.')
      }
    } catch (error) {
      console.error('Error reading or parsing JSON data:', error)
    }
    return undefined
  }
function calculateScaleOffset(baseScale: Vec3, offsetScale: Vec3, axisTarget: axis) {
  // calc scale
const objScale = arrAdd(baseScale, offsetScale)

  // Return proper axis offset
  if(axisTarget == "X") {
    return objScale[0]
  } else if(axisTarget == "Y") {
    return objScale[1]
  } else if(axisTarget == "Z") {
    return objScale[2]
  }
}
// The real sauce
export function morphEnvNote(startEnd: Vec2, NoteEnvTrack: string[], filePath: string) {
    // Set all constants
    const start = startEnd[0]
    const end = startEnd[1]
    const noteTrack = NoteEnvTrack[0]
    const envTrack = NoteEnvTrack[1]
    const envPos = filterAndExtractRandom(filePath, envTrack) // Goated func
    const xyzPos:Vec3 = envPos?.pos
    const xyzRot:Vec3 = envPos?.rot
    const xyzScale:Vec3 = envPos?.scale

    const position = arrMul(xyzPos, 1) // Multiply position of geo cube
    const localRotation = arrMul(xyzRot, 1) // Multiply rotation of geo cube
    const scale = arrMul(xyzScale, 5) // Multiply scale of geo cube
    const a = new Geometry("Cube")
    const scaleOff = calculateScaleOffset(xyzScale, scale, "Y") // Change "Y" to other axis for diff. scaling
    a.position = [position[0], position[1]+scaleOff/2, position[2]] // Idk how I figured out the "equation" for stacking different-scaled objects on top of each other so quickly
    a.localRotation = localRotation
    a.scale = scale
    a.push()
}
