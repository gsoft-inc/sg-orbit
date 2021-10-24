export function omitProps<TProps extends Record<string, any>, TKey extends string>(props: TProps, omit: TKey[]) {
    const result = Object.keys(props)
        .reduce((acc: Partial<TProps>, x: string) => {
            if (!omit.includes(x as TKey)) {
                acc[x as keyof Partial<TProps>] = props[x];
            }

            return acc;
        }, {});

    return result as Omit<TProps, TKey>;
}
