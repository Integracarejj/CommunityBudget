
'use client';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function MiniLineChart(
    { data, x = 'name', y = 'value', color = '#2563eb' }:
        { data: any[]; x?: string; y?: string; color?: string }
) {
    return (
        <div style={{ width: '100%', height: 160 }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <XAxis dataKey={x} tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line type="monotone" strokeWidth={2} dataKey={y} stroke={color} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
