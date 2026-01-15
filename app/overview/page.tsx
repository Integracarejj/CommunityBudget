
'use client';
import React, { useState } from 'react';
import { Button, TextField, MenuItem, Typography } from '@mui/material';
import { useStore } from '../../store/useStore';
import { forecastMiMo, applyRatePolicy } from '../../lib/calc';
import Card from '../../components/Card';
import Metric from '../../components/Metric';
import BudgetGrid from '../../components/BudgetGrid';
import GLGrid from '../../components/GLGrid';
import MiniLineChart from '../../components/MiniLineChart';
import RatesTable from '../../components/RatesTable';
import SimpleSelect from '../../components/SimpleSelect';

export default function Overview() {
    const { budget, census, community, setCommunity, rates, setRates } = useStore();
    const [rateInc, setRateInc] = useState<number>(2.0);
    const [targetOcc, setTargetOcc] = useState<number>(92);
    const [method, setMethod] = useState<string>('ZEB');
    const miMo = forecastMiMo(census);

    const chartData = budget.map((r: any, i: number) => ({
        name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i] || `M${i + 1}`,
        value: r.actual / 1000
    }));

    const onApply = () => {
        if (rateInc < 0 || rateInc > 15) return alert('Rate increases must be 0–15%');
        if (targetOcc < 0 || targetOcc > 100) return alert('Occupancy must be 0–100%');
        setRates(applyRatePolicy(rates, targetOcc, rateInc));
    };

    return (
        <div className="row row-2">
            {/* LEFT: Community Budget Portal */}
            <div>
                <Card style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5">Community Budget Portal</Typography>
                    </div>

                    <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                        <SimpleSelect label="Community" value={community} onChange={setCommunity} options={['Brookside', 'Hillside', 'Riverview']} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 12 }}>
                        <Metric label="Revenue" value="$6,350.8K" delta="+10.8%" up />
                        <Metric label="Expenses" value="$6,974.3K" delta="+17.9%" up />
                        <Metric label="Staffing" value="75, FTE" delta="+3.9%" up />
                        <Metric label="Margin" value="22.1%" delta="+1.1%" up />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                        <Card>
                            <div className="section-title">Budget Report</div>
                            <BudgetGrid rows={budget} />
                        </Card>
                        <Card>
                            <div className="section-title">Actual vs Budget</div>
                            <MiniLineChart data={chartData} />
                        </Card>
                    </div>

                    <Card style={{ marginTop: 12 }}>
                        <div className="section-title">Move‑In / Move‑Out Forecast</div>
                        <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th align="left">Month</th>
                                    <th align="right">Move‑Ins</th>
                                    <th align="right">Move‑Outs</th>
                                    <th align="right">Net New Units</th>
                                </tr>
                            </thead>
                            <tbody>
                                {miMo.map((r: any) => (
                                    <tr key={r.month}>
                                        <td>{r.month}</td>
                                        <td align="right">{r.mi}</td>
                                        <td align="right">{r.mo}</td>
                                        <td align="right">{r.mi - r.mo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </Card>
            </div>

            {/* RIGHT: Revenue Modeling */}
            <div>
                <Card style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5">Revenue Modeling</Typography>
                    </div>

                    <div style={{ marginTop: 12 }}>
                        <SimpleSelect label="Community" value={community} onChange={setCommunity} options={['Brookside', 'Hillside', 'Riverview']} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                        <Card>
                            <div className="section-title">Assumptions</div>
                            <div style={{ display: 'grid', gap: 10 }}>
                                <TextField label="% Rate Increase" size="small" type="number" value={rateInc} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRateInc(+e.target.value)} />
                                <TextField label="Target Occupancy (Units)" size="small" type="number" value={targetOcc} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetOcc(+e.target.value)} />
                            </div>
                        </Card>
                        <Card>
                            <div className="section-title">Budget Methodology</div>
                            <TextField select size="small" value={method} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMethod(e.target.value)} sx={{ minWidth: 140 }}>
                                {['ZEB', 'ZBB', 'SPRD', 'RR', 'PEH'].map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                            </TextField>
                            <div style={{ marginTop: 12 }}>
                                <div className="subtle">Monthly Expenses (in thousands)</div>
                                <MiniLineChart data={chartData} />
                            </div>
                        </Card>
                    </div>

                    <Card style={{ marginTop: 12 }}>
                        <div className="section-title">Rates by Unit Type</div>
                        <RatesTable />
                    </Card>

                    <Card style={{ marginTop: 12 }}>
                        <div className="section-title">Expense Builder</div>
                        <div style={{ marginTop: 12 }}>
                            <GLGrid />
                        </div>
                        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" onClick={onApply}>Apply</Button>
                        </div>
                    </Card>
                </Card>
            </div>
        </div>
    );
}
