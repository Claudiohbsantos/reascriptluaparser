export function filterEven(arr: number[]): number[] {
  return arr.filter((n) => n % 2 == 0)
}

function shout(s: string): void {
  console.log(s.toUpperCase())
}

shout('do you work?')
