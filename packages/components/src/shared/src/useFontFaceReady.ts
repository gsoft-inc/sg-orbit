import { useEffect, useState } from "react";

const useFontFaceReady = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let isCancelled = false;
        const loadFonts = async () => {
            await document.fonts.ready;
            if (!isCancelled) { setReady(true); }
        };
        loadFonts();

        return () => { isCancelled = true; };
    }, []);

    return ready;
};

export { useFontFaceReady };
