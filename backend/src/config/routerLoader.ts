import fs from 'fs';
import path from 'path';
import type { Express } from 'express';

export interface RouteModule {
  name: string;
  filePath: string;
  routePrefix: string;
}

export function getModuleRouters(): RouteModule[] {
  const routerDir = path.join(import.meta.dirname, '../router');
  if (!fs.existsSync(routerDir)) return [];

  const entries = fs.readdirSync(routerDir, { withFileTypes: true });
  const routers: RouteModule[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const dirPath = path.join(routerDir, entry.name);
      const files = fs.readdirSync(dirPath);
      const routerFile = files.find(f => f.endsWith('.router.ts') || f.endsWith('.router.js'));
      if (routerFile) {
        routers.push({
          name: entry.name,
          filePath: path.join(dirPath, routerFile),
          routePrefix: `/api/${entry.name}`
        });
      }
    } else if (entry.isFile() && (entry.name.endsWith('.router.ts') || entry.name.endsWith('.router.js'))) {
      const modName = entry.name.replace(/\.router\.(ts|js)$/, '');
      routers.push({
        name: modName,
        filePath: path.join(routerDir, entry.name),
        routePrefix: `/api/${modName}`
      });
    }
  }
  return routers;
}

export async function loadRoutes(app: Express): Promise<void> {
  const routers = getModuleRouters();
  for (const { routePrefix, filePath } of routers) {
    const mod = await import(filePath);
    const router = mod.default || mod.router || mod;
    app.use(routePrefix, router);
    console.log(`[AutoRouter] Registered ${routePrefix} -> ${path.relative(path.join(import.meta.dirname, '..'), filePath)}`);
  }
}

export default { loadRoutes, getModuleRouters };
