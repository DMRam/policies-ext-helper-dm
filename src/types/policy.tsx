export interface Policy {
    LastModifiedDate: string;
    id: string;
    Name?: string;
    Description?: string;
    Status?: string;
    // Add other fields you expect from the API
}

export interface PolicyApiResponse {
    links: Array<{
        rel: string;
        href: string;
        type?: string;
    }>;
    rows: PolicyRow[];
}

export interface PolicyField {
    id: string;
    dataType: string;
    name: string;
    hasChanged: boolean;
    value?: any;
    enumValue?: {
      id: string;
      name: string;
      localizedLabel: string;
      index: number;
      hidden: boolean;
    };
  }
  
  export interface PolicyRow {
    fields: {
      field: PolicyField[];
    };
  }
  
  // Removed duplicate declaration of PolicyApiResponse