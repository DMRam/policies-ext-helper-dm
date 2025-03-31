import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Policy } from '../../services/policyService';
import StatusBadge from '../ui/StatusBadge';
import { FaBookOpen, FaCalendarAlt, FaFolder, FaTimes } from 'react-icons/fa';

const cardVariants = {
    collapsed: {
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    expanded: {
        scale: 1.01,
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 }
    }
};

const contentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { opacity: 1, height: "auto" }
};

export const PolicyCard = ({ policy }: { policy: Policy }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const lastUpdated = policy['Last Modification Date']
        ? new Date(policy['Last Modification Date']).toLocaleDateString()
        : 'Unknown';

    const toggleExpand = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const additionalDetails = Object.entries(policy)
        .filter(([key]) => !['Name', 'Description', 'Last Modification Date', 'OPSS-Pol:Approval Status', 'Location'].includes(key));

    return (
        <div className="relative w-full">
            {/* Main card with responsive sizing */}
            <motion.div
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer w-full ${isExpanded ? "fixed inset-0 m-auto z-50 h-[90vh] max-w-[96vw] sm:max-w-[90vw] md:max-w-2xl md:h-[85vh]" : "relative"
                    }`}
                variants={cardVariants}
                initial="collapsed"
                animate={isExpanded ? "expanded" : "collapsed"}
                onClick={toggleExpand}
                layout
            >
                {/* Container with proper overflow handling */}
                <div className="p-4 sm:p-5 h-full flex flex-col overflow-y-auto overflow-x-hidden">
                    {/* Header with improved close button positioning */}
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-xs border border-gray-100 dark:border-gray-600">
                            <FaBookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white break-words">
                                {policy['Name'] || 'Unnamed Policy'}
                            </h3>
                            <div className="mt-1">
                                <StatusBadge status={policy['OPSS-Pol:Approval Status']} />
                            </div>
                        </div>
                        {isExpanded && (
                            <button
                                onClick={(e) => toggleExpand(e)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 -m-2" // Increased touch area
                                aria-label="Close"
                            >
                                <FaTimes className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Description with improved mobile sizing */}
                    <motion.div
                        className="mt-3 flex-1"
                        animate={{
                            height: isExpanded ? "auto" : "4em",
                            overflow: "hidden"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-300 break-words">
                            {policy['Description']}
                        </p>
                    </motion.div>

                    {/* Metadata with better mobile constraints */}
                    <div className="mt-3 sm:mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 w-full">
                        <div className="flex items-center gap-2 flex-shrink-0 max-w-[50%]">
                            <FaCalendarAlt className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{lastUpdated}</span>
                        </div>
                        {policy['Location'] && (
                            <div className="flex items-center gap-2 min-w-0 flex-shrink max-w-[50%]">
                                <FaFolder className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">
                                    {policy['Location'].split('/').pop()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Expanded Content with improved mobile layout */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                variants={contentVariants}
                                initial="collapsed"
                                animate="expanded"
                                exit="collapsed"
                                transition={{ duration: 0.2 }}
                                className="pt-3 sm:pt-4 w-full"
                            >
                                {additionalDetails.length > 0 && (
                                    <div className="w-full">
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                            Additional Details
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full">
                                            {additionalDetails.map(([key, value]) => (
                                                <div key={key} className="break-words w-full">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{key}</p>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                                                        {value?.toString() || 'N/A'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Overlay with better touch handling */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40 touch-none"
                        onClick={toggleExpand}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};