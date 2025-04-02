import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

// Layout component for the application
// This component wraps the main content of the application with a header and main section
export const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-xl font-bold text-gray-800">Policy Manager</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}