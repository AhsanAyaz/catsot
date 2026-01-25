# Logic Engine Starter Template

This is the foundation code for Module 06. It provides a working logic engine that you'll modify and extend.

## What This Does

The logic engine evaluates **rules** against **context** data.

- **Rule:** A condition (when to activate) + action (what to do)
- **Context:** Data to evaluate (e.g., user info, order details)
- **Evaluation:** Check all rules, execute actions for matching conditions

## How to Use

### 1. Run the example

```bash
python logic_engine.py
```

You should see:
```
Scenario 1: Premium member buying 12 items
Actions: ['Bulk Discount: Applied 20% bulk discount', 'Premium Member Perk: Applied 15% premium member discount']
...
```

### 2. Understand the structure

**Rule definition:**
```python
Rule(
    name="Bulk Discount",                          # Human-readable name
    condition=lambda ctx: ctx.get("quantity") >= 10,  # When to activate (returns True/False)
    action=lambda ctx: "Applied 20% bulk discount"    # What to do (returns string)
)
```

**Context (data to evaluate):**
```python
{
    "quantity": 12,
    "is_new_customer": False,
    "membership_tier": "premium"
}
```

**Evaluation:**
The engine checks each rule's condition. If True, it executes the action.

### 3. Your task (in exercise)

You'll add new rules for different business scenarios.

## Part 2 Preview

In Part 2, instead of writing rules manually, you'll use Gemini to generate them:

**Natural language input:**
"Give a discount to customers who buy more than 10 items"

**Gemini output (structured):**
```json
{
  "name": "Bulk Discount",
  "condition": "quantity >= 10",
  "action": "apply_discount(20)"
}
```

**Logic engine:** Converts JSON → Rule object and executes it

This is the "vibe code" pattern: describe what you want, AI generates the implementation.
