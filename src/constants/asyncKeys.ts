export const asyncKeys = {
  spot: (url: string) => ['spot', url],
  spots: (urls: string[]) => ['spots', urls.join('')],
  agentList: ['agentList'],
  agentThread: (type: string, kind: string, options: string) => [
    'agentThread',
    type,
    kind,
    options,
  ],
  projectStatistics: (type: string, kind: string) => [
    'projectStatistics',
    type,
    kind,
  ],
};
