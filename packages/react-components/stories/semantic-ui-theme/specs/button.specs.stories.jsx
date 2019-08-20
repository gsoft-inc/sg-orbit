import { Button } from "semantic-ui-react";
import { storiesBuilder } from "../../../storybook/utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Semantic-UI-Theme|button")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticDelay(100)
        .build();
}

stories()
    .add("specs",
         () =>
             <div className="flex flex-row">
                 <div className="flex flex-column items-start">
                     <Button>Cutoff</Button>
                     <Button active>Cutoff</Button>
                     <Button disabled>Cutoff</Button>
                     <Button primary>Delay</Button>
                     <Button primary active>Delay</Button>
                     <Button primary disabled>Delay</Button>
                     <Button basic>Deflect</Button>
                     <Button basic active>Deflect</Button>
                     <Button basic disabled>Deflect</Button>
                     <Button basic primary>Deflect</Button>
                     <Button basic primary active>Deflect</Button>
                     <Button basic primary disabled>Deflect</Button>
                     <Button secondary>Deflect</Button>
                     <Button secondary active>Deflect</Button>
                     <Button secondary disabled>Deflect</Button>
                     <Button inverted primary>Deflect</Button>
                     <Button inverted primary active>Deflect</Button>
                     <Button inverted primary disabled>Deflect</Button>
                     <Button className="ghost">Cutoff</Button>
                     <Button active className="ghost">Cutoff</Button>
                     <Button disabled className="ghost">Cutoff</Button>
                     <Button primary className="ghost">Cutoff</Button>
                     <Button primary active className="ghost">Cutoff</Button>
                     <Button primary disabled className="ghost">Cutoff</Button>
                 </div>
                 <div className="flex flex-column items-start">
                     <Button>
                         <svg className="mr2" width="19" height="19">
                             <defs>
                                 <path
                                     d="M15.293 5L13 2.707 7.207 8.5 9.5 10.793 15.293 5zM16 4.293l.94-.94a.5.5 0 0 0 0-.707l-1.586-1.585a.5.5 0 0 0-.708 0L13.707 2 16 4.293zm-7.39 7.024L6.683 9.39l-1.285 3.212 3.212-1.285zM12 11h1v5.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 16.5v-15A1.5 1.5 0 0 1 1.5 0H11v1H1.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V11zm5.646-9.06a1.5 1.5 0 0 1 0 2.12l-7.792 7.794-.168.11-5 2a.5.5 0 0 1-.65-.65l2-5 .11-.168L13.94.354a1.5 1.5 0 0 1 2.122 0l1.585 1.585z"
                                     id="a"
                                 />
                             </defs>
                             <g transform="translate(0 1)" fillRule="evenodd">
                                 <mask id="b" fill="#fff">
                                     <use xlinkHref="#a" />
                                 </mask>
                                 <use fillRule="nonzero" xlinkHref="#a" />
                                 <g mask="url(#b)">
                                     <path d="M0 0h18v18H0z" />
                                 </g>
                             </g>
                         </svg>
                    Astro Orbiter
                     </Button>
                     <Button active>
                         <svg className="mr2" width="19" height="19">
                             <defs>
                                 <path
                                     d="M15.293 5L13 2.707 7.207 8.5 9.5 10.793 15.293 5zM16 4.293l.94-.94a.5.5 0 0 0 0-.707l-1.586-1.585a.5.5 0 0 0-.708 0L13.707 2 16 4.293zm-7.39 7.024L6.683 9.39l-1.285 3.212 3.212-1.285zM12 11h1v5.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 16.5v-15A1.5 1.5 0 0 1 1.5 0H11v1H1.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V11zm5.646-9.06a1.5 1.5 0 0 1 0 2.12l-7.792 7.794-.168.11-5 2a.5.5 0 0 1-.65-.65l2-5 .11-.168L13.94.354a1.5 1.5 0 0 1 2.122 0l1.585 1.585z"
                                     id="a"
                                 />
                             </defs>
                             <g transform="translate(0 1)" fillRule="evenodd">
                                 <mask id="b" fill="#fff">
                                     <use xlinkHref="#a" />
                                 </mask>
                                 <use fillRule="nonzero" xlinkHref="#a" />
                                 <g mask="url(#b)">
                                     <path d="M0 0h18v18H0z" />
                                 </g>
                             </g>
                         </svg>
                        Astro Orbiter
                     </Button>
                     <Button disabled>
                         <svg className="mr2" width="19" height="19">
                             <defs>
                                 <path
                                     d="M15.293 5L13 2.707 7.207 8.5 9.5 10.793 15.293 5zM16 4.293l.94-.94a.5.5 0 0 0 0-.707l-1.586-1.585a.5.5 0 0 0-.708 0L13.707 2 16 4.293zm-7.39 7.024L6.683 9.39l-1.285 3.212 3.212-1.285zM12 11h1v5.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 16.5v-15A1.5 1.5 0 0 1 1.5 0H11v1H1.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V11zm5.646-9.06a1.5 1.5 0 0 1 0 2.12l-7.792 7.794-.168.11-5 2a.5.5 0 0 1-.65-.65l2-5 .11-.168L13.94.354a1.5 1.5 0 0 1 2.122 0l1.585 1.585z"
                                     id="a"
                                 />
                             </defs>
                             <g transform="translate(0 1)" fillRule="evenodd">
                                 <mask id="b" fill="#fff">
                                     <use xlinkHref="#a" />
                                 </mask>
                                 <use fillRule="nonzero" xlinkHref="#a" />
                                 <g mask="url(#b)">
                                     <path d="M0 0h18v18H0z" />
                                 </g>
                             </g>
                         </svg>
                        Astro Orbiter
                     </Button>
                     <Button basic>
                         <svg className="mr2" width="19" height="19">
                             <defs>
                                 <path
                                     d="M15.293 5L13 2.707 7.207 8.5 9.5 10.793 15.293 5zM16 4.293l.94-.94a.5.5 0 0 0 0-.707l-1.586-1.585a.5.5 0 0 0-.708 0L13.707 2 16 4.293zm-7.39 7.024L6.683 9.39l-1.285 3.212 3.212-1.285zM12 11h1v5.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 16.5v-15A1.5 1.5 0 0 1 1.5 0H11v1H1.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V11zm5.646-9.06a1.5 1.5 0 0 1 0 2.12l-7.792 7.794-.168.11-5 2a.5.5 0 0 1-.65-.65l2-5 .11-.168L13.94.354a1.5 1.5 0 0 1 2.122 0l1.585 1.585z"
                                     id="a"
                                 />
                             </defs>
                             <g transform="translate(0 1)" fillRule="evenodd">
                                 <mask id="b" fill="#fff">
                                     <use xlinkHref="#a" />
                                 </mask>
                                 <use fillRule="nonzero" xlinkHref="#a" />
                                 <g mask="url(#b)">
                                     <path d="M0 0h18v18H0z" />
                                 </g>
                             </g>
                         </svg>
                    Primeval Whirl
                     </Button>
                     <Button basic active>
                         <svg className="mr2" width="19" height="19">
                             <defs>
                                 <path
                                     d="M15.293 5L13 2.707 7.207 8.5 9.5 10.793 15.293 5zM16 4.293l.94-.94a.5.5 0 0 0 0-.707l-1.586-1.585a.5.5 0 0 0-.708 0L13.707 2 16 4.293zm-7.39 7.024L6.683 9.39l-1.285 3.212 3.212-1.285zM12 11h1v5.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 16.5v-15A1.5 1.5 0 0 1 1.5 0H11v1H1.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V11zm5.646-9.06a1.5 1.5 0 0 1 0 2.12l-7.792 7.794-.168.11-5 2a.5.5 0 0 1-.65-.65l2-5 .11-.168L13.94.354a1.5 1.5 0 0 1 2.122 0l1.585 1.585z"
                                     id="a"
                                 />
                             </defs>
                             <g transform="translate(0 1)" fillRule="evenodd">
                                 <mask id="b" fill="#fff">
                                     <use xlinkHref="#a" />
                                 </mask>
                                 <use fillRule="nonzero" xlinkHref="#a" />
                                 <g mask="url(#b)">
                                     <path d="M0 0h18v18H0z" />
                                 </g>
                             </g>
                         </svg>
                        Primeval Whirl
                     </Button>
                     <Button basic disabled>
                         <svg className="mr2" width="19" height="19">
                             <defs>
                                 <path
                                     d="M15.293 5L13 2.707 7.207 8.5 9.5 10.793 15.293 5zM16 4.293l.94-.94a.5.5 0 0 0 0-.707l-1.586-1.585a.5.5 0 0 0-.708 0L13.707 2 16 4.293zm-7.39 7.024L6.683 9.39l-1.285 3.212 3.212-1.285zM12 11h1v5.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 16.5v-15A1.5 1.5 0 0 1 1.5 0H11v1H1.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V11zm5.646-9.06a1.5 1.5 0 0 1 0 2.12l-7.792 7.794-.168.11-5 2a.5.5 0 0 1-.65-.65l2-5 .11-.168L13.94.354a1.5 1.5 0 0 1 2.122 0l1.585 1.585z"
                                     id="a"
                                 />
                             </defs>
                             <g transform="translate(0 1)" fillRule="evenodd">
                                 <mask id="b" fill="#fff">
                                     <use xlinkHref="#a" />
                                 </mask>
                                 <use fillRule="nonzero" xlinkHref="#a" />
                                 <g mask="url(#b)">
                                     <path d="M0 0h18v18H0z" />
                                 </g>
                             </g>
                         </svg>
                        Primeval Whirl
                     </Button>
                     <Button primary>
                         <svg className="mr2" width="19" height="19">
                             <defs>
                                 <path
                                     d="M15.293 5L13 2.707 7.207 8.5 9.5 10.793 15.293 5zM16 4.293l.94-.94a.5.5 0 0 0 0-.707l-1.586-1.585a.5.5 0 0 0-.708 0L13.707 2 16 4.293zm-7.39 7.024L6.683 9.39l-1.285 3.212 3.212-1.285zM12 11h1v5.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 16.5v-15A1.5 1.5 0 0 1 1.5 0H11v1H1.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V11zm5.646-9.06a1.5 1.5 0 0 1 0 2.12l-7.792 7.794-.168.11-5 2a.5.5 0 0 1-.65-.65l2-5 .11-.168L13.94.354a1.5 1.5 0 0 1 2.122 0l1.585 1.585z"
                                     id="a"
                                 />
                             </defs>
                             <g transform="translate(0 1)" fillRule="evenodd">
                                 <mask id="b" fill="#fff">
                                     <use xlinkHref="#a" />
                                 </mask>
                                 <use fillRule="nonzero" xlinkHref="#a" />
                                 <g mask="url(#b)">
                                     <path d="M0 0h18v18H0z" />
                                 </g>
                             </g>
                         </svg>
                    Space Mountain
                     </Button>
                     <Button primary active>
                         <svg className="mr2" width="19" height="19">
                             <defs>
                                 <path
                                     d="M15.293 5L13 2.707 7.207 8.5 9.5 10.793 15.293 5zM16 4.293l.94-.94a.5.5 0 0 0 0-.707l-1.586-1.585a.5.5 0 0 0-.708 0L13.707 2 16 4.293zm-7.39 7.024L6.683 9.39l-1.285 3.212 3.212-1.285zM12 11h1v5.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 16.5v-15A1.5 1.5 0 0 1 1.5 0H11v1H1.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V11zm5.646-9.06a1.5 1.5 0 0 1 0 2.12l-7.792 7.794-.168.11-5 2a.5.5 0 0 1-.65-.65l2-5 .11-.168L13.94.354a1.5 1.5 0 0 1 2.122 0l1.585 1.585z"
                                     id="a"
                                 />
                             </defs>
                             <g transform="translate(0 1)" fillRule="evenodd">
                                 <mask id="b" fill="#fff">
                                     <use xlinkHref="#a" />
                                 </mask>
                                 <use fillRule="nonzero" xlinkHref="#a" />
                                 <g mask="url(#b)">
                                     <path d="M0 0h18v18H0z" />
                                 </g>
                             </g>
                         </svg>
                        Space Mountain
                     </Button>
                     <Button primary disabled>
                         <svg className="mr2" width="19" height="19">
                             <defs>
                                 <path
                                     d="M15.293 5L13 2.707 7.207 8.5 9.5 10.793 15.293 5zM16 4.293l.94-.94a.5.5 0 0 0 0-.707l-1.586-1.585a.5.5 0 0 0-.708 0L13.707 2 16 4.293zm-7.39 7.024L6.683 9.39l-1.285 3.212 3.212-1.285zM12 11h1v5.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 0 16.5v-15A1.5 1.5 0 0 1 1.5 0H11v1H1.5a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V11zm5.646-9.06a1.5 1.5 0 0 1 0 2.12l-7.792 7.794-.168.11-5 2a.5.5 0 0 1-.65-.65l2-5 .11-.168L13.94.354a1.5 1.5 0 0 1 2.122 0l1.585 1.585z"
                                     id="a"
                                 />
                             </defs>
                             <g transform="translate(0 1)" fillRule="evenodd">
                                 <mask id="b" fill="#fff">
                                     <use xlinkHref="#a" />
                                 </mask>
                                 <use fillRule="nonzero" xlinkHref="#a" />
                                 <g mask="url(#b)">
                                     <path d="M0 0h18v18H0z" />
                                 </g>
                             </g>
                         </svg>
                        Space Mountain
                     </Button>
                 </div>
             </div>
    );
