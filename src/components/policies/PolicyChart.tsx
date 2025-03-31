import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Policy } from '../../services/policyService';

export const PolicyChart = ({ policies }: { policies: Policy[] }) => {
    const statusData = [
        { name: 'Approved', value: policies.filter(p => p['OPSS-Pol:Approval Status']?.includes('Approved')).length },
        { name: 'Draft', value: policies.filter(p => p['OPSS-Pol:Approval Status']?.includes('Draft')).length },
        { name: 'Other', value: policies.filter(p => !p['OPSS-Pol:Approval Status']?.includes('Approved') && !p['OPSS-Pol:Approval Status']?.includes('Draft')).length },
    ];

    const COLORS = ['#10B981', '#F59E0B', '#6B7280'];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 h-64">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Policy Status Distribution</h3>
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};