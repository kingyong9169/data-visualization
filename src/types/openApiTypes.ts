export type ParsedOpenAPIInfo = {
  url: string;
  name: string;
};

export type OpenAPIHeaders = {
  'x-whatap-pcode': string;
  'x-whatap-token': string;
};

export type ApiKind = 'open' | 'agent';
export type OpenAPIType = '' | 'json' | 'raw';
export type OpenAPIParamType = 'stime' | 'etime';

export type OpenAPIObj = {
  [kind in OpenAPIType]: { [key: string]: string };
};

export type OpenAPIParams = {
  [key in OpenAPIParamType]: string | number;
};
