export function splitMatch(str: string, vs: string): boolean {
  const strMatches = Array.from(str.toLowerCase().matchAll(/\w+/g)).map(e => e[0]);
  const vsMatches = Array.from(vs.toLowerCase().matchAll(/\w+/g)).map(e => e[0]);
  return strMatches.every(t => vsMatches.includes(t)) && vsMatches.every(t => strMatches.includes(t));
}
