export interface PolicyResponse {
  links: Link[];
  rows: PolicyRow[];
}

interface Link {
  rel: string;
  href: string;
  type?: string;
}

interface PolicyRow {
  fields: {
      field: PolicyField[];
  };
}

interface PolicyField {
  id: string;
  dataType: string;
  name: string;
  hasChanged: boolean;
  value?: string | number | boolean;
  enumValue?: {
      id: string;
      name: string;
      localizedLabel: string;
      index: number;
      hidden: boolean;
  };
}
