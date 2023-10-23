import
{ 
Environment,
CustomEvent,
ENV,
Vec3,
rotatePoint,
EASE
} 
from "https://deno.land/x/remapper@3.1.2/src/mod.ts"

// I made this to make lighting creation a little easier for myself, I figured I could just post it to help others aswell

// The way I made it is kinda wacky because most of it is lighting and a class (both things I never really work with),
// however it does work, and gives you helpful info in the log to make sure everything works properly


/*
Usage example: 

// CENTER SUN ID 30
const e = new registerLightGroup([0,2.5,50],1)
e.emitterType = "Sun"
e.rotation = [0,0,0]
e.localRotation = [-90,0,0]
e.lightID = 30
e.lightType = 1
e.track = "SunLight"
e.push()

// ROTATING BLOOM LIGHTS ID 40-49
e.position = [0,2.5,50]
e.localRotation = [-55,0,0]
e.rotation = [0,0,90]
e.scale = [10,10,10]
e.emitterType = "Bloom"
e.lightID = 40
e.amount = 10
e.isCirc = true
e.track = "BloomLights"
e.push()

*/

/*

All I could say is mess around with it, isCirc is sort of like a circular multiple lights thing, like how swifter used for the 2nd to last scene in SomewhereOutThere with bloomLights

*/

export type BTSLight = "Sun" | "Bloom" | "Laser"
export class registerLightGroup {
    private pos: Vec3 = [0,0,0];
    private rot: Vec3 = [0,0,0];
    private lRot: Vec3 = [0,0,0];
    private scal: Vec3 = [1,1,1];
    private trac: string = "LIGHT";
    private am: number = 1;
    private ty: BTSLight = "Laser";
    private ID: number = 100;
    private LTY: number = 1;
    private circle: boolean = false;
    constructor(position: Vec3, amount: number ) {
        this.pos = position;
        this.am = amount;
    }
    set amount(value: number){this.am = value}
    set track(value: string){this.trac = value}
    set scale(value: Vec3){this.scal = value}
    set localRotation(value: Vec3){this.lRot = value}
    set position(value: Vec3){this.pos = value}
    set rotation(value: Vec3){this.rot = value}
    set emitterType(value: BTSLight){this.ty = value}
    set lightID(value: number){this.ID = value}
    set lightType(value: number){this.LTY = value}
    set isCirc(value: boolean){this.circle = value}

    push() {
    const rotValue = this.rot;
    const light = new Environment(undefined, "Regex")
        if(this.ty == "Bloom") {
        light.id = ENV.BTS.BLOOM_LIGHT.ID;
        } 
        else if ( this.ty == "Laser") {
            light.id = ENV.BTS.SOLID_LASER.ID;
        } 
        else if (this.ty == "Sun") {
            light.id = "GlowLineH$"
            this.scal = [0.0001, 0.0001, 0.0001]
        }
        for(let i = 0; i < this.am; i++) {
            light.duplicate = 1
            if(this.circle == true) {
                light.position = rotatePoint(this.pos,[0,0,0+(360/this.am)*i],[0,0,0])
            } else {
                light.position = this.pos
            }
            light.rotation = this.rot;
            light.scale = this.scal;
                light.localRotation = [this.lRot[0],this.lRot[1],0+(360/this.am)*i]
            light.track.value = this.trac;
            light.lightID = this.ID+i;
            light.lightType = this.LTY;
            light.push()
            console.log(`Registering: ${this.ty} at ID(s): ${light.lightID} / TYPE: ${light.lightType} | POS: [${light.position}] ROT: [${light.rotation}] / LROT: [${light.localRotation}] SCALE: [${light.scale}]`)
        }
    }
}
