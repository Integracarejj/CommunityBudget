
'use client';
import Link from 'next/link';

export default function Nav() {
    return (
        <nav
            style={{
                display: 'flex',
                gap: 16,
                padding: 12,
                borderBottom: '1px solid var(--card-bd)',
                background: '#fff',
            }}
        >
            <Link href="/overview">Overview</Link>
            <Link href="/">Dashboard</Link>
        </nav>
    );
}
