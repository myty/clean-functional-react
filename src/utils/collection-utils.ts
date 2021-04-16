const range = (start: number, end: number): Array<number> =>
    new Array(end - start + 1).fill(undefined).map((_, k) => k + start);

export const CollectionUtils = { range };
