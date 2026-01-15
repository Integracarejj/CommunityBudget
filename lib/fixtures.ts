
import { Rate, BudgetRow, CensusMonth, GLExpense } from './models';

export const rates: Rate[] = [
    { unitType: 'Studio', existingRate: 5250, streetRate: 5600, careFee: 825 },
    { unitType: '1BR', existingRate: 6200, streetRate: 6400, careFee: 1025 },
    { unitType: '2BR', existingRate: 7200, streetRate: 7500, careFee: 1250 },
    { unitType: 'Deluxe', existingRate: 6900, streetRate: 7100, careFee: 1050 },
];

export const budgetRows: BudgetRow[] = [
    { category: 'Resident Revenue', budget: 585_806, actual: 610_964 },
    { category: 'Ancillary Revenue', budget: 42_975, actual: 45_650 },
    { category: 'Expenses', budget: 293_876, actual: 310_456 },
];

export const census: CensusMonth[] = [
    { month: 'Jan', totalUnits: 120, occupancyTarget: 92, losMonths: 20 },
    { month: 'Feb', totalUnits: 120, occupancyTarget: 92, losMonths: 20 },
    { month: 'Mar', totalUnits: 120, occupancyTarget: 92, losMonths: 20 },
    { month: 'Apr', totalUnits: 120, occupancyTarget: 92, losMonths: 20 },
    { month: 'May', totalUnits: 120, occupancyTarget: 92, losMonths: 20 },
    { month: 'Jun', totalUnits: 120, occupancyTarget: 92, losMonths: 20 },
];

export const glSeed: GLExpense[] = [
    { gl: '6010', name: 'Utilities', t12m: 100_000, budget: 98_500, methodology: 'ZBB' },
    { gl: '6020', name: 'Food', t12m: 180_000, budget: 175_000, methodology: 'RR' },
    { gl: '6030', name: 'Supplies', t12m: 90_000, budget: 85_000, methodology: 'SPRD' },
];
