"""
Simple Logic Engine for Workshop Module 06

This is the foundation for Part 2 where Gemini will generate rules from natural language.

Key Concepts:
- Rule: A condition + action pair
- Condition: A function that returns True/False when evaluated against context
- Action: A function that executes when condition is True
- Context: Dictionary of data to evaluate rules against
"""

from typing import List, Dict, Any, Callable
from dataclasses import dataclass

@dataclass
class Rule:
    """A single business rule"""
    name: str
    condition: Callable[[Dict[str, Any]], bool]  # Function that returns True/False
    action: Callable[[Dict[str, Any]], str]       # Function that executes if condition is True

class LogicEngine:
    """Simple rules engine for evaluating conditions and taking actions"""

    def __init__(self):
        self.rules: List[Rule] = []

    def add_rule(self, rule: Rule):
        """Add a rule to the engine"""
        self.rules.append(rule)

    def evaluate(self, context: Dict[str, Any]) -> List[str]:
        """
        Evaluate all rules against the context, return actions taken.

        Args:
            context: Dictionary with data to evaluate (e.g., {"quantity": 12, "user_type": "premium"})

        Returns:
            List of action results (strings describing what actions were taken)
        """
        actions_taken = []

        for rule in self.rules:
            try:
                if rule.condition(context):
                    result = rule.action(context)
                    actions_taken.append(f"{rule.name}: {result}")
            except Exception as e:
                actions_taken.append(f"{rule.name}: ERROR - {str(e)}")

        return actions_taken


# Example usage (workshop demonstration)
if __name__ == "__main__":
    # Create the engine
    engine = LogicEngine()

    # Define rules (Part 1: manually coded, Part 2: Gemini-generated)
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

    # Test the engine with different contexts
    print("Scenario 1: Premium member buying 12 items")
    context1 = {
        "quantity": 12,
        "is_new_customer": False,
        "membership_tier": "premium"
    }
    results1 = engine.evaluate(context1)
    print("Actions:", results1)
    # Expected: ['Bulk Discount: Applied 20% bulk discount', 'Premium Member Perk: Applied 15% premium member discount']

    print("\nScenario 2: New customer buying 5 items")
    context2 = {
        "quantity": 5,
        "is_new_customer": True,
        "membership_tier": "regular"
    }
    results2 = engine.evaluate(context2)
    print("Actions:", results2)
    # Expected: ['New Customer Welcome: Applied 10% new customer discount']

    print("\nScenario 3: Regular member buying 3 items")
    context3 = {
        "quantity": 3,
        "is_new_customer": False,
        "membership_tier": "regular"
    }
    results3 = engine.evaluate(context3)
    print("Actions:", results3)
    # Expected: [] (no rules matched)
