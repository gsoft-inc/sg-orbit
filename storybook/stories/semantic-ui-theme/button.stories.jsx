/* eslint max-len: 0 */

import { Button } from "semantic-ui-react";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder("Semantic-UI-Theme|button")
        .segment(segment)
        .chromaticDelay(100)
        .build();
}

stories()
    .add("default",
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
                     <Button basic primary>Stow</Button>
                     <Button basic primary active>Stow</Button>
                     <Button basic primary disabled>Stow</Button>
                     <Button secondary>Apollo</Button>
                     <Button secondary active>Appollo</Button>
                     <Button secondary disabled>Appollo</Button>
                     <Button inverted primary>Satellite</Button>
                     <Button inverted primary active>Satellite</Button>
                     <Button inverted primary disabled>Satellite</Button>
                     <Button className="ghost">Danger</Button>
                     <Button active className="ghost">Danger</Button>
                     <Button disabled className="ghost">Danger</Button>
                     <Button primary className="ghost">Fuel</Button>
                     <Button primary active className="ghost">Fuel</Button>
                     <Button primary disabled className="ghost">Fuel</Button>
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
                 <div className="flex flex-column items-start">
                     <Button className="paused"loading>Loading</Button>
                     <Button className="paused"loading disabled>Loading</Button>
                     <Button className="paused"primary loading>Loading</Button>
                     <Button className="paused"primary loading disabled>Loading</Button>
                     <Button className="paused"basic loading>Loading</Button>
                     <Button className="paused"basic loading disabled>Loading</Button>
                     <Button className="paused"basic primary loading>Loading</Button>
                     <Button className="paused"basic primary loading disabled>Loading</Button>
                     <Button className="paused"positive>Mission Space</Button>
                     <Button className="paused"positive active>Mission Space</Button>
                     <Button className="paused"positive disabled>Mission Space</Button>
                     <Button className="paused"negative>Spaceship Earth</Button>
                     <Button className="paused"negative active>Spaceship Earth</Button>
                     <Button className="paused"negative disabled>Spaceship Earth</Button>
                     <Button className="paused"fluid>Fluid</Button>
                 </div>
             </div>
    ).add("tall",
          () =>
              <div className="flex flex-row">
                  <div className="flex flex-column items-start">
                      <Button className="tall">Cutoff</Button>
                      <Button className="tall" active>Cutoff</Button>
                      <Button className="tall" disabled>Cutoff</Button>
                      <Button className="tall" primary>Delay</Button>
                      <Button className="tall" primary active>Delay</Button>
                      <Button className="tall" primary disabled>Delay</Button>
                      <Button className="tall" basic>Deflect</Button>
                      <Button className="tall" basic active>Deflect</Button>
                      <Button className="tall" basic disabled>Deflect</Button>
                      <Button className="tall" basic primary>Stow</Button>
                      <Button className="tall" basic primary active>Stow</Button>
                      <Button className="tall" basic primary disabled>Stow</Button>
                      <Button className="tall" secondary>Apollo</Button>
                      <Button className="tall" secondary active>Appollo</Button>
                      <Button className="tall" secondary disabled>Appollo</Button>
                      <Button className="tall" inverted primary>Satellite</Button>
                      <Button className="tall" inverted primary active>Satellite</Button>
                      <Button className="tall ghost">Danger</Button>
                      <Button className="tall ghost" active>Danger</Button>
                      <Button className="tall ghost" disabled>Danger</Button>
                      <Button className="tall ghost" primary>Fuel</Button>
                      <Button className="tall ghost" primary active>Fuel</Button>
                      <Button className="tall ghost" primary disabled>Fuel</Button>
                  </div>
                  <div className="flex flex-column items-start">
                      <Button className="tall">
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
                      <Button className="tall" active>
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
                      <Button className="tall" disabled>
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
                      <Button className="tall" basic>
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
                      <Button className="tall" basic active>
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
                      <Button className="tall" basic disabled>
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
                      <Button className="tall" primary>
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
                      <Button className="tall" primary active>
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
                      <Button className="tall" primary disabled>
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
                  <div className="flex flex-column items-start">
                      <Button className="tall paused" loading>Loading</Button>
                      <Button className="tall paused" loading disabled>Loading</Button>
                      <Button className="tall paused" primary loading>Loading</Button>
                      <Button className="tall paused" primary loading disabled>Loading</Button>
                      <Button className="tall paused" basic loading>Loading</Button>
                      <Button className="tall paused" basic loading disabled>Loading</Button>
                      <Button className="tall paused" basic primary loading>Loading</Button>
                      <Button className="tall paused" basic primary loading disabled>Loading</Button>
                      <Button className="tall paused" positive>Mission Space</Button>
                      <Button className="tall paused" positive active>Mission Space</Button>
                      <Button className="tall paused" positive disabled>Mission Space</Button>
                      <Button className="tall paused" negative>Spaceship Earth</Button>
                      <Button className="tall paused" negative active>Spaceship Earth</Button>
                      <Button className="tall paused" negative disabled>Spaceship Earth</Button>
                      <Button className="tall paused" fluid>Fluid</Button>
                  </div>
              </div>
    ).add("short",
          () =>
              <div className="flex flex-row">
                  <div className="flex flex-column items-start">
                      <Button className="short">Cutoff</Button>
                      <Button className="short" active>Cutoff</Button>
                      <Button className="short" disabled>Cutoff</Button>
                      <Button className="short" primary>Delay</Button>
                      <Button className="short" primary active>Delay</Button>
                      <Button className="short" primary disabled>Delay</Button>
                      <Button className="short" basic>Deflect</Button>
                      <Button className="short" basic active>Deflect</Button>
                      <Button className="short" basic disabled>Deflect</Button>
                      <Button className="short" basic primary>Stow</Button>
                      <Button className="short" basic primary active>Stow</Button>
                      <Button className="short" basic primary disabled>Stow</Button>
                      <Button className="short" secondary>Apollo</Button>
                      <Button className="short" secondary active>Appollo</Button>
                      <Button className="short" secondary disabled>Appollo</Button>
                      <Button className="short" inverted primary>Satellite</Button>
                      <Button className="short" inverted primary active>Satellite</Button>
                      <Button className="short ghost">Danger</Button>
                      <Button className="short ghost" active>Danger</Button>
                      <Button className="short ghost" disabled>Danger</Button>
                      <Button className="short ghost" primary>Fuel</Button>
                      <Button className="short ghost" primary active>Fuel</Button>
                      <Button className="short ghost" primary disabled>Fuel</Button>
                  </div>
                  <div className="flex flex-column items-start">
                      <Button className="short">
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
                      <Button className="short" active>
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
                      <Button className="short" disabled>
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
                      <Button className="short" basic>
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
                      <Button className="short" basic active>
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
                      <Button className="short" basic disabled>
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
                      <Button className="short" primary>
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
                      <Button className="short" primary active>
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
                      <Button className="short" primary disabled>
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
                  <div className="flex flex-column items-start">
                      <Button className="short paused" loading>Loading</Button>
                      <Button className="short paused" loading disabled>Loading</Button>
                      <Button className="short paused" primary loading>Loading</Button>
                      <Button className="short paused" primary loading disabled>Loading</Button>
                      <Button className="short paused" basic loading>Loading</Button>
                      <Button className="short paused" basic loading disabled>Loading</Button>
                      <Button className="short paused" basic primary loading>Loading</Button>
                      <Button className="short paused" basic primary loading disabled>Loading</Button>
                      <Button className="short paused" positive>Mission Space</Button>
                      <Button className="short paused" positive active>Mission Space</Button>
                      <Button className="short paused" positive disabled>Mission Space</Button>
                      <Button className="short paused" negative>Spaceship Earth</Button>
                      <Button className="short paused" negative active>Spaceship Earth</Button>
                      <Button className="short paused" negative disabled>Spaceship Earth</Button>
                      <Button className="short paused" fluid>Fluid</Button>
                  </div>
              </div>
    ).add("icons",
          () =>
              <div className="flex flex-row">
                  <div className="flex flex-column items-start">
                      <Button icon>
                          <svg className="flex" width="24" height="24" viewBox="0 0 31 20" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M30.726 1.363a.62.62 0 0 0-.572-.075L25.06 3.14a2.482 2.482 0 0 0-1.416 1.302c-.053.115-.087.234-.122.352-.875-.248-2.501-.768-4.117-1.6-2.442-1.259-4.307-.637-5.907.583-.81.016-1.928.112-3.027.209-.7.062-1.362.119-1.9.151a2.498 2.498 0 0 0-1.643-2.247L1.83.038a.624.624 0 0 0-.838.587v12.5c0 .345.28.625.625.625h1.825c.777 0 1.5-.366 1.966-.958.249.19.543.411.852.643.73.549 1.528 1.147 1.878 1.441 2.328 1.948 5.126 4.052 5.683 4.418.52.342 1.458.706 2.17.706.28 0 .982 0 1.475-.417.509.2 1.057.19 1.567-.035.508-.224.92-.646 1.159-1.16.488.1 1.049.027 1.557-.228.477-.238.828-.6 1.016-1.022.451.041.934-.106 1.365-.436.617-.471.899-1.167.82-1.854l1.584-.877A2.504 2.504 0 0 0 28.542 15h1.826c.345 0 .625-.28.625-.625v-12.5c0-.204-.1-.395-.267-.512zM4.614 11.689a1.256 1.256 0 0 1-1.17.811H2.242V1.517l4.256 1.548c.316.116.568.347.708.652.141.305.154.647.036.961l-2.63 7.01zm18.759 4.02c-.212.163-.509.253-.64.121-.007-.007-.018-.006-.025-.012-.012-.011-.018-.026-.03-.037-.447-.353-2.45-2.4-3.687-3.691a.624.624 0 1 0-.902.864c.29.303 2.622 2.731 3.555 3.58-.07.275-.324.444-.453.509-.4.2-.818.167-.975.022-.004-.005-.011-.004-.016-.009-.008-.006-.01-.016-.019-.022-.75-.6-2.63-2.597-3.055-3.06a.625.625 0 0 0-.92.846c.02.022 1.863 2.01 2.898 2.933a1.098 1.098 0 0 1-.575.652c-.196.087-.503.132-.854-.127-.898-.761-2.699-2.678-3.053-3.058a.624.624 0 1 0-.913.854c.42.45 1.661 1.765 2.605 2.656-.105.013-.216.02-.321.02-.414 0-1.125-.264-1.485-.5-.438-.289-3.19-2.342-5.565-4.332-.36-.301-1.18-.918-1.931-1.482-.402-.302-.773-.58-1.046-.79l2.34-6.242a57.288 57.288 0 0 0 2.274-.172c.485-.043.97-.084 1.434-.12-.713.731-1.773 2.042-1.633 3.27.064.559.37 1.025.886 1.347 1.02.639 2.911.103 3.822-1.017a4.345 4.345 0 0 0 1.418-.45c.733.689 1.715 1.498 2.746 2.348 1.796 1.48 3.831 3.157 4.37 4.098.3.523-.116.899-.25 1.001zm1.072-2.01c-.833-1.114-2.638-2.604-4.397-4.054-1.173-.966-2.28-1.878-2.988-2.587a.628.628 0 0 0-.737-.11c-.637.342-.924.483-1.643.555a.625.625 0 0 0-.466.289c-.49.777-1.852 1.147-2.284.877-.246-.153-.293-.31-.307-.429-.06-.531.478-1.452 1.371-2.345 2.211-2.212 3.792-2.644 5.838-1.59 1.943 1.002 3.86 1.569 4.666 1.783.023.093.04.188.074.28L26 12.84l-1.554.86zm4.097.051c-.518 0-.989-.326-1.17-.811l-2.63-7.01a1.241 1.241 0 0 1 .036-.962c.14-.305.392-.536.708-.652l4.257-1.548V13.75h-1.2z"
                                  fillRule="nonzero"
                              />
                          </svg>
                      </Button>
                      <Button icon active>
                          <svg className="flex" width="24" height="24" viewBox="0 0 31 20" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M30.726 1.363a.62.62 0 0 0-.572-.075L25.06 3.14a2.482 2.482 0 0 0-1.416 1.302c-.053.115-.087.234-.122.352-.875-.248-2.501-.768-4.117-1.6-2.442-1.259-4.307-.637-5.907.583-.81.016-1.928.112-3.027.209-.7.062-1.362.119-1.9.151a2.498 2.498 0 0 0-1.643-2.247L1.83.038a.624.624 0 0 0-.838.587v12.5c0 .345.28.625.625.625h1.825c.777 0 1.5-.366 1.966-.958.249.19.543.411.852.643.73.549 1.528 1.147 1.878 1.441 2.328 1.948 5.126 4.052 5.683 4.418.52.342 1.458.706 2.17.706.28 0 .982 0 1.475-.417.509.2 1.057.19 1.567-.035.508-.224.92-.646 1.159-1.16.488.1 1.049.027 1.557-.228.477-.238.828-.6 1.016-1.022.451.041.934-.106 1.365-.436.617-.471.899-1.167.82-1.854l1.584-.877A2.504 2.504 0 0 0 28.542 15h1.826c.345 0 .625-.28.625-.625v-12.5c0-.204-.1-.395-.267-.512zM4.614 11.689a1.256 1.256 0 0 1-1.17.811H2.242V1.517l4.256 1.548c.316.116.568.347.708.652.141.305.154.647.036.961l-2.63 7.01zm18.759 4.02c-.212.163-.509.253-.64.121-.007-.007-.018-.006-.025-.012-.012-.011-.018-.026-.03-.037-.447-.353-2.45-2.4-3.687-3.691a.624.624 0 1 0-.902.864c.29.303 2.622 2.731 3.555 3.58-.07.275-.324.444-.453.509-.4.2-.818.167-.975.022-.004-.005-.011-.004-.016-.009-.008-.006-.01-.016-.019-.022-.75-.6-2.63-2.597-3.055-3.06a.625.625 0 0 0-.92.846c.02.022 1.863 2.01 2.898 2.933a1.098 1.098 0 0 1-.575.652c-.196.087-.503.132-.854-.127-.898-.761-2.699-2.678-3.053-3.058a.624.624 0 1 0-.913.854c.42.45 1.661 1.765 2.605 2.656-.105.013-.216.02-.321.02-.414 0-1.125-.264-1.485-.5-.438-.289-3.19-2.342-5.565-4.332-.36-.301-1.18-.918-1.931-1.482-.402-.302-.773-.58-1.046-.79l2.34-6.242a57.288 57.288 0 0 0 2.274-.172c.485-.043.97-.084 1.434-.12-.713.731-1.773 2.042-1.633 3.27.064.559.37 1.025.886 1.347 1.02.639 2.911.103 3.822-1.017a4.345 4.345 0 0 0 1.418-.45c.733.689 1.715 1.498 2.746 2.348 1.796 1.48 3.831 3.157 4.37 4.098.3.523-.116.899-.25 1.001zm1.072-2.01c-.833-1.114-2.638-2.604-4.397-4.054-1.173-.966-2.28-1.878-2.988-2.587a.628.628 0 0 0-.737-.11c-.637.342-.924.483-1.643.555a.625.625 0 0 0-.466.289c-.49.777-1.852 1.147-2.284.877-.246-.153-.293-.31-.307-.429-.06-.531.478-1.452 1.371-2.345 2.211-2.212 3.792-2.644 5.838-1.59 1.943 1.002 3.86 1.569 4.666 1.783.023.093.04.188.074.28L26 12.84l-1.554.86zm4.097.051c-.518 0-.989-.326-1.17-.811l-2.63-7.01a1.241 1.241 0 0 1 .036-.962c.14-.305.392-.536.708-.652l4.257-1.548V13.75h-1.2z"
                                  fillRule="nonzero"
                              />
                          </svg>
                      </Button>
                      <Button icon disabled>
                          <svg className="flex" width="24" height="24" viewBox="0 0 31 20" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M30.726 1.363a.62.62 0 0 0-.572-.075L25.06 3.14a2.482 2.482 0 0 0-1.416 1.302c-.053.115-.087.234-.122.352-.875-.248-2.501-.768-4.117-1.6-2.442-1.259-4.307-.637-5.907.583-.81.016-1.928.112-3.027.209-.7.062-1.362.119-1.9.151a2.498 2.498 0 0 0-1.643-2.247L1.83.038a.624.624 0 0 0-.838.587v12.5c0 .345.28.625.625.625h1.825c.777 0 1.5-.366 1.966-.958.249.19.543.411.852.643.73.549 1.528 1.147 1.878 1.441 2.328 1.948 5.126 4.052 5.683 4.418.52.342 1.458.706 2.17.706.28 0 .982 0 1.475-.417.509.2 1.057.19 1.567-.035.508-.224.92-.646 1.159-1.16.488.1 1.049.027 1.557-.228.477-.238.828-.6 1.016-1.022.451.041.934-.106 1.365-.436.617-.471.899-1.167.82-1.854l1.584-.877A2.504 2.504 0 0 0 28.542 15h1.826c.345 0 .625-.28.625-.625v-12.5c0-.204-.1-.395-.267-.512zM4.614 11.689a1.256 1.256 0 0 1-1.17.811H2.242V1.517l4.256 1.548c.316.116.568.347.708.652.141.305.154.647.036.961l-2.63 7.01zm18.759 4.02c-.212.163-.509.253-.64.121-.007-.007-.018-.006-.025-.012-.012-.011-.018-.026-.03-.037-.447-.353-2.45-2.4-3.687-3.691a.624.624 0 1 0-.902.864c.29.303 2.622 2.731 3.555 3.58-.07.275-.324.444-.453.509-.4.2-.818.167-.975.022-.004-.005-.011-.004-.016-.009-.008-.006-.01-.016-.019-.022-.75-.6-2.63-2.597-3.055-3.06a.625.625 0 0 0-.92.846c.02.022 1.863 2.01 2.898 2.933a1.098 1.098 0 0 1-.575.652c-.196.087-.503.132-.854-.127-.898-.761-2.699-2.678-3.053-3.058a.624.624 0 1 0-.913.854c.42.45 1.661 1.765 2.605 2.656-.105.013-.216.02-.321.02-.414 0-1.125-.264-1.485-.5-.438-.289-3.19-2.342-5.565-4.332-.36-.301-1.18-.918-1.931-1.482-.402-.302-.773-.58-1.046-.79l2.34-6.242a57.288 57.288 0 0 0 2.274-.172c.485-.043.97-.084 1.434-.12-.713.731-1.773 2.042-1.633 3.27.064.559.37 1.025.886 1.347 1.02.639 2.911.103 3.822-1.017a4.345 4.345 0 0 0 1.418-.45c.733.689 1.715 1.498 2.746 2.348 1.796 1.48 3.831 3.157 4.37 4.098.3.523-.116.899-.25 1.001zm1.072-2.01c-.833-1.114-2.638-2.604-4.397-4.054-1.173-.966-2.28-1.878-2.988-2.587a.628.628 0 0 0-.737-.11c-.637.342-.924.483-1.643.555a.625.625 0 0 0-.466.289c-.49.777-1.852 1.147-2.284.877-.246-.153-.293-.31-.307-.429-.06-.531.478-1.452 1.371-2.345 2.211-2.212 3.792-2.644 5.838-1.59 1.943 1.002 3.86 1.569 4.666 1.783.023.093.04.188.074.28L26 12.84l-1.554.86zm4.097.051c-.518 0-.989-.326-1.17-.811l-2.63-7.01a1.241 1.241 0 0 1 .036-.962c.14-.305.392-.536.708-.652l4.257-1.548V13.75h-1.2z"
                                  fillRule="nonzero"
                              />
                          </svg>
                      </Button>
                      <Button icon primary>
                          <svg className="flex" width="24" height="24" viewBox="0 0 31 20" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M30.726 1.363a.62.62 0 0 0-.572-.075L25.06 3.14a2.482 2.482 0 0 0-1.416 1.302c-.053.115-.087.234-.122.352-.875-.248-2.501-.768-4.117-1.6-2.442-1.259-4.307-.637-5.907.583-.81.016-1.928.112-3.027.209-.7.062-1.362.119-1.9.151a2.498 2.498 0 0 0-1.643-2.247L1.83.038a.624.624 0 0 0-.838.587v12.5c0 .345.28.625.625.625h1.825c.777 0 1.5-.366 1.966-.958.249.19.543.411.852.643.73.549 1.528 1.147 1.878 1.441 2.328 1.948 5.126 4.052 5.683 4.418.52.342 1.458.706 2.17.706.28 0 .982 0 1.475-.417.509.2 1.057.19 1.567-.035.508-.224.92-.646 1.159-1.16.488.1 1.049.027 1.557-.228.477-.238.828-.6 1.016-1.022.451.041.934-.106 1.365-.436.617-.471.899-1.167.82-1.854l1.584-.877A2.504 2.504 0 0 0 28.542 15h1.826c.345 0 .625-.28.625-.625v-12.5c0-.204-.1-.395-.267-.512zM4.614 11.689a1.256 1.256 0 0 1-1.17.811H2.242V1.517l4.256 1.548c.316.116.568.347.708.652.141.305.154.647.036.961l-2.63 7.01zm18.759 4.02c-.212.163-.509.253-.64.121-.007-.007-.018-.006-.025-.012-.012-.011-.018-.026-.03-.037-.447-.353-2.45-2.4-3.687-3.691a.624.624 0 1 0-.902.864c.29.303 2.622 2.731 3.555 3.58-.07.275-.324.444-.453.509-.4.2-.818.167-.975.022-.004-.005-.011-.004-.016-.009-.008-.006-.01-.016-.019-.022-.75-.6-2.63-2.597-3.055-3.06a.625.625 0 0 0-.92.846c.02.022 1.863 2.01 2.898 2.933a1.098 1.098 0 0 1-.575.652c-.196.087-.503.132-.854-.127-.898-.761-2.699-2.678-3.053-3.058a.624.624 0 1 0-.913.854c.42.45 1.661 1.765 2.605 2.656-.105.013-.216.02-.321.02-.414 0-1.125-.264-1.485-.5-.438-.289-3.19-2.342-5.565-4.332-.36-.301-1.18-.918-1.931-1.482-.402-.302-.773-.58-1.046-.79l2.34-6.242a57.288 57.288 0 0 0 2.274-.172c.485-.043.97-.084 1.434-.12-.713.731-1.773 2.042-1.633 3.27.064.559.37 1.025.886 1.347 1.02.639 2.911.103 3.822-1.017a4.345 4.345 0 0 0 1.418-.45c.733.689 1.715 1.498 2.746 2.348 1.796 1.48 3.831 3.157 4.37 4.098.3.523-.116.899-.25 1.001zm1.072-2.01c-.833-1.114-2.638-2.604-4.397-4.054-1.173-.966-2.28-1.878-2.988-2.587a.628.628 0 0 0-.737-.11c-.637.342-.924.483-1.643.555a.625.625 0 0 0-.466.289c-.49.777-1.852 1.147-2.284.877-.246-.153-.293-.31-.307-.429-.06-.531.478-1.452 1.371-2.345 2.211-2.212 3.792-2.644 5.838-1.59 1.943 1.002 3.86 1.569 4.666 1.783.023.093.04.188.074.28L26 12.84l-1.554.86zm4.097.051c-.518 0-.989-.326-1.17-.811l-2.63-7.01a1.241 1.241 0 0 1 .036-.962c.14-.305.392-.536.708-.652l4.257-1.548V13.75h-1.2z"
                                  fillRule="nonzero"
                              />
                          </svg>
                      </Button>
                      <Button icon primary active>
                          <svg className="flex" width="24" height="24" viewBox="0 0 31 20" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M30.726 1.363a.62.62 0 0 0-.572-.075L25.06 3.14a2.482 2.482 0 0 0-1.416 1.302c-.053.115-.087.234-.122.352-.875-.248-2.501-.768-4.117-1.6-2.442-1.259-4.307-.637-5.907.583-.81.016-1.928.112-3.027.209-.7.062-1.362.119-1.9.151a2.498 2.498 0 0 0-1.643-2.247L1.83.038a.624.624 0 0 0-.838.587v12.5c0 .345.28.625.625.625h1.825c.777 0 1.5-.366 1.966-.958.249.19.543.411.852.643.73.549 1.528 1.147 1.878 1.441 2.328 1.948 5.126 4.052 5.683 4.418.52.342 1.458.706 2.17.706.28 0 .982 0 1.475-.417.509.2 1.057.19 1.567-.035.508-.224.92-.646 1.159-1.16.488.1 1.049.027 1.557-.228.477-.238.828-.6 1.016-1.022.451.041.934-.106 1.365-.436.617-.471.899-1.167.82-1.854l1.584-.877A2.504 2.504 0 0 0 28.542 15h1.826c.345 0 .625-.28.625-.625v-12.5c0-.204-.1-.395-.267-.512zM4.614 11.689a1.256 1.256 0 0 1-1.17.811H2.242V1.517l4.256 1.548c.316.116.568.347.708.652.141.305.154.647.036.961l-2.63 7.01zm18.759 4.02c-.212.163-.509.253-.64.121-.007-.007-.018-.006-.025-.012-.012-.011-.018-.026-.03-.037-.447-.353-2.45-2.4-3.687-3.691a.624.624 0 1 0-.902.864c.29.303 2.622 2.731 3.555 3.58-.07.275-.324.444-.453.509-.4.2-.818.167-.975.022-.004-.005-.011-.004-.016-.009-.008-.006-.01-.016-.019-.022-.75-.6-2.63-2.597-3.055-3.06a.625.625 0 0 0-.92.846c.02.022 1.863 2.01 2.898 2.933a1.098 1.098 0 0 1-.575.652c-.196.087-.503.132-.854-.127-.898-.761-2.699-2.678-3.053-3.058a.624.624 0 1 0-.913.854c.42.45 1.661 1.765 2.605 2.656-.105.013-.216.02-.321.02-.414 0-1.125-.264-1.485-.5-.438-.289-3.19-2.342-5.565-4.332-.36-.301-1.18-.918-1.931-1.482-.402-.302-.773-.58-1.046-.79l2.34-6.242a57.288 57.288 0 0 0 2.274-.172c.485-.043.97-.084 1.434-.12-.713.731-1.773 2.042-1.633 3.27.064.559.37 1.025.886 1.347 1.02.639 2.911.103 3.822-1.017a4.345 4.345 0 0 0 1.418-.45c.733.689 1.715 1.498 2.746 2.348 1.796 1.48 3.831 3.157 4.37 4.098.3.523-.116.899-.25 1.001zm1.072-2.01c-.833-1.114-2.638-2.604-4.397-4.054-1.173-.966-2.28-1.878-2.988-2.587a.628.628 0 0 0-.737-.11c-.637.342-.924.483-1.643.555a.625.625 0 0 0-.466.289c-.49.777-1.852 1.147-2.284.877-.246-.153-.293-.31-.307-.429-.06-.531.478-1.452 1.371-2.345 2.211-2.212 3.792-2.644 5.838-1.59 1.943 1.002 3.86 1.569 4.666 1.783.023.093.04.188.074.28L26 12.84l-1.554.86zm4.097.051c-.518 0-.989-.326-1.17-.811l-2.63-7.01a1.241 1.241 0 0 1 .036-.962c.14-.305.392-.536.708-.652l4.257-1.548V13.75h-1.2z"
                                  fillRule="nonzero"
                              />
                          </svg>
                      </Button>
                      <Button icon primary disabled>
                          <svg className="flex" width="24" height="24" viewBox="0 0 31 20" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M30.726 1.363a.62.62 0 0 0-.572-.075L25.06 3.14a2.482 2.482 0 0 0-1.416 1.302c-.053.115-.087.234-.122.352-.875-.248-2.501-.768-4.117-1.6-2.442-1.259-4.307-.637-5.907.583-.81.016-1.928.112-3.027.209-.7.062-1.362.119-1.9.151a2.498 2.498 0 0 0-1.643-2.247L1.83.038a.624.624 0 0 0-.838.587v12.5c0 .345.28.625.625.625h1.825c.777 0 1.5-.366 1.966-.958.249.19.543.411.852.643.73.549 1.528 1.147 1.878 1.441 2.328 1.948 5.126 4.052 5.683 4.418.52.342 1.458.706 2.17.706.28 0 .982 0 1.475-.417.509.2 1.057.19 1.567-.035.508-.224.92-.646 1.159-1.16.488.1 1.049.027 1.557-.228.477-.238.828-.6 1.016-1.022.451.041.934-.106 1.365-.436.617-.471.899-1.167.82-1.854l1.584-.877A2.504 2.504 0 0 0 28.542 15h1.826c.345 0 .625-.28.625-.625v-12.5c0-.204-.1-.395-.267-.512zM4.614 11.689a1.256 1.256 0 0 1-1.17.811H2.242V1.517l4.256 1.548c.316.116.568.347.708.652.141.305.154.647.036.961l-2.63 7.01zm18.759 4.02c-.212.163-.509.253-.64.121-.007-.007-.018-.006-.025-.012-.012-.011-.018-.026-.03-.037-.447-.353-2.45-2.4-3.687-3.691a.624.624 0 1 0-.902.864c.29.303 2.622 2.731 3.555 3.58-.07.275-.324.444-.453.509-.4.2-.818.167-.975.022-.004-.005-.011-.004-.016-.009-.008-.006-.01-.016-.019-.022-.75-.6-2.63-2.597-3.055-3.06a.625.625 0 0 0-.92.846c.02.022 1.863 2.01 2.898 2.933a1.098 1.098 0 0 1-.575.652c-.196.087-.503.132-.854-.127-.898-.761-2.699-2.678-3.053-3.058a.624.624 0 1 0-.913.854c.42.45 1.661 1.765 2.605 2.656-.105.013-.216.02-.321.02-.414 0-1.125-.264-1.485-.5-.438-.289-3.19-2.342-5.565-4.332-.36-.301-1.18-.918-1.931-1.482-.402-.302-.773-.58-1.046-.79l2.34-6.242a57.288 57.288 0 0 0 2.274-.172c.485-.043.97-.084 1.434-.12-.713.731-1.773 2.042-1.633 3.27.064.559.37 1.025.886 1.347 1.02.639 2.911.103 3.822-1.017a4.345 4.345 0 0 0 1.418-.45c.733.689 1.715 1.498 2.746 2.348 1.796 1.48 3.831 3.157 4.37 4.098.3.523-.116.899-.25 1.001zm1.072-2.01c-.833-1.114-2.638-2.604-4.397-4.054-1.173-.966-2.28-1.878-2.988-2.587a.628.628 0 0 0-.737-.11c-.637.342-.924.483-1.643.555a.625.625 0 0 0-.466.289c-.49.777-1.852 1.147-2.284.877-.246-.153-.293-.31-.307-.429-.06-.531.478-1.452 1.371-2.345 2.211-2.212 3.792-2.644 5.838-1.59 1.943 1.002 3.86 1.569 4.666 1.783.023.093.04.188.074.28L26 12.84l-1.554.86zm4.097.051c-.518 0-.989-.326-1.17-.811l-2.63-7.01a1.241 1.241 0 0 1 .036-.962c.14-.305.392-.536.708-.652l4.257-1.548V13.75h-1.2z"
                                  fillRule="nonzero"
                              />
                          </svg>
                      </Button>
                      <Button icon basic primary>
                          <svg className="flex" width="24" height="24" viewBox="0 0 31 20" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M30.726 1.363a.62.62 0 0 0-.572-.075L25.06 3.14a2.482 2.482 0 0 0-1.416 1.302c-.053.115-.087.234-.122.352-.875-.248-2.501-.768-4.117-1.6-2.442-1.259-4.307-.637-5.907.583-.81.016-1.928.112-3.027.209-.7.062-1.362.119-1.9.151a2.498 2.498 0 0 0-1.643-2.247L1.83.038a.624.624 0 0 0-.838.587v12.5c0 .345.28.625.625.625h1.825c.777 0 1.5-.366 1.966-.958.249.19.543.411.852.643.73.549 1.528 1.147 1.878 1.441 2.328 1.948 5.126 4.052 5.683 4.418.52.342 1.458.706 2.17.706.28 0 .982 0 1.475-.417.509.2 1.057.19 1.567-.035.508-.224.92-.646 1.159-1.16.488.1 1.049.027 1.557-.228.477-.238.828-.6 1.016-1.022.451.041.934-.106 1.365-.436.617-.471.899-1.167.82-1.854l1.584-.877A2.504 2.504 0 0 0 28.542 15h1.826c.345 0 .625-.28.625-.625v-12.5c0-.204-.1-.395-.267-.512zM4.614 11.689a1.256 1.256 0 0 1-1.17.811H2.242V1.517l4.256 1.548c.316.116.568.347.708.652.141.305.154.647.036.961l-2.63 7.01zm18.759 4.02c-.212.163-.509.253-.64.121-.007-.007-.018-.006-.025-.012-.012-.011-.018-.026-.03-.037-.447-.353-2.45-2.4-3.687-3.691a.624.624 0 1 0-.902.864c.29.303 2.622 2.731 3.555 3.58-.07.275-.324.444-.453.509-.4.2-.818.167-.975.022-.004-.005-.011-.004-.016-.009-.008-.006-.01-.016-.019-.022-.75-.6-2.63-2.597-3.055-3.06a.625.625 0 0 0-.92.846c.02.022 1.863 2.01 2.898 2.933a1.098 1.098 0 0 1-.575.652c-.196.087-.503.132-.854-.127-.898-.761-2.699-2.678-3.053-3.058a.624.624 0 1 0-.913.854c.42.45 1.661 1.765 2.605 2.656-.105.013-.216.02-.321.02-.414 0-1.125-.264-1.485-.5-.438-.289-3.19-2.342-5.565-4.332-.36-.301-1.18-.918-1.931-1.482-.402-.302-.773-.58-1.046-.79l2.34-6.242a57.288 57.288 0 0 0 2.274-.172c.485-.043.97-.084 1.434-.12-.713.731-1.773 2.042-1.633 3.27.064.559.37 1.025.886 1.347 1.02.639 2.911.103 3.822-1.017a4.345 4.345 0 0 0 1.418-.45c.733.689 1.715 1.498 2.746 2.348 1.796 1.48 3.831 3.157 4.37 4.098.3.523-.116.899-.25 1.001zm1.072-2.01c-.833-1.114-2.638-2.604-4.397-4.054-1.173-.966-2.28-1.878-2.988-2.587a.628.628 0 0 0-.737-.11c-.637.342-.924.483-1.643.555a.625.625 0 0 0-.466.289c-.49.777-1.852 1.147-2.284.877-.246-.153-.293-.31-.307-.429-.06-.531.478-1.452 1.371-2.345 2.211-2.212 3.792-2.644 5.838-1.59 1.943 1.002 3.86 1.569 4.666 1.783.023.093.04.188.074.28L26 12.84l-1.554.86zm4.097.051c-.518 0-.989-.326-1.17-.811l-2.63-7.01a1.241 1.241 0 0 1 .036-.962c.14-.305.392-.536.708-.652l4.257-1.548V13.75h-1.2z"
                                  fillRule="nonzero"
                              />
                          </svg>
                      </Button>
                      <Button icon basic primary active>
                          <svg className="flex" width="24" height="24" viewBox="0 0 31 20" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M30.726 1.363a.62.62 0 0 0-.572-.075L25.06 3.14a2.482 2.482 0 0 0-1.416 1.302c-.053.115-.087.234-.122.352-.875-.248-2.501-.768-4.117-1.6-2.442-1.259-4.307-.637-5.907.583-.81.016-1.928.112-3.027.209-.7.062-1.362.119-1.9.151a2.498 2.498 0 0 0-1.643-2.247L1.83.038a.624.624 0 0 0-.838.587v12.5c0 .345.28.625.625.625h1.825c.777 0 1.5-.366 1.966-.958.249.19.543.411.852.643.73.549 1.528 1.147 1.878 1.441 2.328 1.948 5.126 4.052 5.683 4.418.52.342 1.458.706 2.17.706.28 0 .982 0 1.475-.417.509.2 1.057.19 1.567-.035.508-.224.92-.646 1.159-1.16.488.1 1.049.027 1.557-.228.477-.238.828-.6 1.016-1.022.451.041.934-.106 1.365-.436.617-.471.899-1.167.82-1.854l1.584-.877A2.504 2.504 0 0 0 28.542 15h1.826c.345 0 .625-.28.625-.625v-12.5c0-.204-.1-.395-.267-.512zM4.614 11.689a1.256 1.256 0 0 1-1.17.811H2.242V1.517l4.256 1.548c.316.116.568.347.708.652.141.305.154.647.036.961l-2.63 7.01zm18.759 4.02c-.212.163-.509.253-.64.121-.007-.007-.018-.006-.025-.012-.012-.011-.018-.026-.03-.037-.447-.353-2.45-2.4-3.687-3.691a.624.624 0 1 0-.902.864c.29.303 2.622 2.731 3.555 3.58-.07.275-.324.444-.453.509-.4.2-.818.167-.975.022-.004-.005-.011-.004-.016-.009-.008-.006-.01-.016-.019-.022-.75-.6-2.63-2.597-3.055-3.06a.625.625 0 0 0-.92.846c.02.022 1.863 2.01 2.898 2.933a1.098 1.098 0 0 1-.575.652c-.196.087-.503.132-.854-.127-.898-.761-2.699-2.678-3.053-3.058a.624.624 0 1 0-.913.854c.42.45 1.661 1.765 2.605 2.656-.105.013-.216.02-.321.02-.414 0-1.125-.264-1.485-.5-.438-.289-3.19-2.342-5.565-4.332-.36-.301-1.18-.918-1.931-1.482-.402-.302-.773-.58-1.046-.79l2.34-6.242a57.288 57.288 0 0 0 2.274-.172c.485-.043.97-.084 1.434-.12-.713.731-1.773 2.042-1.633 3.27.064.559.37 1.025.886 1.347 1.02.639 2.911.103 3.822-1.017a4.345 4.345 0 0 0 1.418-.45c.733.689 1.715 1.498 2.746 2.348 1.796 1.48 3.831 3.157 4.37 4.098.3.523-.116.899-.25 1.001zm1.072-2.01c-.833-1.114-2.638-2.604-4.397-4.054-1.173-.966-2.28-1.878-2.988-2.587a.628.628 0 0 0-.737-.11c-.637.342-.924.483-1.643.555a.625.625 0 0 0-.466.289c-.49.777-1.852 1.147-2.284.877-.246-.153-.293-.31-.307-.429-.06-.531.478-1.452 1.371-2.345 2.211-2.212 3.792-2.644 5.838-1.59 1.943 1.002 3.86 1.569 4.666 1.783.023.093.04.188.074.28L26 12.84l-1.554.86zm4.097.051c-.518 0-.989-.326-1.17-.811l-2.63-7.01a1.241 1.241 0 0 1 .036-.962c.14-.305.392-.536.708-.652l4.257-1.548V13.75h-1.2z"
                                  fillRule="nonzero"
                              />
                          </svg>
                      </Button>
                      <Button icon basic primary disabled>
                          <svg className="flex" width="24" height="24" viewBox="0 0 31 20" xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M30.726 1.363a.62.62 0 0 0-.572-.075L25.06 3.14a2.482 2.482 0 0 0-1.416 1.302c-.053.115-.087.234-.122.352-.875-.248-2.501-.768-4.117-1.6-2.442-1.259-4.307-.637-5.907.583-.81.016-1.928.112-3.027.209-.7.062-1.362.119-1.9.151a2.498 2.498 0 0 0-1.643-2.247L1.83.038a.624.624 0 0 0-.838.587v12.5c0 .345.28.625.625.625h1.825c.777 0 1.5-.366 1.966-.958.249.19.543.411.852.643.73.549 1.528 1.147 1.878 1.441 2.328 1.948 5.126 4.052 5.683 4.418.52.342 1.458.706 2.17.706.28 0 .982 0 1.475-.417.509.2 1.057.19 1.567-.035.508-.224.92-.646 1.159-1.16.488.1 1.049.027 1.557-.228.477-.238.828-.6 1.016-1.022.451.041.934-.106 1.365-.436.617-.471.899-1.167.82-1.854l1.584-.877A2.504 2.504 0 0 0 28.542 15h1.826c.345 0 .625-.28.625-.625v-12.5c0-.204-.1-.395-.267-.512zM4.614 11.689a1.256 1.256 0 0 1-1.17.811H2.242V1.517l4.256 1.548c.316.116.568.347.708.652.141.305.154.647.036.961l-2.63 7.01zm18.759 4.02c-.212.163-.509.253-.64.121-.007-.007-.018-.006-.025-.012-.012-.011-.018-.026-.03-.037-.447-.353-2.45-2.4-3.687-3.691a.624.624 0 1 0-.902.864c.29.303 2.622 2.731 3.555 3.58-.07.275-.324.444-.453.509-.4.2-.818.167-.975.022-.004-.005-.011-.004-.016-.009-.008-.006-.01-.016-.019-.022-.75-.6-2.63-2.597-3.055-3.06a.625.625 0 0 0-.92.846c.02.022 1.863 2.01 2.898 2.933a1.098 1.098 0 0 1-.575.652c-.196.087-.503.132-.854-.127-.898-.761-2.699-2.678-3.053-3.058a.624.624 0 1 0-.913.854c.42.45 1.661 1.765 2.605 2.656-.105.013-.216.02-.321.02-.414 0-1.125-.264-1.485-.5-.438-.289-3.19-2.342-5.565-4.332-.36-.301-1.18-.918-1.931-1.482-.402-.302-.773-.58-1.046-.79l2.34-6.242a57.288 57.288 0 0 0 2.274-.172c.485-.043.97-.084 1.434-.12-.713.731-1.773 2.042-1.633 3.27.064.559.37 1.025.886 1.347 1.02.639 2.911.103 3.822-1.017a4.345 4.345 0 0 0 1.418-.45c.733.689 1.715 1.498 2.746 2.348 1.796 1.48 3.831 3.157 4.37 4.098.3.523-.116.899-.25 1.001zm1.072-2.01c-.833-1.114-2.638-2.604-4.397-4.054-1.173-.966-2.28-1.878-2.988-2.587a.628.628 0 0 0-.737-.11c-.637.342-.924.483-1.643.555a.625.625 0 0 0-.466.289c-.49.777-1.852 1.147-2.284.877-.246-.153-.293-.31-.307-.429-.06-.531.478-1.452 1.371-2.345 2.211-2.212 3.792-2.644 5.838-1.59 1.943 1.002 3.86 1.569 4.666 1.783.023.093.04.188.074.28L26 12.84l-1.554.86zm4.097.051c-.518 0-.989-.326-1.17-.811l-2.63-7.01a1.241 1.241 0 0 1 .036-.962c.14-.305.392-.536.708-.652l4.257-1.548V13.75h-1.2z"
                                  fillRule="nonzero"
                              />
                          </svg>
                      </Button>
                      <Button icon circular size="mini">
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button icon circular size="mini" active>
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button icon circular size="mini" disabled>
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button primary icon circular size="mini">
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button primary icon circular size="mini" active>
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button primary icon circular size="mini" disabled>
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button basic icon circular size="mini">
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button basic icon circular size="mini" active>
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button basic icon circular size="mini" disabled>
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button basic primary icon circular size="mini">
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button basic primary icon circular size="mini" active>
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                      <Button basic primary icon circular size="mini" disabled>
                          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                              <g transform="rotate(45 7.207 4.793)">
                                  <rect x=".121" y="5.707" width="12" height="2" rx="1" />
                                  <rect x="5" y=".828" width="2" height="12" rx="1" />
                              </g>
                          </svg>
                      </Button>
                  </div>
              </div>
    );
