
'use client';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useStore } from '../store/useStore';

export default function RatesTable() {
    const { rates } = useStore();
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Unit Type</TableCell>
                    <TableCell align="right">Annual</TableCell>
                    <TableCell align="right">Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rates.map((r: any) => (
                    <TableRow key={r.unitType}>
                        <TableCell>{r.unitType}</TableCell>
                        <TableCell align="right">${(r.existingRate * 12).toLocaleString()}</TableCell>
                        <TableCell align="right">${(r.existingRate + r.careFee).toLocaleString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
