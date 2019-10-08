import { Asset } from 'parcel-bundler';
import mjml from 'mjml';
import path from 'path';

class MJMLAsset extends Asset {
  constructor(name, ...args) {
    super(name, ...args);
    this.type = 'html';
  }

  parse(code) {
    const { html } = mjml(code, { filePath: this.name });
    return html;
  }

  collectDependencies() {
    const re = /<mj-include path="([^"]*)"/g;
    let result;

    while ((result = re.exec(this.contents)) !== null) {
      if (result[1]) {
        const name = path.resolve(path.dirname(this.name), result[1]);
        this.addDependency(name, { includedInParent: true });
      }
    }
  }

  generate() {
    return this.ast;
  }
}

module.exports = MJMLAsset;
