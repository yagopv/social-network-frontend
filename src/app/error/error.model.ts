export interface ErrorModel {
  id: string;
  links: any;
  status: string;
  code: string;
  title: string;
  detail: string;
  source: {
    pointer: string;
    parameter: string;
  };
  meta: any;
  data: ErrorDataModel;
}

export interface ErrorDataModel {
  pattern: any;
  value: string;
  key: string;
  label: string;
}
