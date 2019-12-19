import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories() {
    return storiesOfBuilder(module, createChromaticSection("Colours"))
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)
                .build()
        )
        .build();
}

stories()
    .add("default",
         () =>
             <div>
                 <div className="flex flex-row items-center">
                     <div className="pa4 bg-moonstone-50" />
                     <div className="pa4 bg-moonstone-100" />
                     <div className="pa4 bg-moonstone-200" />
                     <div className="pa4 bg-moonstone-300" />
                     <div className="pa4 bg-moonstone-400" />
                     <div className="pa4 bg-moonstone-500" />
                     <div className="pa4 bg-moonstone-600" />
                     <div className="pa4 bg-moonstone-700" />
                     <div className="pa4 bg-moonstone-800" />
                     <div className="pa4 bg-moonstone-900" />
                     <div className="pa4 bg-sunray-50" />
                     <div className="pa4 bg-sunray-100" />
                     <div className="pa4 bg-sunray-200" />
                     <div className="pa4 bg-sunray-300" />
                     <div className="pa4 bg-sunray-400" />
                     <div className="pa4 bg-sunray-500" />
                     <div className="pa4 bg-sunray-600" />
                     <div className="pa4 bg-sunray-700" />
                     <div className="pa4 bg-sunray-800" />
                     <div className="pa4 bg-sunray-900" />
                     <div className="pa4 bg-marine-50" />
                     <div className="pa4 bg-marine-100" />
                     <div className="pa4 bg-marine-200" />
                     <div className="pa4 bg-marine-300" />
                     <div className="pa4 bg-marine-400" />
                     <div className="pa4 bg-marine-500" />
                     <div className="pa4 bg-marine-600" />
                     <div className="pa4 bg-marine-700" />
                     <div className="pa4 bg-marine-800" />
                     <div className="pa4 bg-marine-900" />
                 </div>
                 <div className="flex flex-row items-center">
                     <div className="pa4 bg-desktop-50" />
                     <div className="pa4 bg-desktop-100" />
                     <div className="pa4 bg-desktop-200" />
                     <div className="pa4 bg-desktop-300" />
                     <div className="pa4 bg-desktop-400" />
                     <div className="pa4 bg-desktop-500" />
                     <div className="pa4 bg-desktop-600" />
                     <div className="pa4 bg-desktop-700" />
                     <div className="pa4 bg-desktop-800" />
                     <div className="pa4 bg-desktop-900" />
                     <div className="pa4 bg-overcast-50" />
                     <div className="pa4 bg-overcast-100" />
                     <div className="pa4 bg-overcast-200" />
                     <div className="pa4 bg-overcast-300" />
                     <div className="pa4 bg-overcast-400" />
                     <div className="pa4 bg-overcast-500" />
                     <div className="pa4 bg-overcast-600" />
                     <div className="pa4 bg-overcast-700" />
                     <div className="pa4 bg-overcast-800" />
                     <div className="pa4 bg-overcast-900" />
                     <div className="pa4 bg-apricot-50" />
                     <div className="pa4 bg-apricot-100" />
                     <div className="pa4 bg-apricot-200" />
                     <div className="pa4 bg-apricot-300" />
                     <div className="pa4 bg-apricot-400" />
                     <div className="pa4 bg-apricot-500" />
                     <div className="pa4 bg-apricot-600" />
                     <div className="pa4 bg-apricot-700" />
                     <div className="pa4 bg-apricot-800" />
                     <div className="pa4 bg-apricot-900" />
                 </div>
                 <div className="flex flex-row items-center">
                     <div className="pa4 bg-alert-50" />
                     <div className="pa4 bg-alert-100" />
                     <div className="pa4 bg-alert-200" />
                     <div className="pa4 bg-alert-300" />
                     <div className="pa4 bg-alert-400" />
                     <div className="pa4 bg-alert-500" />
                     <div className="pa4 bg-alert-600" />
                     <div className="pa4 bg-alert-700" />
                     <div className="pa4 bg-alert-800" />
                     <div className="pa4 bg-alert-900" />
                     <div className="pa4 bg-success-50" />
                     <div className="pa4 bg-success-100" />
                     <div className="pa4 bg-success-200" />
                     <div className="pa4 bg-success-300" />
                     <div className="pa4 bg-success-400" />
                     <div className="pa4 bg-success-500" />
                     <div className="pa4 bg-success-600" />
                     <div className="pa4 bg-success-700" />
                     <div className="pa4 bg-success-800" />
                     <div className="pa4 bg-success-900" />
                     <div className="pa4 bg-cloud-50" />
                     <div className="pa4 bg-cloud-100" />
                     <div className="pa4 bg-cloud-200" />
                     <div className="pa4 bg-cloud-300" />
                     <div className="pa4 bg-cloud-400" />
                     <div className="pa4 bg-cloud-500" />
                     <div className="pa4 bg-cloud-600" />
                     <div className="pa4 bg-cloud-700" />
                     <div className="pa4 bg-cloud-800" />
                     <div className="pa4 bg-cloud-900" />
                 </div>
             </div>
    );
