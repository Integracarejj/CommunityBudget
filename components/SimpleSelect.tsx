
'use client';
import { MenuItem, TextField } from '@mui/material';

export default function SimpleSelect({
    label, value, onChange, options
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
    return (
        <TextField
            label={label}
            select
            size="small"
            value={value}
            onChange={(e: any) => onChange(e.target.value as string)}
            sx={{ minWidth: 180 }}
        >
            {options.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
        </TextField>
    );
}
