
'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { useStore } from '../../store/useStore';
import { forecastMiMo } from '../../lib/calc';
import { communities } from '../../config/communities';

type AssistantMode = 'bubble' | 'chat';
type ConversationItem = { role: 'user' | 'assistant'; text: string };

type AssistantContextType = {
    mode: AssistantMode;
    setMode: (m: AssistantMode) => void;
    drawerOpen: boolean;
    setDrawerOpen: (o: boolean) => void;
    characterAwake: boolean;
    setCharacterAwake: (b: boolean) => void;
    convo: ConversationItem[];
    ask: (q: string) => void;
    userName: string;   // mock identity for demo
    role: 'AGM' | 'EXEC';
};

const AssistantCtx = createContext<AssistantContextType | null>(null);

// --- Simple response generator using your mock store ---
function generateResponse(q: string, ctx: ReturnType<typeof useStore>): string {
    const query = q.toLowerCase();
    if (query.includes('mi') || query.includes('move')) {
        const miMo = forecastMiMo(ctx.census);
        const totalMi = miMo.reduce((s, r) => s + r.mi, 0);
        const totalMo = miMo.reduce((s, r) => s + r.mo, 0);
        return `MI/MO outlook: ${totalMi} move-ins vs ${totalMo} move-outs over the next period. I can open the Tracking view if you want more detail.`;
    }
    if (query.includes('census')) {
        const months = ctx.census.map(x => `${x.month} ${x.occupancyTarget}%`).join(', ');
        return `Census targets by month: ${months}. Would you like a chart?`;
    }
    if (query.includes('revenue') || query.includes('expense')) {
        const rev = ctx.budget.find(b => b.category.toLowerCase().includes('revenue'))?.actual ?? 0;
        const exp = ctx.budget.find(b => b.category.toLowerCase().includes('expense'))?.actual ?? 0;
        return `Latest actuals — Revenue: $${rev.toLocaleString()}, Expenses: $${exp.toLocaleString()}. Want me to compare to budget and flag variances?`;
    }
    if (query.includes('historical') || query.includes('trend')) {
        return `Here’s a quick trend summary: rate increases and census seasonality drive most variance. I can open a trends panel or export a quick PDF recap.`;
    }
    if (query.includes('community') || query.includes('communities')) {
        const my = communities.filter(c => c.agm.toLowerCase().includes('coulter')).map(c => c.name);
        return my.length
            ? `You oversee: ${my.join(', ')}. Pick any and I’ll pull budget vs actual and census.`
            : `I couldn't find assigned communities for you in the directory.`;
    }
    if (query.includes('help') || query.includes('idea') || query.includes('suggest')) {
        return `I can suggest rate adjustments where occupancy > 92%, flag over/under staffing, and highlight GL lines trending vs T12M. Want me to open the Ideas panel?`;
    }
    return `I can help with MI/MO forecasts, census targets, revenue vs expense summaries, or community lists. Try: "Show my historical trends" or "Open the ideas panel".`;
}

export function AssistantProvider({ children }: { children: React.ReactNode }) {
    // For demo, default to Miranda (AGM). You can switch to "Larry Rouvelas" for Exec.
    const userName = 'Miranda Coulter';
    const role: 'AGM' | 'EXEC' = 'AGM';

    const store = useStore();
    const [mode, setMode] = useState<AssistantMode>('bubble');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [characterAwake, setCharacterAwake] = useState(false);
    const [convo, setConvo] = useState<ConversationItem[]>([
        { role: 'assistant', text: `Welcome ${userName.split(' ')[0]} — how may I assist you today?` }
    ]);

    const ask = (q: string) => {
        if (!q.trim()) return;
        setConvo(prev => [...prev, { role: 'user', text: q }]);
        const answer = generateResponse(q, store);
        // Simulate AI latency
        setTimeout(() => {
            setConvo(prev => [...prev, { role: 'assistant', text: answer }]);
        }, 400);
    };

    const value = useMemo(() => ({
        mode, setMode, drawerOpen, setDrawerOpen, characterAwake, setCharacterAwake, convo, ask, userName, role
    }), [mode, drawerOpen, characterAwake, convo, userName, role]);

    return <AssistantCtx.Provider value={value}>{children}</AssistantCtx.Provider>;
}

export const useAssistant = () => {
    const ctx = useContext(AssistantCtx);
    if (!ctx) throw new Error('useAssistant must be used within AssistantProvider');
    return ctx;
};
