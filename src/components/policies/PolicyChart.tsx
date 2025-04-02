import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Policy } from '../../services/policyService';

export const PolicyChart = ({ policies }: { policies: Policy[] }) => {
    const statusData = [
        { name: 'Approved', value: policies.filter(p => p['OPSS-Pol:Approval Status']?.includes('Approved')).length },
        { name: 'Draft', value: policies.filter(p => p['OPSS-Pol:Approval Status']?.includes('Draft')).length },
        { name: 'Other', value: policies.filter(p => !p['OPSS-Pol:Approval Status']?.includes('Approved') && !p['OPSS-Pol:Approval Status']?.includes('Draft')).length },
    ].filter(entry => entry.value > 0); // Remove entries with 0 value

    const COLORS = ['#10B981', '#F59E0B', '#6B7280'];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Policy Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth={2} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.9)', color: 'white', borderRadius: '6px' }} />
                    <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: '14px' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
