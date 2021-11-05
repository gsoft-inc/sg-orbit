import { useEffect, useState } from "react";

const useFontFaceReady = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        document.fonts.ready.then(() => {
            setReady(true);
        });
    }, []);

    return ready;
};

export { useFontFaceReady };
