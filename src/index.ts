
import { Panel, get, Component, DualPanel, runOnce, ImagePanel, Button } from "@repcomm/exponent-ts";
import { Exponent } from "@repcomm/exponent-ts/lib/exponent";

import { API } from "./api";

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
    background-color: #36363e;
    font-family: 'Courier New', Courier, monospace;
  }
  #container {
    margin: 6%;
  }
  #header {
    background-color: #1b1f2b;
  }
  #logo {

  }
  #title {
    flex: 1;
    align-self: center;
    color: #b6c9ec;
    font-size: large;
  }
  #hello {
    flex: 1;
    align-self: center;
    color: #b6c9ec;
    font-size: medium;
  }
  #login-btn {
  }
  #content {
    background-color: #6e6e7d;
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
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
