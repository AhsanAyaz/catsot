# Module 06: Logic Engine - Demonstration Guide

**Duration:** 5-7 minutes

## Introduction (1 minute)

### Opening

"Welcome to Module 06, the capstone of Part 1. We're going to build a logic engine - a rule-based system that will become the foundation for Part 2 projects."

### What you've learned so far

- **Module 01:** AI Studio basics - how to prompt Gemini
- **Module 02:** Structured output - getting JSON from AI
- **Module 04:** Context engineering - crafting better prompts

### This module connects everything

- **Part 1 (now):** Manually build rules in code
- **Part 2 (next):** AI generates these rules from natural language

This is the "vibe code" pattern - describe what you want, AI generates the implementation.

---

## Step-by-Step Demonstration (5-6 minutes)

### Step 1: Show the starter template structure (1 minute)

**Action:** Open `starter-template/logic_engine.py` in editor

**Walk through the code:**

```python
@dataclass
class Rule:
    name: str           # Human-readable rule name
    condition: callable # Function that returns True/False
    action: callable    # Function that executes when condition is True
```

**Point out:** "A rule is just condition + action. IF this happens, THEN do that."

**Walk through LogicEngine class:**

```python
class LogicEngine:
    def add_rule(self, rule: Rule)  # Add rules to the engine
    def evaluate(self, context)      # Check all rules, execute matching ones
```

**Point out:** "This is already working code, not pseudocode. You'll modify and extend it."

**Show example rules at bottom:**

```python
engine.add_rule(Rule(
    name="Bulk Discount",
    condition=lambda ctx: ctx.get("quantity", 0) >= 10,
    action=lambda ctx: "Applied 20% bulk discount"
))
```

**Point out:** "See the pattern? IF quantity >= 10, THEN apply discount. Simple business logic."

---

### Step 2: Run the example (1 minute)

**Action:** Execute the code

```bash
python logic_engine.py
```

**Expected output:**

```
Scenario 1: Premium member buying 12 items
Actions: ['Bulk Discount: Applied 20% bulk discount', 'Premium Member Perk: Applied 15% premium member discount']

Scenario 2: New customer buying 5 items
Actions: ['New Customer Welcome: Applied 10% new customer discount']

Scenario 3: Regular member buying 3 items
Actions: []
```

**Explain:** "The engine evaluated 3 rules against each scenario. Scenario 1 matched 2 rules, scenario 2 matched 1 rule, scenario 3 matched none."

**Point out:** "Multiple rules can fire for the same context. They're independent."

---

### Step 3: Add a new rule live (2 minutes)

**Action:** Add a "Seasonal Sale" rule after the existing rules (around line 82)

```python
engine.add_rule(Rule(
    name="Summer Sale",
    condition=lambda ctx: ctx.get("month") == "June",
    action=lambda ctx: "Applied 30% summer sale discount"
))
```

**Explain while typing:**
- "Rule name: 'Summer Sale' - descriptive"
- "Condition: IF month is June"
- "Action: THEN apply 30% discount"

**Action:** Update the test context to include the month

```python
context1 = {
    "quantity": 12,
    "is_new_customer": False,
    "membership_tier": "premium",
    "month": "June"  # Add this line
}
```

**Action:** Re-run the code

```bash
python logic_engine.py
```

**Expected output:**

```
Scenario 1: Premium member buying 12 items
Actions: ['Bulk Discount: Applied 20% bulk discount', 'Premium Member Perk: Applied 15% premium member discount', 'Summer Sale: Applied 30% summer sale discount']
```

**Point out:** "Now we see 3 rules firing. The seasonal rule is independent - it just checks the month."

**Emphasize:** "Rules are composable. You can keep adding them without modifying existing ones."

---

### Step 4: Show a complex multi-condition rule (1-2 minutes)

**Action:** Add a rule with multiple conditions

```python
engine.add_rule(Rule(
    name="VIP Flash Sale",
    condition=lambda ctx: (
        ctx.get("membership_tier") == "vip" and
        ctx.get("quantity") >= 5 and
        ctx.get("month") in ["November", "December"]
    ),
    action=lambda ctx: "Applied 40% VIP holiday flash sale"
))
```

**Explain:**
- "This rule has 3 conditions - all must be true"
- "VIP tier AND quantity >= 5 AND winter months"
- "Conditions can be as complex as your business logic needs"

**Point out:** "You can use any Python logic: and, or, not, comparisons, list membership, etc."

---

### Step 5: Preview Part 2 enhancement (1 minute)

**Action:** Show (don't code, just explain) how this will work in Part 2

**Draw or describe the flow:**

```
Part 1 (what we just did):
Developer writes rules → LogicEngine → Executes actions

Part 2 (what's next):
User describes rule → Gemini generates JSON → LogicEngine → Executes actions
```

**Example Part 2 flow:**

**User types:**
```
"Give 30% discount in June"
```

**Part 2 system:**
1. Send to Gemini with structured output (Module 02)
2. Gemini returns JSON:
   ```json
   {
     "name": "Summer Sale",
     "condition": "month == 'June'",
     "action": "apply_discount(30)"
   }
   ```
3. Convert JSON to Rule object
4. Add to engine
5. Execute on customer data

**Emphasize:** "Same logic engine we just built. The only difference is AI generates the rules instead of you manually coding them."

---

### Step 6: Visualize the connection (30 seconds)

**Show the diagram:**

```
┌─────────────────────────────────────────────┐
│ Part 1: Foundation (What We're Building)   │
│                                             │
│  Developer → Manual Rules → Logic Engine   │
│                                             │
└─────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────┐
│ Part 2: AI Enhancement (Coming Next)       │
│                                             │
│  Natural Language → Gemini → JSON Rules    │
│                   ↓                         │
│            Same Logic Engine                │
│                                             │
└─────────────────────────────────────────────┘
```

**Emphasize:** "The logic engine is the shared foundation. Part 2 adds the AI layer on top."

---

## Key Talking Points

### Foundation, not final product
"This is the shared base for Part 2 projects - whether you build a face-reactive app, camera game, or custom project, they all use this pattern."

### Vibe coding pattern
"Describe what you want, AI generates the implementation. This is the future of development."

### Structured output enables this
"Remember Module 02? JSON Schema ensures the AI generates valid rule format. That's why we needed structured output."

### Real business value
"Rule generation from natural language means business users can create logic without coding. Marketing can add seasonal sales, support can add customer policies, all without developer time."

### Part 2 options
"Next session, you'll choose: face-reactive experience, camera-based game, or build your own. All three use this logic engine pattern."

---

## Timing Notes

- **Introduction:** 1 minute
- **Step 1 (Structure):** 1 minute
- **Step 2 (Run example):** 1 minute
- **Step 3 (Add rule):** 2 minutes
- **Step 4 (Complex rule):** 1-2 minutes
- **Step 5 (Part 2 preview):** 1 minute
- **Step 6 (Visualization):** 30 seconds

**Total:** 5-7 minutes (fits within target)

---

## Transition to Exercise

"Now it's your turn. You'll add three new rules to the logic engine and design how Gemini would generate them in Part 2. Open `exercise.md` to get started."
