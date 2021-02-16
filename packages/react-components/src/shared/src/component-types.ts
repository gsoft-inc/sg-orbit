import { RefAttributes } from "react";

export type InnerPropsToProps<P> = Omit<P, "forwardedRef"> & RefAttributes<any>;
