
export function ExperimentalMessage({ noDoc, noTests, noVisualTesting, noFinalDesign, noMobileSupport, ...rest }: any) {
    const hasDetails = [noDoc, noTests, noVisualTesting, noFinalDesign, noMobileSupport].some(validation => validation);

    return (
        <div>
                <h1>Experimental</h1>
                <span>
                    This component and its documentation is in development. There could be breaking changes made to it in a non-major release. Please use with caution
                    {hasDetails && <ul>
                        {noDoc && <li>Documentation is missing</li>}
                        {noTests && <li>Tests are missing</li>}
                        {noVisualTesting && <li>Visual testing is missing</li>}
                        {noFinalDesign && <li>The Design is not final</li>}
                        {noMobileSupport && <li>Mobile support is missing</li>}
                    </ul>}
                </span>
        </div>
    );
}
