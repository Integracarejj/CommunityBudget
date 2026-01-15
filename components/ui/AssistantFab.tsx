
'use client';

import React from 'react';
import { Fab, Paper } from '@mui/material';
import AssistantCharacter from './AssistantCharacter';
import AssistantChat from './AssistantChat';
import AssistantDrawer from './AssistantDrawer';
import { useAssistant } from './AssistantProvider';

export default function AssistantFab() {
    const { mode, setMode, characterAwake, setCharacterAwake } = useAssistant();

    const onClick = () => {
        setCharacterAwake(true);
        setMode(mode === 'bubble' ? 'chat' : 'bubble');
    };

    return (
        <>
            {/* FAB */}
            <Fab color="primary" onClick={onClick}
                sx={{
                    position: 'fixed', right: 24, bottom: 24, width: 64, height: 64,
                    borderRadius: 2, background: 'white', boxShadow: '0 8px 28px rgba(37,99,235,.35)'
                }}>
                <AssistantCharacter />
            </Fab>

            {/* Speech balloon when it wakes */}
            {characterAwake && mode === 'bubble' && (
                <Paper elevation={3} sx={{
                    position: 'fixed', right: 100, bottom: 96, p: 1.2, borderRadius: 2
                }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>
                        Hi! How may I be of service?
                    </span>
                </Paper>
            )}

            {/* Compact chat & slide‑out ideas */}
            {mode === 'chat' && <AssistantChat />}
            <AssistantDrawer />
        </>
    );
}
