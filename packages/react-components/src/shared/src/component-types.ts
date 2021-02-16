export type PropsWithoutForwardedRef<P extends { forwardedRef?: any }> = Omit<P, "forwardedRef">
