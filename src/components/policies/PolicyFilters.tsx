import { FaSearch, FaFilter, FaCheckCircle, FaFileAlt, FaClock, FaExclamationTriangle } from "react-icons/fa";

const statusOptions = [
  {
    value: 'Approved',
    label: 'Approved',
    icon: FaCheckCircle,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
  },
  {
    value: 'Draft',
    label: 'Draft',
    icon: FaFileAlt,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20'
  },
  {
    value: 'Pending',
    label: 'Pending',
    icon: FaClock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    value: 'Rejected',
    label: 'Rejected',
    icon: FaExclamationTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  }
];

interface PolicyFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string[];
  onStatusChange: (values: string[]) => void;
}

export default function PolicyFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange
}: PolicyFiltersProps) {
  const toggleStatus = (status: string) => {
    onStatusChange(
      statusFilter.includes(status)
        ? statusFilter.filter(s => s !== status)
        : [...statusFilter, status]
    );
  };

  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700 p-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
        {/* Search Input */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border-0 bg-gray-50 dark:bg-gray-700 py-2 pl-10 pr-3 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 sm:text-sm transition-colors"
            placeholder="Search policies..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Status Filter - Perfectly aligned grid */}
        <div className="w-full md:w-auto">
          <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
            {/* Filter Label */}
            <div className="col-span-4 sm:col-span-1">
              <button
                type="button"
                className="w-full h-full flex items-center justify-center rounded-lg sm:rounded-l-lg sm:rounded-r-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <FaFilter className="h-3.5 w-3.5 mr-1.5 sm:mr-2" />
                <span className="sr-only sm:not-sr-only">Status</span>
              </button>
            </div>

            {/* Status Buttons */}
            {statusOptions.map((status, index) => (
              <div key={status.value} className="col-span-2 sm:col-span-1">
                <button
                  type="button"
                  className={`w-full h-full flex items-center justify-center border border-gray-300 dark:border-gray-600 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${statusFilter.includes(status.value)
                      ? `${status.bgColor} ${status.color} border-transparent`
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
                    } ${index === 0 ? 'rounded-tl-lg sm:rounded-tl-none' : ''
                    } ${index === 1 ? 'rounded-tr-lg sm:rounded-tr-none' : ''
                    } ${index === 2 ? 'rounded-bl-lg' : ''
                    } ${index === 3 ? 'rounded-br-lg sm:rounded-r-lg' : ''
                    }`}
                  onClick={() => toggleStatus(status.value)}
                  aria-label={`Filter by ${status.label}`}
                >
                  <status.icon className={`h-3.5 w-3.5 mr-1 sm:mr-1.5 ${statusFilter.includes(status.value) ? status.color : 'text-gray-400'}`} />
                  <span>{status.label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}