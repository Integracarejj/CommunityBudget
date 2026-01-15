
import { CensusMonth, Rate, GLExpense } from './models';

export function forecastMiMo(census: CensusMonth[]) {
    return census.map(m => {
        const targetResidents = Math.round(m.totalUnits * (m.occupancyTarget / 100));
        const mo = Math.round(targetResidents / m.losMonths);
        const mi = Math.max(0, targetResidents - mo);
        return { month: m.month, mi, mo };
    });
}

export function applyRatePolicy(rates: Rate[], targetOccPct: number, rateIncPct: number) {
    const threshold = 92;
    return rates.map(r => {
        const occBump = targetOccPct > threshold ? 0.015 : 0; // +1.5% when >92% occ (demo)
        return {
            ...r,
            streetRate: Math.round(r.streetRate * (1 + occBump)),
            existingRate: Math.round(r.existingRate * (1 + rateIncPct / 100)),
            careFee: Math.round(r.careFee * (1 + rateIncPct / 100 * 0.5)),
        };
    });
}

export function computeVariance(rows: GLExpense[]) {
    return rows.map(x => ({ ...x, variance: x.budget - x.t12m }));
}
