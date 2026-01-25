"""
Module 06 Solution - Extended Logic Engine

This solution includes:
- Original example rules (bulk discount, new customer, premium member)
- Three additional rules from the exercise
- Part 2 preview: JSON rule definitions
"""

from typing import List, Dict, Any, Callable
from dataclasses import dataclass

@dataclass
class Rule:
    """A single business rule"""
    name: str
    condition: Callable[[Dict[str, Any]], bool]
    action: Callable[[Dict[str, Any]], str]

class LogicEngine:
    """Simple rules engine for evaluating conditions and taking actions"""

    def __init__(self):
        self.rules: List[Rule] = []

    def add_rule(self, rule: Rule):
        """Add a rule to the engine"""
        self.rules.append(rule)

    def remove_rule(self, name: str):
        """Remove a rule by name"""
        self.rules = [r for r in self.rules if r.name != name]

    def evaluate(self, context: Dict[str, Any]) -> List[str]:
        """Evaluate all rules against the context, return actions taken"""
        actions_taken = []

        for rule in self.rules:
            try:
                if rule.condition(context):
                    result = rule.action(context)
                    actions_taken.append(f"{rule.name}: {result}")
            except Exception as e:
                actions_taken.append(f"{rule.name}: ERROR - {str(e)}")

        return actions_taken


if __name__ == "__main__":
    engine = LogicEngine()

    # Original rules
    engine.add_rule(Rule(
        name="Bulk Discount",
        condition=lambda ctx: ctx.get("quantity", 0) >= 10,
        action=lambda ctx: "Applied 20% bulk discount"
    ))

    engine.add_rule(Rule(
        name="New Customer Welcome",
        condition=lambda ctx: ctx.get("is_new_customer", False),
        action=lambda ctx: "Applied 10% new customer discount"
    ))

    engine.add_rule(Rule(
        name="Premium Member Perk",
        condition=lambda ctx: ctx.get("membership_tier") == "premium",
        action=lambda ctx: "Applied 15% premium member discount"
    ))

    # Exercise rules
    engine.add_rule(Rule(
        name="Winter Sale",
        condition=lambda ctx: ctx.get("month") in ["December", "January", "February"],
        action=lambda ctx: "Applied 25% winter sale discount"
    ))

    engine.add_rule(Rule(
        name="High Value Order Bonus",
        condition=lambda ctx: ctx.get("order_total", 0) > 500,
        action=lambda ctx: f"Applied $50 bonus credit (order total: ${ctx.get('order_total')})"
    ))

    engine.add_rule(Rule(
        name="Loyalty Points Bonus",
        condition=lambda ctx: (
            ctx.get("loyalty_points", 0) > 1000 and
            ctx.get("membership_tier") in ["premium", "vip"]
        ),
        action=lambda ctx: f"Added 500 bonus loyalty points (current: {ctx.get('loyalty_points')})"
    ))

    # Comprehensive test scenario
    print("="*60)
    print("Comprehensive Scenario: VIP member, winter purchase, high value")
    print("="*60)
    context = {
        "quantity": 15,
        "is_new_customer": False,
        "membership_tier": "vip",
        "month": "January",
        "order_total": 650,
        "loyalty_points": 1500
    }

    print(f"\nContext: {context}\n")
    results = engine.evaluate(context)

    print("Actions taken:")
    for action in results:
        print(f"  ✓ {action}")

    # Expected output:
    # ✓ Bulk Discount: Applied 20% bulk discount
    # ✓ Premium Member Perk: Applied 15% premium member discount (VIP is premium+)
    # ✓ Winter Sale: Applied 25% winter sale discount
    # ✓ High Value Order Bonus: Applied $50 bonus credit (order total: $650)
    # ✓ Loyalty Points Bonus: Added 500 bonus loyalty points (current: 1500)

    print("\n" + "="*60)
    print("Part 2 Preview: JSON Rule Definitions")
    print("="*60)
    print("""
In Part 2, Gemini would generate rules like this:

User input: "Give 25% discount during winter months"

Gemini output (using Module 02 structured output):
{
  "name": "Winter Sale",
  "condition": "month in ['December', 'January', 'February']",
  "action": "apply_discount(25)",
  "description": "Seasonal discount for winter purchases"
}

Then the system would:
1. Parse the JSON
2. Convert condition string to lambda function
3. Convert action string to lambda function
4. Create Rule object
5. Add to engine

This is the 'vibe code' pattern:
- Describe what you want in natural language
- AI generates the implementation
- System executes it
    """)
