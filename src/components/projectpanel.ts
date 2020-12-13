
import { Panel, Component, Button, ImagePanel } from "@repcomm/exponent-ts";
import { ProjectInfo } from "../api";

export interface RequestBuildCallback {
  (projectId: number, projectName?: string): void;
}

export class ProjectDisplay extends Panel {
  private projectId: number;
  private nameDisplay: Component;
  private typeDisplay: Component;
  private descDisplay: Component;
  private payloadDisplay: Component;
  private buttonArea: Panel;
  private buildButton: Button;
  private loadDisplay: ImagePanel;

  constructor (projectId: number) {
    super();
    this.projectId = projectId;
    this.addClasses("project-display");
    
    this.nameDisplay = new Component()
    .make("span")
    .addClasses("project-display-name")
    .mount(this);

    this.typeDisplay = new Component()
    .make("span")
    .addClasses("project-display-type")
    .mount(this);

    this.descDisplay = new Component()
    .make("span")
    .addClasses("project-display-desc")
    .mount(this);

    this.payloadDisplay = new Component()
    .make("input")
    .setAttr("type", "url")
    .addClasses("project-display-payload")
    .mount(this);

    this.buttonArea = new Panel()
    .addClasses("project-display-button-area")
    .mount(this);

    this.buildButton = new Button()
    .setTextContent("Build")
    .addClasses("project-display-build")
    .mount(this.buttonArea);

    this.loadDisplay = new ImagePanel()
    .addClasses("project-display-load")
    .setStretchRule("fill-panel")
    .setImage("./images/load.svg")
    .setStyleItem("display", "none")
    .mount(this.buttonArea);
  }
  setInfo (info: ProjectInfo): this {
    this.setId(`project-display-${info.id}`);
    this.nameDisplay.setTextContent(info.name);
    this.typeDisplay.setTextContent(info.type);
    this.descDisplay.setTextContent(info.description);
    this.payloadDisplay.setAttr("value", info.payload);
    return this;
  }
  onBuildClicked (cb: RequestBuildCallback) {
    this.buildButton.on("click", (evt)=>{
      cb(this.projectId);
    });
  }
  disable () {
    this.buildButton.setAttr("disabled", "true");
    this.loadDisplay.setStyleItem("display", "unset");
  }
  enable () {
    this.buildButton.element.removeAttribute("disabled");
    this.loadDisplay.setStyleItem("display", "none");
  }
}

export class ProjectPanel extends Panel {
  private projects: Map<string, ProjectDisplay>;
  private requestBuildCallback: RequestBuildCallback;

  constructor () {
    super();
    this.projects = new Map();
  }
  setProject (name: string, info: ProjectInfo): this {
    let projectDisplay: ProjectDisplay;

    if (this.hasProject(name)) {
      projectDisplay = this.getProject(name);
    } else {
      projectDisplay = new ProjectDisplay(info.id);
      projectDisplay.onBuildClicked ((id)=>this.requestBuildCallback(id, name));
      this.addProject(name, projectDisplay);
    }

    projectDisplay.setInfo(info);

    return this;
  }
  onBuildClicked (cb: RequestBuildCallback): this {
    this.requestBuildCallback = cb;
    return this;
  }
  disable (projectName: string) {
    if (!this.hasProject(projectName)) throw `No project by name ${projectName}`;
    this.getProject(projectName).disable();
  }
  enable (projectName: string) {
    if (!this.hasProject(projectName)) throw `No project by name ${projectName}`;
    this.getProject(projectName).enable();
  }
  private addProject (name: string, project: ProjectDisplay) {
    this.projects.set(name, project);
    project.mount(this);
  }
  hasProject (name: string): boolean {
    return this.projects.has(name);
  }
  getProject (name: string): ProjectDisplay {
    return this.projects.get(name);
  }
}
