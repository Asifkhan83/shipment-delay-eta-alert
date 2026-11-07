# Shipment Delay and ETA Alert System

## Problem
A shipment is delayed because of traffic, vehicle breakdown, border clearance, weather, or operational issues. Customers often discover the delay only after contacting the company.

## Solution
Automatically notify customers about delays, provide a revised ETA, explain the verified reason, and communicate the next update.

## Real-case implementation
- **Trigger:** TMS detects a revised ETA beyond the agreed delivery window.
- Obtain the reason from an authorized operational source.
- Generate an email containing the original ETA, revised ETA, reason, and corrective action.
- Escalate critical delays to the operations manager.
- Send another notification when the shipment is back on schedule.