import "./IconGallery.css";
import { Grid, GridProps } from "@components/layout";

export function IconGallery({ children, ...rest }: GridProps) {
    return (
        <Grid className="o-ui-sb-gallery" {...rest}>
            {children}
        </Grid>
    );
}
