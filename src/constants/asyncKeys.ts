export const asyncKeys = {
  spot: (url: string) => ['spot', url],
  spots: (urls: string[]) => ['spots', urls.join('')],
  agentThread: (type: string, kind: string) => ['agentThread', type, kind],
  projectStatistics: (type: string, kind: string) => [
    'projectStatistics',
    type,
    kind,
  ],
};
