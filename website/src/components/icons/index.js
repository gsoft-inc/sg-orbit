import React from "react";

const IconPlayground = function(props) {
    const { name } = props;
    const { children } = props;

    return (<>
    <div className="flex flex-column items-center" onClick="">
        {children}
        <label className="icon-label f8 pt4">{name}</label>
    </div>
    </>);
};

export default IconPlayground;
