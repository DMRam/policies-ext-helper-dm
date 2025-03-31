import { useReactToPrint } from 'react-to-print';
import { FaFileDownload } from 'react-icons/fa';
import { RefObject } from 'react';

interface ExportButtonProps {
    componentRef: RefObject<HTMLElement>;
    className?: string;
}

export default function ExportButton({ componentRef, className }: ExportButtonProps) {
    const handlePrint = useReactToPrint({
        // content: () => componentRef.current,
        pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      @media print {
        body {
          padding: 20px;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
        documentTitle: 'company-policies-report',
        onBeforePrint: () => {
            console.log('Preparing content for printing...');
            return Promise.resolve();
        },
        onAfterPrint: () => {
            console.log('Print completed or cancelled');
        }
    });

    return (
        <button
            onClick={() => handlePrint()}
            className={`inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
        >
            <FaFileDownload className="h-4 w-4 mr-2" />
            Export PDF
        </button>
    );
}