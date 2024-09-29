import { appendVarietyMap } from "./varieties";

export function splitMatch(str: string, vs: string): boolean {
  const strMatches = Array.from(str.toLowerCase().matchAll(/[\w\d]+/g)).map(e => e[0]);
  const vsMatches = Array.from(vs.toLowerCase().matchAll(/[\w\d]+/g)).map(e => e[0]);
  return strMatches.every(t => vsMatches.includes(t)) && vsMatches.every(t => strMatches.includes(t));
}

export function splitMatchPokemonName(str: string, vs: string): boolean {
  const strMatches = Array.from(str.toLowerCase()
    .matchAll(/[\w\d]+/g))
    .map(e => e[0])
    .filter(e => !Object.keys(appendVarietyMap).map(k => k.substring(1)).includes(e));
  const vsMatches = Array.from(vs.toLowerCase()
    .matchAll(/[\w\d]+/g))
    .map(e => e[0])
    .filter(e => !Object.keys(appendVarietyMap).map(k => k.substring(1)).includes(e));
  return strMatches.every(t => vsMatches.includes(t)) && vsMatches.every(t => strMatches.includes(t));
}
