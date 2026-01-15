
'use client';
import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function GLGrid() {
    const { gl, setGL } = useStore();

    const columnDefs = useMemo<ColDef[]>(() => [
        { headerName: 'GL', field: 'gl', width: 100 },
        { headerName: 'Name', field: 'name', flex: 1 },
        { headerName: 'T12M', field: 't12m', width: 120, valueFormatter: (p: any) => `$${(p.value ?? 0).toLocaleString()}` },
        {
            headerName: 'Budget', field: 'budget', width: 120, editable: true,
            valueFormatter: (p: any) => `$${(p.value ?? 0).toLocaleString()}`,
            valueSetter: (p: any) => {
                const v = Number(p.newValue);
                if (Number.isNaN(v) || v < 0) return false;
                setGL((prev: any[]) => prev.map((r: any) => r.gl === p.data.gl ? { ...r, budget: v, variance: (v - r.t12m) } : r));
                return true;
            }
        },
        { headerName: 'Variance', field: 'variance', width: 120, valueFormatter: (p: any) => `$${(p.value ?? 0).toLocaleString()}` },
        { headerName: 'Method', field: 'methodology', width: 120 }
    ], [setGL]);

    return (
        <div className="ag-theme-alpine" style={{ height: 240 }}>
            <AgGridReact rowData={gl} columnDefs={columnDefs} />
        </div>
    );
}
