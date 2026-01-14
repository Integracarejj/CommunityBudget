# CommunityBudget
1. Objectives
	• Replace Excel-based budgeting with a database-driven portal
	• Reduce error-prone manual processes
	• Centralize business logic
	• Enable real-time visibility
	• Support future growth and automation

2. Functional Requirements
2.1 Revenue Module
	• Import unit inventory and resident roster
	• Calculate rent & care revenue
	• Implement price sheet logic
	• Apply existing + street rate adjustments
	• Forecast MI/MO using LOS & occupancy targets
	• Manage concessions (recurring, short-term, spend-down)

2.2 Expense Module
	• Import GL accounts
	• Allow ZBB, SPRD, RR, PEH methodologies
	• Display T12M actuals
	• Allow budget entry
	• Calculate variances

2.3 Census & Forecasting
	• Store monthly census
	• Generate occupancy forecasts
	• Integrate MI/MO logic

2.4 User Functions
	• Adjust rates
	• Override MI targets
	• Override care mix
	• Submit budget for review
	• Export to Excel/PDF

3. Data Requirements
Use the normalized schema above.

4. Technical Requirements
4.1 Database
	• SQL Server (Azure or on‑prem)
	• Stored procedures for heavy logic
	• Views for portal queries
4.2 Backend
	• REST API
	• Authentication via Azure AD
4.3 Front-End
	• Modern JS framework
	• Responsive UI
	• Excel-like grid controls (AG‑Grid, Handsontable)

5. Integration Requirements
	• ETL from Move‑N
	• ETL from GP
	• Rent roll import
	• HRIS import (for PEH expenses)
	• Allocations import

6. Non-Functional Requirements
	• <500ms response time
	• Role-based access
	• Detailed audit logging
	• Full export capability

7. Migration Strategy (The “Lift and Shift”)
Your IT lead will like this:
	• Step 1: Import the same data your spreadsheets already consume
	• Step 2: Move Excel formulas → SQL stored procedures
	• Step 3: Build UI screens on top of those same procedures
	• Step 4: Run the portal + Excel in parallel for 1 cycle
	• Step 5: Decommission spreadsheets
<img width="547" height="1516" alt="image" src="https://github.com/user-attachments/assets/48b6a05b-a23f-4e71-b18b-89d214f56380" />
