# Module 06 Solution

This solution demonstrates the complete logic engine with all exercise rules plus Part 2 enhancement design.

## Running the Solution

```bash
python solution.py
```

## What's Included

### Original Rules (from starter template)

1. **Bulk Discount**: quantity >= 10 → 20% discount
2. **New Customer Welcome**: is_new_customer == true → 10% discount
3. **Premium Member Perk**: membership_tier == "premium" → 15% discount

### Exercise Rules (added)

1. **Winter Sale**: month in [Dec, Jan, Feb] → 25% discount
2. **High Value Order Bonus**: order_total > $500 → $50 credit
3. **Loyalty Points Bonus**: loyalty_points > 1000 AND membership premium/vip → 500 bonus points

### Enhancements

- Added `remove_rule` method to LogicEngine
- Comprehensive test scenario (triggers 5 rules simultaneously)
- Part 2 preview showing JSON rule format

---

## Part 2 Enhancement Design

### Natural Language → JSON → Rule

#### Step 1: User describes rule in natural language

```
"Apply 25% discount during winter months (December, January, February)"
```

#### Step 2: Gemini generates JSON (using Module 02 structured output)

**JSON Schema:**

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Human-readable rule name"
    },
    "condition": {
      "type": "string",
      "description": "Python expression that evaluates to True/False"
    },
    "action": {
      "type": "string",
      "description": "Function call or string to return when condition is True"
    },
    "description": {
      "type": "string",
      "description": "Explanation of what this rule does"
    }
  },
  "required": ["name", "condition", "action"]
}
```

**Gemini output:**

```json
{
  "name": "Winter Sale",
  "condition": "month in ['December', 'January', 'February']",
  "action": "apply_discount(25)",
  "description": "Seasonal 25% discount for winter purchases"
}
```

#### Step 3: Convert JSON to Rule object

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

# Usage in Part 2
rule_json = gemini_generate_rule("Apply 25% discount in winter")
rule = json_to_rule(rule_json)
engine.add_rule(rule)
```

---

## Real-World Part 2 Applications

### 1. Face-Reactive Experience (PATH-01)

**Natural language rule:** "When user is smiling, show happy particles"

**Generated rule:**
```json
{
  "name": "Happy Emotion Trigger",
  "condition": "facial_expression == 'smile' and confidence > 0.7",
  "action": "spawn_particles('happy', color='yellow')"
}
```

### 2. Camera-Based Game (PATH-02)

**Natural language rule:** "Award bonus points if player captures QR code within 10 seconds"

**Generated rule:**
```json
{
  "name": "Speed Bonus",
  "condition": "qr_captured and time_elapsed < 10",
  "action": "add_points(50, reason='speed_bonus')"
}
```

### 3. Custom Project

**Natural language rule:** "Flag social media post if it contains negative sentiment and mentions brand"

**Generated rule:**
```json
{
  "name": "Brand Mention Alert",
  "condition": "sentiment == 'negative' and 'BrandName' in text",
  "action": "create_alert(priority='high', reason='negative_brand_mention')"
}
```

---

## Key Learnings

- **Logic engines are simple but powerful** - Condition + action pattern handles many use cases
- **AI-generated rules unlock speed** - Business users can create rules without coding
- **Structured output enables reliability** - JSON Schema ensures valid rule format
- **Foundation for Part 2** - This engine is the shared base, Part 2 adds AI generation layer

---

## Further Exploration

### Rule Persistence
Save rules to database (Firebase Firestore in Part 2)

### Rule Conflicts
What if two rules contradict? Priority system needed

### Rule Testing
How to validate rules before deploying?

### Rule Analytics
Track which rules fire most often

### Security
Validate generated conditions to prevent code injection

**Note:** Using `eval()` in the JSON converter is convenient for workshops but dangerous in production. Part 2 will explore safer alternatives like:
- AST parsing with whitelisted operations
- Domain-specific language (DSL) for conditions
- Sandboxed execution environments
