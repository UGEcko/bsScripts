import * as rm from "https://deno.land/x/remapper@2.1.0/src/mod.ts"




export function MiscScripts() {


//! Console Log System

const version = rm.info.version
const ver = version.toString();
const vsn = ver.slice(0,1);

const mpr = rm.info.mapper
const mappr = mpr.toUpperCase();

  console.log("Mapper: " + mappr  + " / Version: " + vsn + " / " + rm.info.BPM + " BPM");

//! 







}

