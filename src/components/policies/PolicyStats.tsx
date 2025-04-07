import { FaChartBar, FaCheckCircle, FaFileAlt, FaClock } from "react-icons/fa";

const statusCounts = (policies: any[] = []) => {
    return policies.reduce((acc, policy) => {
        const status = policy['OPSS-Pol:Approval Status'];
        if (status?.includes('Approved')) {
            acc.approved++;
        } else if (status?.includes('Draft')) {
            acc.draft++;
        } else {
            acc.other++;
        }
        return acc;
    }, { approved: 0, draft: 0, other: 0 });
};

const calculateAverages = (policies: any[] = []) => {
    if (!policies.length) return 0;

    const totalDays = policies.reduce((sum, policy) => {
        if (policy['Creation Date'] && policy['Last Modification Date']) {
            const created = new Date(policy['Creation Date']);
            const modified = new Date(policy['Last Modification Date']);
            return sum + Math.floor((modified.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
        }
        return sum;
    }, 0);

    return Math.round(totalDays / policies.length);
};

export default function PolicyStats({ policies }: { policies: any[] }) {
    const { approved, draft } = statusCounts(policies);
    const avgReviewDays = calculateAverages(policies);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            {/* Total Policies */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700 p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Policies</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                            {policies?.length || 0}
                        </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <FaChartBar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>
            </div>

            {/* Approved Policies */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700 p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved</p>
                        <p className="mt-1 text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
                            {approved}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {policies?.length ? `${Math.round((approved / policies.length) * 100)}%` : '0%'} of total
                        </p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                        <FaCheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                </div>
            </div>

            {/* Draft Policies */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700 p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Draft</p>
                        <p className="mt-1 text-2xl font-semibold text-amber-600 dark:text-amber-400">
                            {draft}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {policies?.length ? `${Math.round((draft / policies.length) * 100)}%` : '0%'} of total
                        </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                        <FaFileAlt className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                </div>
            </div>

            {/* Average Review Time */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700 p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Review Time</p>
                        <p className="mt-1 text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                            {avgReviewDays}d
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            From creation to approval
                        </p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                        <FaClock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}