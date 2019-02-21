import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { sync } from 'mkdirp';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { renderModuleFactory } from '@angular/platform-server';
import { AppServerModuleNgFactory } from './dist/server/main';

const routes = [
  '/',
  '/home',
  '/about'
];
const distFolder = join(process.cwd(), 'dist', 'browser');
const indexHtml = readFileSync(join(distFolder, 'index.html')).toString();

// Run the render process for each of the routes
routes.forEach(route => renderRoute(indexHtml, route));

// This is the function that does the rendering
// and saves the result to the file system
async function renderRoute(document, route) {
  const html = await renderModuleFactory(AppServerModuleNgFactory, { document, url: route });

  const folder = join(distFolder, route);
  sync(folder);
  writeFileSync(join(folder, 'index.html'), html);
}
