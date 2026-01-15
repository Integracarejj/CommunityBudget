
'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { rates as seedRates, budgetRows as seedBudget, census as seedCensus, glSeed } from '../lib/fixtures';
import { computeVariance } from '../lib/calc';
import type { GLExpense, Rate, BudgetRow, CensusMonth } from '../lib/models';

type StoreValue = {
    rates: Rate[];
    setRates: React.Dispatch<React.SetStateAction<Rate[]>>;
    budget: BudgetRow[];
    setBudget: React.Dispatch<React.SetStateAction<BudgetRow[]>>;
    census: CensusMonth[];
    setCensus: React.Dispatch<React.SetStateAction<CensusMonth[]>>;
    gl: GLExpense[];
    setGL: React.Dispatch<React.SetStateAction<GLExpense[]>>;
    community: string;
    setCommunity: React.Dispatch<React.SetStateAction<string>>;
};

const StoreCtx = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [rates, setRates] = useState<Rate[]>(seedRates);
    const [budget, setBudget] = useState<BudgetRow[]>(seedBudget);
    const [census, setCensus] = useState<CensusMonth[]>(seedCensus);
    const [gl, setGL] = useState<GLExpense[]>(computeVariance(glSeed));
    const [community, setCommunity] = useState('Brookside');

    // load once
    useEffect(() => {
        const saved = localStorage.getItem('budget-demo');
        if (saved) {
            const j = JSON.parse(saved);
            if (j.rates) setRates(j.rates);
            if (j.budget) setBudget(j.budget);
            if (j.census) setCensus(j.census);
            if (j.gl) setGL(j.gl);
            if (j.community) setCommunity(j.community);
        }
    }, []);

    // save on change
    useEffect(() => {
        localStorage.setItem('budget-demo', JSON.stringify({ rates, budget, census, gl, community }));
    }, [rates, budget, census, gl, community]);

    const value = useMemo<StoreValue>(() => ({
        rates, setRates,
        budget, setBudget,
        census, setCensus,
        gl, setGL,
        community, setCommunity
    }), [rates, budget, census, gl, community]);

    // IMPORTANT: real JSX angle brackets here, not &lt; &gt;
    return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export const useStore = () => {
    const ctx = useContext(StoreCtx);
    if (!ctx) throw new Error('useStore must be used within StoreProvider');
    return ctx;
};
``
