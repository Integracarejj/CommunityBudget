
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Paper, TextField, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAssistant } from './AssistantProvider';

export default function AssistantChat() {
    const { convo, ask, setDrawerOpen } = useAssistant();
    const [input, setInput] = useState('');
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }, [convo.length]);

    return (
        <Paper elevation={6} sx={{
            position: 'fixed', right: 24, bottom: 96, width: 360, maxHeight: 420,
            display: 'flex', flexDirection: 'column', borderRadius: 2, overflow: 'hidden'
        }}>
            <List dense ref={listRef} sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
                {convo.map((m, i) => (
                    <ListItem key={i} sx={{ alignItems: 'flex-start', py: .5 }}>
                        <ListItemText
                            primary={m.role === 'assistant' ? 'IntegraAI' : 'You'}
                            secondary={m.text}
                            primaryTypographyProps={{ fontWeight: 600, fontSize: 12 }}
                            secondaryTypographyProps={{ fontSize: 13 }}
                        />
                    </ListItem>
                ))}
            </List>
            <div style={{ display: 'flex', gap: 8, padding: 8 }}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Ask me anything (e.g., “Show my historical trends”)"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { ask(input); setInput(''); } }}
                />
                <IconButton color="primary" onClick={() => { ask(input); setInput(''); }}>
                    <SendIcon />
                </IconButton>
                <IconButton title="Open ideas panel" onClick={() => setDrawerOpen(true)}>
                    {/* light bulb */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#2563eb"><path d="M9 21h6v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.4 1.23 4.53 3.09 5.79L8 18h8l-.09-3.21A6.992 6.992 0 0 0 19 9c0-3.86-3.14-7-7-7z" /></svg>
                </IconButton>
            </div>
        </Paper>
    );
}
