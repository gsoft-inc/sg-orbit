export function omitProps<TObject extends Record<string, any>, TKey extends string>(obj: TObject, omit: TKey[]) {
    const result = Object.keys(obj)
        .reduce((acc: Record<string, any>, x: string) => {
            if (!omit.includes(x as TKey)) {
                acc[x] = obj[x];
            }

            return acc;
        }, {});

    return result as Omit<TObject, TKey>;
}
