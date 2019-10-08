import { Asset } from './Asset';
import mjml = require('mjml');
import path = require('path');

class MJMLAsset extends Asset {
  type = 'html';

  parse(code: string) {
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

export = MJMLAsset;
