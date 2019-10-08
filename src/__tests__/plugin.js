import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import plugin from '..';
import ParcelBundler from 'parcel-bundler';

const outDir = path.join(__dirname, '.temp');

afterEach(() => deleteFolderRecursive(outDir));

it('outputs correct html based mjml input', async () => {
  const entry = path.join(__dirname, '../__fixtures__/template.mjml');
  const bundler = plugin(
    new ParcelBundler(entry, {
      outDir,
      watch: false,
      hmr: false,
      sourceMaps: false,
      logLevel: 1,
      detailedReport: false,
      cache: false,
    }),
  );

  const bundle = await bundler.bundle();
  const content = await readFile(bundle.name, 'utf-8');
  expect(content).toMatchSnapshot();
});

it('should handle includes as well', async () => {
  const entry = path.join(__dirname, '../__fixtures__/with-includes.mjml');
  const bundler = plugin(
    new ParcelBundler(entry, {
      outDir,
      watch: false,
      hmr: false,
      sourceMaps: false,
      logLevel: 1,
      detailedReport: false,
      cache: false,
    }),
  );

  const bundle = await bundler.bundle();
  const content = await readFile(bundle.name, 'utf-8');

  const entryDeps = Array.from(bundle.entryAsset.dependencies.keys());
  expect(entryDeps).toEqual(
    expect.arrayContaining([expect.stringContaining('button.mjml')]),
  );
  expect(content).toMatchSnapshot();
});

const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);
const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);

async function deleteFolderRecursive(p) {
  if (await exists(p)) {
    await Promise.all(
      (await readdir(p)).map(async (file, index) => {
        const curPath = p + '/' + file;
        if ((await lstat(curPath)).isDirectory()) {
          await deleteFolderRecursive(curPath);
        } else {
          await unlink(curPath);
        }
      }),
    );

    await rmdir(p);
  }
}
