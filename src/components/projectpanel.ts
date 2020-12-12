
import { Panel, Component } from "@repcomm/exponent-ts";
import { ProjectInfo } from "../api";

export class ProjectDisplay extends Panel {
  private nameDisplay: Component;
  private typeDisplay: Component;
  private descDisplay: Component;
  constructor () {
    super();
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
  }
  setInfo (info: ProjectInfo): this {
    this.setId(`project-display-${info.id}`);
    this.nameDisplay.setTextContent(info.name);
    this.typeDisplay.setTextContent(info.type);
    this.descDisplay.setTextContent(info.description);
    return this;
  }
}

export class ProjectPanel extends Panel {
  private projects: Map<string, ProjectDisplay>;
  constructor () {
    super();
    this.projects = new Map();
  }
  setProject (name: string, info: ProjectInfo): this {
    let projectDisplay: ProjectDisplay;

    if (this.hasProject(name)) {
      projectDisplay = this.getProject(name);
    } else {
      projectDisplay = new ProjectDisplay();
      this.addProject(name, projectDisplay);
    }

    projectDisplay.setInfo(info);

    return this;
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
