import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { AppShell } from './components/AppShell';

// Auto-import all prototypes: src/prototypes/*/index.tsx
const prototypeModules = import.meta.glob<{ default: React.ComponentType }>(
  './prototypes/*/index.tsx',
);

// Auto-import all meta files: src/prototypes/*/meta.ts
const metaModules = import.meta.glob<{
  meta: { title: string; description: string; date: string };
}>('./prototypes/*/meta.ts', { eager: true });

export interface PrototypeInfo {
  slug: string;
  title: string;
  description: string;
  date: string;
}

// Build prototype info list from meta files
export const prototypes: PrototypeInfo[] = Object.entries(metaModules)
  .map(([path, mod]) => {
    const slug = path.match(/\.\/prototypes\/(.+)\/meta\.ts/)?.[1] ?? '';
    return {
      slug,
      ...mod.meta,
    };
  })
  .filter((p) => !p.slug.startsWith('_'))
  .sort((a, b) => b.date.localeCompare(a.date));

// Build routes from prototype modules
const prototypeRoutes: RouteObject[] = Object.entries(prototypeModules)
  .filter(([path]) => !path.includes('shablony'))
  .map(([path, loader]) => {
    const slug = path.match(/\.\/prototypes\/(.+)\/index\.tsx/)?.[1] ?? '';
    return {
      path: slug,
      lazy: async () => {
        const mod = await loader();
        return { Component: mod.default };
      },
    };
  });

// Shablony route without AppShell
const shablonyRoute: RouteObject = {
  path: 'shablony',
  lazy: async () => {
    const mod = await import('./prototypes/shablony/index.tsx');
    return { Component: mod.default };
  },
};

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppShell />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { HomePage } = await import('./components/HomePage');
            return { Component: HomePage };
          },
        },
        ...prototypeRoutes,
      ],
    },
    shablonyRoute,
  ],
  {
    basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
  },
);
