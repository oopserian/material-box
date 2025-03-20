import { watch } from "chokidar";


export class Chokidar {
  constructor(private readonly path: string) {
    this.path = path;
  }
  static init(path: string) {
    watch(path).on('all', (event, path) => {
      console.log(event, path);
    });
  }
}
