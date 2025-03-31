import {
    FaCheckCircle,
    FaFileAlt,
    FaClock,
    FaExclamationTriangle
} from 'react-icons/fa';

const statusConfig = {
    'Approved': {
        color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100',
        icon: FaCheckCircle
    },
    'Draft': {
        color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
        icon: FaFileAlt
    },
    'Rejected': {
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
        icon: FaExclamationTriangle
    },
    default: {
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        icon: FaClock
    }
};

export default function StatusBadge({ status }: { status?: string }) {
    const matchedStatus = status?.includes('Approved') ? 'Approved' :
        status?.includes('Draft') ? 'Draft' :
            status?.includes('Rejected') ? 'Rejected' : 'default';

    const { color, icon: Icon } = statusConfig[matchedStatus];

    return (
        <span className={`inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
            <Icon className="h-3 w-3 mr-1" />
            {status || 'Pending'}
        </span>
    );
}