
'use client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { BudgetRow } from '../lib/models';

export default function BudgetGrid({ rows }: { rows: BudgetRow[] }) {
    const columnDefs = [
        { headerName: 'Category', field: 'category', editable: false },
        { headerName: 'Budget', field: 'budget', editable: true, valueFormatter: (p: any) => `$${(p.value ?? 0).toLocaleString()}` },
        { headerName: 'Actual', field: 'actual', editable: true, valueFormatter: (p: any) => `$${(p.value ?? 0).toLocaleString()}` },
    ];
    return (
        <div className="ag-theme-alpine" style={{ height: 220 }}>
            <AgGridReact rowData={rows} columnDefs={columnDefs} />
        </div>
    );
}
