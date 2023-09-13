// Honestly I forgot all of the imports
function filterAndExtractRandom(datFilePath: string, filterSubstring: string): SceneObject | undefined {
    try {
      // Read the JSON file
      const jsonData = JSON.parse(Deno.readTextFileSync(datFilePath))
      const objects: SceneObject[] = jsonData.objects
  
      // Filter objects with the "spawner" track
      const spawnerObjects = objects.filter(obj => obj.track === filterSubstring)
  
      if (spawnerObjects.length > 0) {
        // Randomly select one object from the filtered list
        const randomIndex = Math.floor(Math.random() * spawnerObjects.length)
        const randomSpawnerObject = spawnerObjects[randomIndex]
  
        // Extract and return the position, rotation, and scale
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


  export function roundArray(arr: number[], decimalPlaces: number): any[] { // That objectToTrack 
    return arr.map((x: any) => {
      if (Array.isArray(x)) {
        return roundArray(x, decimalPlaces)
      } else if (typeof x === 'number') {
        return Number(x.toFixed(decimalPlaces))
      } else {
        return x
      }
    });
  }
// Morph Function: Animate incoming notes that have a specific track to spawn and morph from random blender environment cubes 
// Start with spawning, and animation, then move on to fx like dissolving, or scaling, aswell as smoothing anim.

// Using: notesBetween , 
export function morphEnvNote(startEnd: Vec2, NoteEnvTrack: string[], filePath: string) {
    // Set all constants
    const start = startEnd[0]
    const end = startEnd[1]
    const noteTrack = NoteEnvTrack[0]
    const envTrack = NoteEnvTrack[1]

const scalar = 1.65
    notesBetween(start,end, x => {
        x.interactable = false
        x.noteGravity = false
        x.spawnEffect = false
        x.noteLook = false
        x.x = 1
        x.y = 0
        if(x.track.value == noteTrack) {
          const envPos = filterAndExtractRandom(filePath, envTrack)
          const xyzPos:number[] = envPos?.pos
          const xyzRot:number[] = envPos?.rot
          const xyzScale:number[] = envPos?.scale
          
            if (envPos) {
                x.animate.position = [[xyzPos[0]*scalar,xyzPos[1]*scalar,xyzPos[2]*scalar,0],[0,0,0,0.35,"easeInOutExpo"]]// assuming note scale is [1,1,1]
                x.animate.localRotation = [[xyzRot[0],xyzRot[1],xyzRot[2],0], [0,0,0,0.35, "easeInOutExpo"]]
              }
            else {
              console.error(`Position/Rot/Scale not found or applied correctly`)
            }
        }
    })

}

//! Notes
/* I kinda gave up on this because of beatsaber and blender positioning differences. It still works, just the positioning is really scuffed, 
the scalar constant is the closest ive gotten to the actual position before just giving up. Feel free to pr idc 

The original idea was to get the proper positions, and scale of both the env object and note so the note sits perfectly on top of the env piece. Why? I was bored asf and at 3am it sounded cool. */
