
export type UnitType = 'Studio' | '1BR' | '2BR' | 'Deluxe';

export interface Rate {
    unitType: UnitType;
    existingRate: number;
    streetRate: number;
    careFee: number;
}

export interface BudgetRow {
    category: string;
    budget: number;
    actual: number;
}

export interface CensusMonth {
    month: string;
    totalUnits: number;
    occupancyTarget: number; // %
    losMonths: number;       // length of stay assumption
}

export interface GLExpense {
    gl: string;
    name: string;
    t12m: number;
    budget: number;
    variance?: number;
    methodology: 'ZEB' | 'ZBB' | 'SPRD' | 'RR' | 'PEH';
}
