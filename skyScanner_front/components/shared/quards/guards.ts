
export function isTripsPairs<T>(trips: T[] | [T[], T[]]): trips is [T[], T[]] {
    return  trips.length !== 0 && Array.isArray(trips[0]);
  }


