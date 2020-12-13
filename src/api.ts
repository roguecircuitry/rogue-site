
export interface ProjectInfo {
  id: number;
  name: string;
  type: string;
  description: string;
  /**The URL to grab source archive from*/
  payload: string;
}

export interface RequestBuildResponse {
  status: string;
}

export class API {
  constructor () {

  }
  static isUserSignedIn (): boolean {
    return true;
  }
  static getUserDisplayName (): string {
    return "User Display Name";
  }
  static getUserProjects(): Promise<Array<ProjectInfo>> {
    return new Promise( async (resolve, reject)=>{
      if (!API.isUserSignedIn()) {
        reject("User is not signed in");
        return;
      }
      resolve([
        {
          id: 0,
          name: "wasm-template",
          type: "WebAssembly",
          description: "A web assembly template",
          payload: "https://github.com/RepComm/wasm-template"
        },
        {
          id: 1,
          name: "bugout",
          type: "TypeScript",
          description: "The bugout operating system",
          payload: "https://github.com/RepComm/bugout"
        }
      ]);
    });
  }
  static requestBuild (projectId: number): Promise<RequestBuildResponse> {
    return new Promise(async (resolve, reject)=>{
      let result = {
        status: "success"
      };
      setTimeout(()=>{
        resolve(result);
      }, 2000 + (Math.random()*1000) );
    });
  }
}
