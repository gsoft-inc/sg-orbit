export function omitProps<TObject extends Record<string, any>, TProps extends keyof TObject>(obj: TObject, props: TProps[]): Omit<TObject, TProps> {
    return (Object.keys(obj) as TProps[]).
        reduce((acc, x) => {
            if (!props.includes(x)) {
                acc[x] = obj[x];
            }

            return acc;
        }, {} as TObject);
}
