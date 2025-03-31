import {
    FaCheckCircle,
    FaFileAlt,
    FaClock,
    FaExclamationTriangle
} from 'react-icons/fa';

export const statusOptions = [
    {
        value: 'Approved',
        label: 'Approved',
        icon: FaCheckCircle,
        color: 'text-emerald-500'
    },
    {
        value: 'Draft',
        label: 'Draft',
        icon: FaFileAlt,
        color: 'text-amber-500'
    },
    {
        value: 'Pending',
        label: 'Pending',
        icon: FaClock,
        color: 'text-blue-500'
    },
    {
        value: 'Rejected',
        label: 'Rejected',
        icon: FaExclamationTriangle,
        color: 'text-red-500'
    }
];