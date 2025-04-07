// helpers/policyHelpers.ts

import { PolicyField } from "../constants/policy";

// Función para obtener el valor de un campo específico
export const getFieldValue = (fields: PolicyField[], fieldName: string): string => {
    const field = fields.find(f => f.name === fieldName);
    return field?.value?.toString() || field?.enumValue?.name || 'N/A';
};

// Función para obtener el valor de un campo de fecha
export const getDateFieldValue = (fields: PolicyField[], fieldName: string): string => {
    const field = fields.find(f => f.name === fieldName);
    if (!field?.value) return 'Unknown';
    return new Date(field.value.toString()).toLocaleDateString();
};

// Función para extraer todos los datos de la política
export const extractPolicyData = (fields: PolicyField[]) => {
    return {
        name: getFieldValue(fields, 'Name'),
        description: getFieldValue(fields, 'Description'),
        status: getFieldValue(fields, 'OPSS-Pol:Approval Status'),
        location: getFieldValue(fields, 'Location'),
        lastUpdated: getDateFieldValue(fields, 'Last Modification Date'),
        version: getFieldValue(fields, 'OPSS-Pol:Version'),
        policyType: getFieldValue(fields, 'OPSS-Pol:Type'),
        effectiveDate: getDateFieldValue(fields, 'OPSS-Pol:Effective Date'),
        expirationDate: getDateFieldValue(fields, 'OPSS-Pol:Expiration Date')
    };
};
