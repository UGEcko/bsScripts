  export function arrRound(arr: number[], decimalPlaces: number): any[] {
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
