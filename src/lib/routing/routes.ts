export const ROUTES = {
  public: ['/', '/blog', '/projects', '/contact'],
  authOnly: ['/dashboard', '/profile'],
  authPages: ['/login'],
} as const;

export function isRouteMatch(pathname: string, routes: readonly string[]) {
  return routes.some(route => pathname.startsWith(route));
}
