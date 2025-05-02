---
title: Financial dashboard for couples
date: 2025-02-14
slug: financial-dashboard-for-couples
tags:
  - prototypes
  - llm
  - software
stage: plant
---

This financial dashboard helps couples visualize and optimize their joint finances through three strategic phases:

1. **Debt Visibility & Emergency Planning**  
The interactive debt tracker shows progress on multiple loans (education, gold, visa) with real-time calculations:
- Automatic months-left estimates with compound interest modeling for student loans
- Payment impact simulator - adjust monthly payments to see payoff timelines
- Emergency fund progress bar with smart savings recommendations

2. **Phase-Based Allocation Strategy**  
The tool enforces financial discipline through phased investment approaches:
```jsx
// Phase logic from InteractiveFinancialDashboard.tsx
const formatPhaseTitle = (phase) => ({
  phase1: "Emergency Fund & Debt Clearance",
  phase2: "Investment Acceleration", 
  phase3: "Full Investment Mode"
});
```
- **Phase 1** prioritizes high-interest debt (7% education loan) while building 3-month emergency fund
- **Phase 2** shifts focus to index funds (Vanguard ETFs) with 60/40 stock/bond split
- **Phase 3** enables global market diversification (US/India/UK equities)

3. **Discretionary Spending Guardrails**  
The dashboard prevents lifestyle creep by:
- Calculating maximum safe spending after essential expenses
- Enforcing 50/30/20 budget rules through allocation locks
- Providing real-time feedback on luxury purchases' long-term impact

To experiment with different scenarios:
1. Clone the [financial-dashboard GitHub repo](https://github.com/shreyas-makes-financial-dashboard-couples)
2. Adjust income inputs in `InteractiveFinancialDashboard.tsx`
3. Modify phase allocations in the `husband`/`wife` objects to see how the output looks like.
