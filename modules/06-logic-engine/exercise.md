# Module 06: Logic Engine - Hands-on Exercise

**Duration:** 10-13 minutes

## Your Task

Extend the logic engine with custom rules and design how Gemini would generate them in Part 2.

---

## Setup (1 minute)

1. Download or copy `starter-template/logic_engine.py` to your local environment
2. Test that it runs: `python logic_engine.py`
3. Open in your code editor

---

## Option A: Guided Challenge (For beginners)

**Challenge:** Add three new rules to the discount logic engine

### Step 1: Add a "Seasonal Sale" rule (3 minutes)

**Task:** Add a rule that triggers during winter months

- Locate the rule definitions in `logic_engine.py` (around line 68, after the existing rules)
- Add this new rule:

```python
engine.add_rule(Rule(
    name="Winter Sale",
    condition=lambda ctx: ctx.get("month") in ["December", "January", "February"],
    action=lambda ctx: "Applied 25% winter sale discount"
))
```

- Update one of the test contexts to include `"month": "January"`
- Run the code and verify the rule triggers

**Success criteria:** You see "Winter Sale: Applied 25% winter sale discount" in the output

---

### Step 2: Add a "High Value Order" rule (3 minutes)

**Task:** Add a rule that triggers when order total exceeds $500

- Add this rule after the Winter Sale rule:

```python
engine.add_rule(Rule(
    name="High Value Order Bonus",
    condition=lambda ctx: ctx.get("order_total", 0) > 500,
    action=lambda ctx: f"Applied $50 bonus credit (order total: ${ctx.get('order_total')})"
))
```

- Test with a context that includes: `{"order_total": 600, ...}`
- Run and verify the rule triggers

**Success criteria:** Rule triggers and shows the order total in the action message

---

### Step 3: Add a "Loyalty Points" rule (3 minutes)

**Task:** Add a rule with multiple conditions (loyalty points AND membership tier)

- Add this rule:

```python
engine.add_rule(Rule(
    name="Loyalty Points Bonus",
    condition=lambda ctx: (
        ctx.get("loyalty_points", 0) > 1000 and
        ctx.get("membership_tier") in ["premium", "vip"]
    ),
    action=lambda ctx: f"Added 500 bonus loyalty points (current: {ctx.get('loyalty_points')})"
))
```

- Test with appropriate context (loyalty_points > 1000 and membership_tier = "premium")
- Run and verify

**Success criteria:** Multi-condition rule works correctly

---

### Step 4: Design Part 2 enhancement (2 minutes)

**Task:** For one of your rules, write how a user would describe it in natural language

**Example:**
- **Rule:** Winter Sale
- **Natural language description:** "Apply 25% discount during winter months (December, January, February)"
- **Think about:** How would Gemini convert this to the JSON format from Module 02?

**Write your design:**
- Pick one of the three rules you added
- Write the natural language description
- (Bonus) Sketch the JSON schema Gemini would need to generate

---

## Option B: Independent Challenge (For advanced users)

**Goal:** Create a logic engine for a different domain (not discounts) and design the Part 2 AI enhancement

### Domain Ideas

Choose one:

1. **Email routing** - Route emails to departments based on keywords, sender, urgency
2. **Task prioritization** - Assign priority based on deadline, requester, project
3. **Content moderation** - Flag content based on keywords, sentiment, length
4. **Workflow automation** - Trigger actions based on form data, user roles, time

### Requirements

- Define at least 4 rules for your chosen domain
- Include at least one multi-condition rule
- Test with 3 different contexts
- Write natural language descriptions for each rule (Part 2 preview)
- **(Bonus)** Design the JSON schema that Gemini would use to generate rules

### Solution Reference

See `solutions/` folder for a complete example

---

## For Fast Finishers: Going Further

### Advanced Challenges

1. **Error handling** - What if context is missing expected fields? Improve the error handling in the `evaluate` method

2. **Rule management** - Add a `remove_rule` method to the LogicEngine class

3. **JSON schema design** - Create a JSON schema for rule definitions (use your Module 02 skills)

4. **JSON to Rule conversion** - Write a function that converts JSON rule → Rule object (Part 2 preview)

5. **Rule conflicts** - What if two rules contradict each other? How would you handle priority?

### Example: JSON to Rule Converter

```python
def json_to_rule(rule_json: dict) -> Rule:
    """Convert JSON rule definition to Rule object"""
    # Parse condition string to lambda
    condition_code = f"lambda ctx: {rule_json['condition']}"
    condition_fn = eval(condition_code)

    # Parse action string to lambda
    action_code = f"lambda ctx: '{rule_json['action']}'"
    action_fn = eval(action_code)

    return Rule(
        name=rule_json["name"],
        condition=condition_fn,
        action=action_fn
    )
```

**Note:** Using `eval()` is a security risk in production. Part 2 will show safe alternatives.

---

## Success Criteria

- [ ] You have added at least 3 new rules to the logic engine
- [ ] You understand the Rule structure (name, condition, action)
- [ ] You have tested rules with different contexts
- [ ] You can envision how AI would generate rules from natural language
- [ ] You understand this is the foundation for Part 2 projects

---

## Duration Indicator

⏱️ Expected: 11 minutes | Buffer: 3 minutes

---

## What's Next

This logic engine is the shared foundation for all Part 2 projects:

- **Face-reactive experience** - Rules control visual effects based on facial expressions
- **Camera-based game** - Rules define game logic and scoring
- **Custom project** - Rules automate your specific use case

In Part 2, you'll add the AI layer that generates these rules from natural language, making the system accessible to non-developers.
