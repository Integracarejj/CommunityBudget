
'use client';

import React from 'react';
import Image from 'next/image';
import { useAssistant } from './AssistantProvider';

export default function AssistantCharacter() {
    const { characterAwake } = useAssistant();

    return (
        <div
            aria-label="IntegraAI character"
            style={{
                position: 'relative',
                width: 56,
                height: 56,
                transition: 'transform .25s ease',
                transform: characterAwake ? 'translateY(-4px)' : 'none'
            }}
        >
            {/* Head/Body: your IntegraCare logo in a circular badge */}
            <div
                style={{
                    width: 56, height: 56, borderRadius: 28,
                    background: 'linear-gradient(135deg,#ffffff 0%,#eef3ff 100%)',
                    display: 'grid', placeItems: 'center',
                    boxShadow: '0 6px 16px rgba(37,99,235,.35)', overflow: 'hidden',
                    border: '2px solid rgba(37,99,235,.25)'
                }}
            >
                <Image
                    src="/IntegraAI1.svg"
                    alt="IntegraAI"
                    width={34}
                    height={34}
                    priority
                    style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,.15))' }}
                />
            </div>

            {/* Arms & legs appear when awake */}
            <div style={{
                position: 'absolute', left: -10, top: 20, width: 16, height: 4, borderRadius: 2,
                background: '#2563eb', opacity: characterAwake ? 1 : 0,
                transform: characterAwake ? 'rotate(-20deg)' : 'rotate(0deg)', transition: 'all .25s ease'
            }} />
            <div style={{
                position: 'absolute', right: -10, top: 20, width: 16, height: 4, borderRadius: 2,
                background: '#2563eb', opacity: characterAwake ? 1 : 0,
                transform: characterAwake ? 'rotate(20deg)' : 'rotate(0deg)', transition: 'all .25s ease'
            }} />
            <div style={{
                position: 'absolute', left: 8, bottom: -6, width: 6, height: 16, borderRadius: 3,
                background: '#2563eb', opacity: characterAwake ? 1 : 0,
                transform: characterAwake ? 'translateY(0)' : 'translateY(8px)', transition: 'all .25s ease'
            }} />
            <div style={{
                position: 'absolute', right: 8, bottom: -6, width: 6, height: 16, borderRadius: 3,
                background: '#2563eb', opacity: characterAwake ? 1 : 0,
                transform: characterAwake ? 'translateY(0)' : 'translateY(8px)', transition: 'all .25s ease'
            }} />
        </div>
    );
}
