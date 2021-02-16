export function omitProps<TObject extends Record<string, any>, TKey extends keyof TObject>(obj: TObject, props: TKey[]): Omit<TObject, TKey> {
    return Object.keys(obj)
        .reduce((acc: Record<string, any>, x: string) => {
            if (!props.includes(x as TKey)) {
                acc[x] = obj[x];
            }

            return acc;
        }, {}) as Omit<TObject, TKey>;
}