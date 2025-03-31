import { FaFileAlt } from 'react-icons/fa';
import { ReactNode } from 'react';

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: ReactNode;
    action?: ReactNode;
}

export const EmptyState = ({
    title,
    description,
    icon = <FaFileAlt className="mx-auto h-12 w-12 text-gray-400" />,
    action
}: EmptyStateProps) => {
    return (
        <div className="text-center py-12">
            {icon}
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}

// Example error state variant
export const ErrorState = ({ error }: { error: Error }) => (
    <EmptyState
        title="Error loading content"
        description={error.message}
        icon={<FaFileAlt className="mx-auto h-12 w-12 text-red-400" />}
    />
);

// Example success state variant
export const SuccessState = ({ message }: { message: string }) => (
    <EmptyState
        title="Operation successful"
        description={message}
        icon={<FaFileAlt className="mx-auto h-12 w-12 text-green-400" />}
    />
);