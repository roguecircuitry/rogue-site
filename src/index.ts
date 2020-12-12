
import { Panel, get, Component, DualPanel, runOnce, ImagePanel, Button } from "@repcomm/exponent-ts";
import { Exponent } from "@repcomm/exponent-ts/lib/exponent";

import { API } from "./api";
import { ProjectPanel } from "./components/projectpanel";
import { StatusBar } from "./components/statusbar";

runOnce();

let styles = new Component()
  .make("style")
  .setId("rogue-styles")
  .setTextContent(`
  body {
    margin:0;
    padding:0;
    overflow:hidden;
    width: 100vw;
    height: 100vh;
    display:flex;
    background-color: #121213;
    color: #b6c9ec;
    font-family: 'Courier New', Courier, monospace;
  }
  #container {
    margin: 6%;
  }
  #header {
    background-color: #1b1f2b;
  }
  #logo {
    margin: 0.3em;
  }
  #title {
    flex: 1;
    align-self: center;
    font-size: large;
  }
  #hello {
    flex: 1;
    align-self: center;
    color: #b6c9ec;
    font-size: medium;
  }
  #login-btn {
    background-color: #212635;
    color: inherit;
    margin: 0.3em;
    border-radius: 0.5em;
  }
  #login-btn:hover {
    background-color: #141720;
  }
  #content {
    background-color: #1b1f2b;
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
    flex-direction: column;
  }
  #status-bar {
    background-color:black;
  }
  .status-display {
    flex: 1;
    background-color: #3a6c2c;
    flex-direction: column;
  }
  #status-bar > .status-display:nth-child(3n+1) {
    background-color: #62afb3;
  }
  #status-bar > .status-display:nth-child(3n+2) {
    background-color: #9d8731;
  }
  #status-bar > .status-display:nth-child(3n+3) {
    background-color: #2c6c66;
  }
  .status-display-name {
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: smaller;
    color: #1e1e1e;
  }
  .status-display-value {
    font-size: small;
    text-align: center;
    background-color: #0009;
  }
  
  #projects {
    margin: 2em;
  }
  .project-display {
    background-color: #2c2d48;
    border-radius: 0.5em;
    margin: 0.5em;
    flex-direction: column;
    text-align: center;
    overflow: hidden;
    border-left: solid 3px #9d8731;
    border-top: solid 1px #62afb3;
  }
  .project-display-name {
    padding-top: 1em;
    padding-bottom: 1em;
    font-size: large;
    background-color: #0003;
  }
  .project-display-type {
    font-weight: bold;
    color: #e3c260;
    margin-top: 1em;
  }
  .project-display-desc {
    color: #9e9ec6;
    margin-top: 1em;
  }
  `)
  .mount(document.head);

let container = new Panel().setId("container").mount(document.body);

let headerContentSplit = new DualPanel().mount(container);

let header = new Panel()
.setId("header");

let content = new Panel()
.setId("content");

headerContentSplit.setElements(header, content)
.setDirection("column")
.setRatio(1, 8);

let logo = new ImagePanel()
.setId("logo")
.setImage("./images/logo.svg")
.setStretchRule("fit-height")
.setStyleItem("background-repeat", "no-repeat")
.setStyleItem("background-position", "0 0")
.mount(header);

let title = new Component()
.make("label")
.setId("title")
.setTextContent("The Rogue Project")
.mount(header);

if (API.isUserSignedIn()) {
  let hello = new Component()
  .make("label")
  .setId("hello")
  .setTextContent(`Hi, ${API.getUserDisplayName()}`)
  .mount(header);
} else {
  let loginBtn = new Button()
  .setId("login-btn")
  .setTextContent("User Login")
  .mount(header);
}

let statusBar = new StatusBar()
.setId("status-bar").mount(content);

statusBar.setStatus("running-builds", "1300")
.setStatus("containers", "1000")
.setStatus("most-used-language", "C")
.setStatus("monthly-builds", "390,129")
.setStatus("builds-to-date", "41,230,768")
.setStatus("up-time", "x");

let begin = Date.now() - 13 * 60 * 60 * 1000;
let enlapsed = 0;
let enlapsedDate: Date;
let enlapsedMsg = "";

setInterval(()=>{
  enlapsed = Date.now() - begin;
  enlapsedDate = new Date(enlapsed);
  enlapsedMsg = "";
  enlapsedMsg += enlapsedDate.getDay() + "d ";
  enlapsedMsg += enlapsedDate.getHours() + "h ";
  enlapsedMsg += enlapsedDate.getMinutes() + "m ";
  enlapsedMsg += enlapsedDate.getSeconds() + "s ";  

  statusBar.setStatus("up-time", enlapsedMsg);
}, 1000);

(async function () {

if (API.isUserSignedIn()) {
  let projectPanel = new ProjectPanel()
  .setStyleItem("flex", 10)
  .setId("projects").mount(content);

  for (let info of  await API.getUserProjects ()) {
    projectPanel.setProject(info.name, info);
  }
} else {
  let temp = new Panel()
  .setStyleItem("flex", 10)
  .mount(content);
}

})();