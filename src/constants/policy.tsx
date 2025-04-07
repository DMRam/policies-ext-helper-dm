// interfaces/policy.ts
export interface PolicyResponse {
    links: Link[];
    rows: PolicyRow[];
}

export interface Link {
    rel: string;
    href: string;
    type?: string;
}

export interface PolicyRow {
    fields: {
        field: PolicyField[];
    };
}

export interface PolicyField {
    id: string;
    dataType: string;
    name: string;
    hasChanged: boolean;
    value?: string | number | boolean;
    enumValue?: EnumValue;
}

export interface EnumValue {
    id: string;
    name: string;
    localizedLabel: string;
    index: number;
    hidden: boolean;
}

// Utility type to extract field values by name
export type PolicyData = {
    [key: string]: string | number | boolean | undefined;
};