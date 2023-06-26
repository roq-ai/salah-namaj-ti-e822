const mapping: Record<string, string> = {
  clocks: 'clock',
  invitations: 'invitation',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
