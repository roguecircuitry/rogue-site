
export interface ProjectInfo {
  id: number;
  name: string;
  type: string;
  description: string;
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
          description: "A web assembly template"
        },
        {
          id: 1,
          name: "bugout",
          type: "TypeScript",
          description: "The bugout operating system"
        }
      ]);
    });
  }
}
