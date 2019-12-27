import { CONTEXT_SHAPE } from "./context";
import { CheckmarkIcon } from "./assets";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { a, useTransition } from "react-spring";
import { any, number, shape, string } from "prop-types";
import { isNil } from "lodash";
import css from "styled-jsx/css";

// Using css.resolve because of the react-spring animation.
const { className, styles } = css.resolve` /* stylelint-disable-line */
    .variant:not(:last-child) {
        margin-right: 1rem;
    }

    .header {
        color: #A8ADBB;
        text-align: center;
        margin-bottom: 1rem;
    }

    .content {
        position: relative;
        display: flex;
    }

    .iconContainer {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 2rem;
        min-height: 2rem;
    }

    .copyContainer {
        position: absolute;
        opacity: 0;
        transition: opacity .15s ease-in;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .25rem;
        background-color: #0E1C3D;
        width: 100%;
        height: 100%;
    }

    .content:hover .copyContainer,
    .content:focus .copyContainer,
    .content:active .copyContainer {
        opacity: 1;
        transition: opacity .15s ease-in;
    }

    .copyAction {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #FFF;
        font-weight: 500;
        font-size: .75rem;
        cursor: pointer;
        width: 100%;
        height: 100%;
    }

    .copySucceeded {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .copyCheckmark {
        width: 1rem;
        height: 1rem;
        fill: #FFF;
    }

    .copyForm {
        opacity: 0.01;
        height: 0;
        position: absolute;
        z-index: -1;
    }
`;

function renderIcon(iconInstance, size, inferIconSize) {
    if (inferIconSize) {
        return cloneElement(iconInstance, {
            style: { width: size, height: size }
        });
    }

    return iconInstance;
}

export function IconVariant({ size, copyValue, context: { name, getCopyValue, renderingSize, inferIconSize }, children }) {
    const [copySucceeded, setCopySucceeded] = useState(false);
    const textAreaRef = useRef(null);

    useEffect(() => {
        let timeoutId = null;

        if (copySucceeded) {
            timeoutId = setTimeout(() => {
                setCopySucceeded(false);
            }, 1000);
        }

        return () => clearTimeout(timeoutId);
    }, [copySucceeded]);

    const copyAnimation = useTransition(copySucceeded, null, {
        from: {
            opacity: 0,
            transform: "translate3d(0,-20px,0)"
        },
        enter: {
            opacity: 1,
            transform: "translate3d(0,0px,0)"
        },
        leave: {
            opacity: 0,
            transform: "translate3d(0,0px,0)"
        }
    });

    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand("copy");

        setCopySucceeded(true);
    };

    const icon = Children.only(children);
    const iconContainerStyle = !inferIconSize ? {} : {
        width: renderingSize,
        height: renderingSize
    };

    return (
        <div className={`${className} variant sbdocs sbdocs-ig-variant`}>
            <div className={`${className} header sbdocs sbdocs-ig-variant-header`}>{size}</div>
            <div className={`${className} content sbdocs sbdocs-ig-variant-content sbdocs-ig-variant-content-${size}`}>
                <div className={`${className} iconContainer sbdocs sbdocs-ig-icon-container sbdocs-ig-icon-container-${size}`} style={iconContainerStyle}>
                    {renderIcon(icon, size, inferIconSize)}
                    <div className={`${className} copyContainer sbdocs sbdocs-ig-copy-container sbdocs-ig-copy-container-${size}`} onClick={copyToClipboard}>
                        {copyAnimation.map(({ item, props, key }) => {
                            if (item) {
                                return (
                                    <a.div style={props} className={`${className} copySucceeded sbdocs sbdocs-ig-copy-succeeded sbdocs-ig-copy-succeeded-${size}`} key={key}>
                                        <CheckmarkIcon className={`${className} copyCheckmark sbdocs sbdocs-ig-copy-checkmark sbdocs-ig-copy-checkmark-${size}`} />
                                    </a.div>
                                );
                            }

                            return <a.div style={props} className={`${className} copyAction sbdocs sbdocs-ig-copy-action sbdocs-ig-copy-action-${size}`} key={key}>Copy</a.div>;
                        })}
                    </div>
                </div>
                <form className={`${className} copyForm`}>
                    <textarea
                        readOnly
                        ref={textAreaRef}
                        value={!isNil(copyValue) ? copyValue : getCopyValue({ itemName: name, variantSize: size, icon })}
                    />
                </form>
            </div>
            {styles}
        </div>
    );
}

IconVariant.propTypes = {
    size: number.isRequired,
    copyValue: string,
    context: shape(CONTEXT_SHAPE),
    children: any.isRequired
};
