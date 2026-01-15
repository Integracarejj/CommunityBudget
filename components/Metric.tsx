
'use client';
export default function Metric({
    label, value, delta, up = true
}: { label: string; value: string; delta?: string; up?: boolean }) {
    return (
        <div className="card" style={{ padding: 16 }}>
            <div className="subtle" style={{ marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
            {delta && (
                <div style={{ marginTop: 4, fontSize: 12, color: up ? 'var(--up)' : 'var(--down)' }}>
                    {up ? '▲ ' : '▼ '}{delta}
                </div>
            )}
        </div>
    );
}
