
'use client';
import { PropsWithChildren } from 'react';

export default function Card({ children, style }: PropsWithChildren<{ style?: React.CSSProperties }>) {
    return <div className="card" style={{ padding: 16, ...style }}>{children}</div>;
}
