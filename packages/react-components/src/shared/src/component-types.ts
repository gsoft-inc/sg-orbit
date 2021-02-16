import { RefAttributes } from "react";

export type PropsWithoutForwardedRef<P extends { forwardedRef?: any }> = Omit<P, "forwardedRef">

export type InnerPropsToProps<P> = PropsWithoutForwardedRef<P> & RefAttributes<any>;
