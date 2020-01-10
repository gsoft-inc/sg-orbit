import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Typography"))
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex">
                 <div>
                     <h1 className="f1 pa0 ma0">Space Flight Programs</h1>
                     <h1 className="f2 pa0 ma0">Space Flight Programs</h1>
                     <h1 className="f3 pa0 ma0">Space Flight Programs</h1>
                     <h1 className="f4 pa0 ma0">Space Flight Programs</h1>
                     <h1 className="f5 pa0 ma0">Space Flight Programs</h1>
                     <h1 className="f6 pa0 ma0">Space Flight Programs</h1>
                     <h1 className="f7 pa0 ma0">Space Flight Programs</h1>
                     <h1 className="f8 pa0 ma0">Space Flight Programs</h1>
                     <h1 className="f9 pa0 ma0">Space Flight Programs</h1>
                 </div>
                 <div className="mw5 ml4">
                     <h1 className="lh1 pa0 ma0 f5">If two pieces of the same type of metal touch in space they will permanently bond.</h1>
                     <h1 className="lh2 pa0 ma0 f5">If two pieces of the same type of metal touch in space they will permanently bond.</h1>
                     <h1 className="lh3 pa0 ma0 f5">If two pieces of the same type of metal touch in space they will permanently bond.</h1>
                     <h1 className="lh4 pa0 ma0 f5">If two pieces of the same type of metal touch in space they will permanently bond.</h1>
                     <h1 className="lh5 pa0 ma0 f5">If two pieces of the same type of metal touch in space they will permanently bond.</h1>
                     <h1 className="lh6 pa0 ma0 f5">If two pieces of the same type of metal touch in space they will permanently bond.</h1>
                 </div>
                 <div className="mw5 ml4">
                     <h1 className="f6 pa0 ma0 fw3">300 - Space Flight Program</h1>
                     <h1 className="f6 pa0 ma0 fw4">400 - Space Flight Program</h1>
                     <h1 className="f6 pa0 ma0 fw5">500 - Space Flight Program</h1>
                     <h1 className="f6 pa0 ma0 fw6">600 - Space Flight Program</h1>
                 </div>
             </div>
    );
