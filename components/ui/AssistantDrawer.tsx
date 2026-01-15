
'use client';

import React from 'react';
import { Drawer, Box, Typography, Chip, Stack } from '@mui/material';
import { useAssistant } from './AssistantProvider';

const suggestions = [
    'Show my historical trends',
    'Summarize revenue vs expenses',
    'What is my MI/MO forecast?',
    'List communities I oversee',
    'Suggest rate adjustments',
];

export default function AssistantDrawer() {
    const { drawerOpen, setDrawerOpen, ask } = useAssistant();

    return (
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 360, p: 2 }}>
                <Typography variant="h6">IntegraAI Ideas</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: .5, mb: 2 }}>
                    Tap a prompt to run it—or ask your own follow‑up in the chat.
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                    {suggestions.map((s) => (
                        <Chip key={s} label={s} onClick={() => ask(s)} color="primary" variant="outlined" />
                    ))}
                </Stack>
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2">What can I help with?</Typography>
                    <ul style={{ paddingLeft: 18, margin: '6px 0' }}>
                        <li>Budget vs actual explanations</li>
                        <li>Occupancy & MI/MO outlook</li>
                        <li>Expense outliers vs T12M</li>
                        <li>Rate adjustment candidates</li>
                    </ul>
                </Box>
            </Box>
        </Drawer>
    );
}
