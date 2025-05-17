export type RouteContext<T extends Record<string, string> = object> = {
  params: T;
};
