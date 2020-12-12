
import { Panel, Component } from "@repcomm/exponent-ts";

export class StatusDisplay extends Panel {
  private nameDisplay: Component;
  private valueDisplay: Component;
  constructor () {
    super();
    this.addClasses("status-display");
    
    this.nameDisplay = new Component()
    .make("span")
    .addClasses("status-display-name")
    .mount(this);

    this.valueDisplay = new Component()
    .make("span")
    .addClasses("status-display-value")
    .mount(this);
  }
  setStatus (txt: string): this {
    this.valueDisplay.setTextContent(txt);
    return this;
  }
  setName (txt: string): this {
    txt += ":";
    this.nameDisplay.setTextContent(txt);
    return this;
  }
}

export class StatusBar extends Panel {
  private statuses: Map<string, StatusDisplay>;
  constructor () {
    super();
    this.statuses = new Map();
  }
  setStatus (name: string, stat: string): this {
    let statusDisplay: StatusDisplay;

    if (this.hasStatus(name)) {
      statusDisplay = this.getStatus(name);
    } else {
      statusDisplay = new StatusDisplay().setName(name);
      this.addStatus(name, statusDisplay);
    }

    statusDisplay.setStatus(stat);

    return this;
  }
  private addStatus (name: string, status: StatusDisplay) {
    this.statuses.set(name, status);
    status.mount(this);
  }
  hasStatus (name: string): boolean {
    return this.statuses.has(name);
  }
  getStatus (name: string): StatusDisplay {
    return this.statuses.get(name);
  }
}
