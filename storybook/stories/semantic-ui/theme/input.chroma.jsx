/* eslint max-len: 0 */

import { Input } from "semantic-ui-react";
import { createSemanticThemeSection } from "@utils/create-section";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories(segment) {
    return storiesOfBuilder(module, createSemanticThemeSection("Input"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)
                .sortLast()
                .build()
        )
        .build();
}

stories()
    .add("default",
         () =>
            <>
            <div className="flex flex-row">
                <div className="flex flex-row">
                    <div className="flex flex-column items-start">
                        <Input placeholder="Search..." />
                        <Input focus placeholder="Search..." />
                        <Input disabled placeholder="Search..." />
                        <Input placeholder="Search..." defaultValue="Obiwan" />
                        <Input focus placeholder="Search..." defaultValue="Obiwan" />
                        <Input disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input icon="search" placeholder="Search..." />
                        <Input focus icon="search" placeholder="Search..." />
                        <Input disabled icon="search" placeholder="Search..." />
                        <Input icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input icon="search" iconPosition="left" placeholder="Search..." />
                        <Input icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    </div>
                    <div className="flex flex-column items-start">
                        <Input loading className="paused" placeholder="Search..." />
                        <Input loading className="paused" disabled placeholder="Search..." />
                        <Input loading className="paused" disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" icon="search" placeholder="Search..." />
                        <Input loading className="paused" focus icon="search" placeholder="Search..." />
                        <Input loading className="paused" disabled icon="search" placeholder="Search..." />
                        <Input loading className="paused" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" icon="search" iconPosition="left" placeholder="Search..." />
                        <Input loading className="paused" icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input loading className="paused" icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input loading className="paused" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-column items-start">
                        <Input className="success" placeholder="Search..." />
                        <Input className="success" focus placeholder="Search..." />
                        <Input className="success" disabled placeholder="Search..." />
                        <Input className="success" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="success" focus placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="success" disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="success" icon="search" placeholder="Search..." />
                        <Input className="success" focus icon="search" placeholder="Search..." />
                        <Input className="success" disabled icon="search" placeholder="Search..." />
                        <Input className="success" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="success" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="success" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="success" icon="search" iconPosition="left" placeholder="Search..." />
                        <Input className="success" icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input className="success" icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input className="success" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input className="success" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input className="success" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    </div>
                    <div className="flex flex-column items-start">
                        <Input loading className="paused success" placeholder="Search..." />
                        <Input loading className="paused success" disabled placeholder="Search..." />
                        <Input loading className="paused success" disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused success" icon="search" placeholder="Search..." />
                        <Input loading className="paused success" focus icon="search" placeholder="Search..." />
                        <Input loading className="paused success" disabled icon="search" placeholder="Search..." />
                        <Input loading className="paused success" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused success" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused success" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused success" icon="search" iconPosition="left" placeholder="Search..." />
                        <Input loading className="paused success" icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input loading className="paused success" icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input loading className="paused success" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused success" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused success" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-column items-start">
                        <Input error placeholder="Search..." />
                        <Input error focus placeholder="Search..." />
                        <Input error disabled placeholder="Search..." />
                        <Input error placeholder="Search..." defaultValue="Obiwan" />
                        <Input error focus placeholder="Search..." defaultValue="Obiwan" />
                        <Input error disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input error icon="search" placeholder="Search..." />
                        <Input error focus icon="search" placeholder="Search..." />
                        <Input error disabled icon="search" placeholder="Search..." />
                        <Input error icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input error focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input error disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input error icon="search" iconPosition="left" placeholder="Search..." />
                        <Input error icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input error icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input error icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input error icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input error icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    </div>
                    <div className="flex flex-column items-start">
                        <Input loading className="paused" error placeholder="Search..." />
                        <Input loading className="paused" error disabled placeholder="Search..." />
                        <Input loading className="paused" error disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" error icon="search" placeholder="Search..." />
                        <Input loading className="paused" error focus icon="search" placeholder="Search..." />
                        <Input loading className="paused" error disabled icon="search" placeholder="Search..." />
                        <Input loading className="paused" error icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" error focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" error disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" error icon="search" iconPosition="left" placeholder="Search..." />
                        <Input loading className="paused" error icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input loading className="paused" error icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input loading className="paused" error icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" error icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="paused" error icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    </div>
                </div>
            </div>
            </>
    ).add("transparent",
          () =>
            <>
            <div className="flex flex-row">
                <div className="flex flex-row">
                    <div className="flex flex-column items-start">
                        <Input className="transparent" placeholder="Search..." />
                        <Input className="transparent" focus placeholder="Search..." />
                        <Input className="transparent" disabled placeholder="Search..." />
                        <Input className="transparent" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" focus placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" icon="search" placeholder="Search..." />
                        <Input className="transparent" focus icon="search" placeholder="Search..." />
                        <Input className="transparent" disabled icon="search" placeholder="Search..." />
                        <Input className="transparent" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" icon="search" iconPosition="left" placeholder="Search..." />
                        <Input className="transparent" icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input className="transparent" icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input className="transparent" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input className="transparent" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input className="transparent" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    </div>
                    <div className="flex flex-column items-start">
                        <Input loading className="transparent paused" placeholder="Search..." />
                        <Input loading className="transparent paused" disabled placeholder="Search..." />
                        <Input loading className="transparent paused" disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" icon="search" placeholder="Search..." />
                        <Input loading className="transparent paused" focus icon="search" placeholder="Search..." />
                        <Input loading className="transparent paused" disabled icon="search" placeholder="Search..." />
                        <Input loading className="transparent paused" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" icon="search" iconPosition="left" placeholder="Search..." />
                        <Input loading className="transparent paused" icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input loading className="transparent paused" icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input loading className="transparent paused" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-column items-start">
                        <Input className="transparent success" placeholder="Search..." />
                        <Input className="transparent success" focus placeholder="Search..." />
                        <Input className="transparent success" disabled placeholder="Search..." />
                        <Input className="transparent success" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent success" focus placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent success" disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent success" icon="search" placeholder="Search..." />
                        <Input className="transparent success" focus icon="search" placeholder="Search..." />
                        <Input className="transparent success" disabled icon="search" placeholder="Search..." />
                        <Input className="transparent success" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent success" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent success" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent success" icon="search" iconPosition="left" placeholder="Search..." />
                        <Input className="transparent success" icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input className="transparent success" icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input className="transparent success" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input className="transparent success" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input className="transparent success" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    </div>
                    <div className="flex flex-column items-start">
                        <Input loading className="transparent paused success" placeholder="Search..." />
                        <Input loading className="transparent paused success" disabled placeholder="Search..." />
                        <Input loading className="transparent paused success" disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused success" icon="search" placeholder="Search..." />
                        <Input loading className="transparent paused success" focus icon="search" placeholder="Search..." />
                        <Input loading className="transparent paused success" disabled icon="search" placeholder="Search..." />
                        <Input loading className="transparent paused success" icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused success" focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused success" disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused success" icon="search" iconPosition="left" placeholder="Search..." />
                        <Input loading className="transparent paused success" icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input loading className="transparent paused success" icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input loading className="transparent paused success" icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused success" icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused success" icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-column items-start">
                        <Input className="transparent" error placeholder="Search..." />
                        <Input className="transparent" error focus placeholder="Search..." />
                        <Input className="transparent" error disabled placeholder="Search..." />
                        <Input className="transparent" error placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" error focus placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" error disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" error icon="search" placeholder="Search..." />
                        <Input className="transparent" error focus icon="search" placeholder="Search..." />
                        <Input className="transparent" error disabled icon="search" placeholder="Search..." />
                        <Input className="transparent" error icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" error focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" error disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input className="transparent" error icon="search" iconPosition="left" placeholder="Search..." />
                        <Input className="transparent" error icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input className="transparent" error icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input className="transparent" error icon="search" iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input className="transparent" error icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                        <Input className="transparent" error icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Chewbacca" />
                    </div>
                    <div className="flex flex-column items-start">
                        <Input loading className="transparent paused" error placeholder="Search..." />
                        <Input loading className="transparent paused" error disabled placeholder="Search..." />
                        <Input loading className="transparent paused" error disabled placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" error icon="search" placeholder="Search..." />
                        <Input loading className="transparent paused" error focus icon="search" placeholder="Search..." />
                        <Input loading className="transparent paused" error disabled icon="search" placeholder="Search..." />
                        <Input loading className="transparent paused" error icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" error focus icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" error disabled icon="search" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" error icon="search" iconPosition="left" placeholder="Search..." />
                        <Input loading className="transparent paused" error icon="search" focus iconPosition="left" placeholder="Search..." />
                        <Input loading className="transparent paused" error icon="search" disabled iconPosition="left" placeholder="Search..." />
                        <Input loading className="transparent paused" error icon="search" iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" error icon="search" focus iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                        <Input loading className="transparent paused" error icon="search" disabled iconPosition="left" placeholder="Search..." defaultValue="Obiwan" />
                    </div>
                </div>
            </div>
            </>
    ).add("variations",
          () =>
            <>
            <div style={{ width: "333px" }}>
                <Input fluid placeholder="Search..." />
                <Input fluid focus placeholder="Search..." />
                <Input fluid disabled placeholder="Search..." />
            </div>
            </>
    );
