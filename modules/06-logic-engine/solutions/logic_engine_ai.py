"""
Module 06 Solution - AI-Powered Logic Engine
=============================================

This solution demonstrates the "vibe coding" pattern:
- User describes rules in natural language
- Gemini generates structured rule definitions
- Logic engine executes the rules

Uses multi-key rotation for workshop resilience:
- 40 participants hitting the API = fast quota exhaustion
- Multiple keys with automatic fallback = continuous availability

Usage:
    python logic_engine_ai.py

Requirements:
    pip install requests python-dotenv
"""

import os
import json
import time
import requests
from typing import List, Dict, Any, Callable, Optional
from dataclasses import dataclass

# ============================================
# QUOTA-AWARE API WRAPPER
# Multi-key rotation with automatic failover
# ============================================

class QuotaAwareGemini:
    """
    Multi-key Gemini API wrapper with automatic quota failover.
    Python equivalent of infrastructure/quota-monitor.js.
    """

    def __init__(self, keys: List[str], verbose: bool = False):
        self.keys = [k for k in keys if k]  # Filter empty keys

        if not self.keys:
            raise ValueError("QuotaAwareGemini requires at least one API key")

        self.current_index = 0
        self.request_counts = [0] * len(self.keys)
        self.error_counts = [0] * len(self.keys)
        self.verbose = verbose
        self.total_requests = 0

    def call(self, prompt: str, model: str = "gemini-2.0-flash-001") -> Dict[str, Any]:
        """
        Make an API call with automatic key rotation on quota errors.

        Args:
            prompt: The text prompt to send
            model: Model name (default: gemini-2.0-flash-001)

        Returns:
            Parsed JSON response from Gemini API

        Raises:
            Exception: If all keys are exhausted
        """
        attempts = 0
        endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

        while attempts < len(self.keys):
            key = self.keys[self.current_index]
            key_label = f"Key {self.current_index + 1}/{len(self.keys)}"

            try:
                response = requests.post(
                    endpoint,
                    headers={
                        "x-goog-api-key": key,
                        "Content-Type": "application/json"
                    },
                    json={
                        "contents": [{"parts": [{"text": prompt}]}]
                    },
                    timeout=30
                )

                # Handle quota exhaustion (429 Too Many Requests)
                if response.status_code == 429:
                    self.error_counts[self.current_index] += 1
                    if self.verbose:
                        print(f"   {key_label} quota exceeded (429), rotating...")
                    self._rotate_key()
                    attempts += 1
                    self._backoff(attempts)
                    continue

                # Handle server errors
                if response.status_code >= 500:
                    self.error_counts[self.current_index] += 1
                    if self.verbose:
                        print(f"   {key_label} server error ({response.status_code}), rotating...")
                    self._rotate_key()
                    attempts += 1
                    self._backoff(attempts)
                    continue

                # Raise for other errors (4xx except 429)
                response.raise_for_status()

                # Success
                self.request_counts[self.current_index] += 1
                self.total_requests += 1

                if self.verbose:
                    print(f"   {key_label} request #{self.total_requests} successful")

                return response.json()

            except requests.exceptions.RequestException as e:
                self.error_counts[self.current_index] += 1
                if self.verbose:
                    print(f"   {key_label} request failed: {e}")
                self._rotate_key()
                attempts += 1
                self._backoff(attempts)

        raise Exception(
            f"All {len(self.keys)} API keys exhausted or failed after {attempts} attempts. "
            "Try again in 1 minute for quota reset."
        )

    def call_structured(
        self,
        prompt: str,
        schema: Dict[str, Any],
        model: str = "gemini-2.0-flash-001"
    ) -> Dict[str, Any]:
        """
        Make an API call expecting structured JSON output.

        Args:
            prompt: The text prompt
            schema: JSON Schema for response format
            model: Model name

        Returns:
            Parsed JSON matching the schema
        """
        attempts = 0
        endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

        while attempts < len(self.keys):
            key = self.keys[self.current_index]
            key_label = f"Key {self.current_index + 1}/{len(self.keys)}"

            try:
                response = requests.post(
                    endpoint,
                    headers={
                        "x-goog-api-key": key,
                        "Content-Type": "application/json"
                    },
                    json={
                        "contents": [{"parts": [{"text": prompt}]}],
                        "generationConfig": {
                            "responseMimeType": "application/json",
                            "responseSchema": schema
                        }
                    },
                    timeout=30
                )

                if response.status_code == 429:
                    self.error_counts[self.current_index] += 1
                    if self.verbose:
                        print(f"   {key_label} quota exceeded (429), rotating...")
                    self._rotate_key()
                    attempts += 1
                    self._backoff(attempts)
                    continue

                if response.status_code >= 500:
                    self.error_counts[self.current_index] += 1
                    self._rotate_key()
                    attempts += 1
                    self._backoff(attempts)
                    continue

                response.raise_for_status()

                self.request_counts[self.current_index] += 1
                self.total_requests += 1

                result = response.json()
                json_text = result["candidates"][0]["content"]["parts"][0]["text"]
                return json.loads(json_text)

            except requests.exceptions.RequestException as e:
                self.error_counts[self.current_index] += 1
                self._rotate_key()
                attempts += 1
                self._backoff(attempts)

        raise Exception(f"All {len(self.keys)} API keys exhausted")

    def _rotate_key(self):
        """Rotate to the next API key."""
        self.current_index = (self.current_index + 1) % len(self.keys)

    def _backoff(self, attempt: int):
        """Exponential backoff delay."""
        delay = min(0.1 * (2 ** (attempt - 1)), 2.0)
        time.sleep(delay)

    def get_stats(self) -> Dict[str, Any]:
        """Get current API usage statistics."""
        total_requests = sum(self.request_counts)
        total_errors = sum(self.error_counts)

        return {
            "current_key": self.current_index + 1,
            "total_keys": len(self.keys),
            "request_counts": self.request_counts.copy(),
            "error_counts": self.error_counts.copy(),
            "total_requests": total_requests,
            "total_errors": total_errors,
            "success_rate": f"{((total_requests - total_errors) / total_requests * 100):.1f}%"
                if total_requests > 0 else "N/A"
        }

    def print_stats(self):
        """Print API usage statistics."""
        stats = self.get_stats()

        print("\n--- API Quota Stats ---")
        print(f"   Current: Key {stats['current_key']}/{stats['total_keys']}")
        print(f"   Total Requests: {stats['total_requests']}")
        print(f"   Total Errors: {stats['total_errors']}")
        print(f"   Success Rate: {stats['success_rate']}")
        print("   Per-key breakdown:")
        for i, (req, err) in enumerate(zip(stats['request_counts'], stats['error_counts'])):
            print(f"     Key {i + 1}: {req} requests, {err} errors")
        print("------------------------\n")


def create_from_env(verbose: bool = False) -> QuotaAwareGemini:
    """
    Create QuotaAwareGemini from environment variables.
    Looks for GEMINI_KEY_1, GEMINI_KEY_2, etc.
    Falls back to GEMINI_API_KEY if no numbered keys found.
    """
    keys = []

    # Collect numbered keys
    for i in range(1, 11):
        key = os.getenv(f"GEMINI_KEY_{i}")
        if key:
            keys.append(key)

    # Fallback to single key
    if not keys:
        single_key = os.getenv("GEMINI_API_KEY")
        if single_key:
            print("   No GEMINI_KEY_* found, using single GEMINI_API_KEY")
            keys.append(single_key)

    if not keys:
        raise ValueError(
            "No API keys found. Set GEMINI_KEY_1, GEMINI_KEY_2, ... "
            "or GEMINI_API_KEY environment variables."
        )

    print(f"   QuotaAwareGemini initialized with {len(keys)} key(s)")
    return QuotaAwareGemini(keys, verbose=verbose)


# ============================================
# LOGIC ENGINE (from solution.py)
# ============================================

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


# ============================================
# AI-POWERED RULE GENERATION
# The "vibe coding" pattern
# ============================================

# Schema for structured rule generation
RULE_SCHEMA = {
    "type": "object",
    "description": "A business rule definition that can be converted to code",
    "properties": {
        "name": {
            "type": "string",
            "description": "Short, descriptive name for the rule"
        },
        "condition_code": {
            "type": "string",
            "description": "Python expression that evaluates to True/False. Use ctx.get('field') pattern."
        },
        "action_message": {
            "type": "string",
            "description": "Message to return when rule triggers. Can include {placeholders} for context values."
        },
        "description": {
            "type": "string",
            "description": "Human-readable explanation of what this rule does"
        }
    },
    "required": ["name", "condition_code", "action_message"]
}


def generate_rule_from_description(
    api: QuotaAwareGemini,
    description: str
) -> Optional[Rule]:
    """
    Generate a rule from natural language description using Gemini.

    This is the "vibe coding" pattern:
    1. User describes intent in natural language
    2. AI generates structured code representation
    3. System executes the code

    Args:
        api: QuotaAwareGemini instance
        description: Natural language rule description

    Returns:
        Rule object ready to add to engine, or None on failure
    """
    prompt = f"""Generate a business rule based on this description:

"{description}"

The rule should work with a context dictionary that may contain fields like:
- quantity (int): Number of items
- order_total (float): Total order amount
- is_new_customer (bool): First-time customer flag
- membership_tier (str): "basic", "premium", or "vip"
- month (str): Current month name
- loyalty_points (int): Customer loyalty points
- category (str): Product category

Generate a valid Python condition expression using ctx.get('field') pattern.
The action_message should describe what happens when the rule triggers."""

    try:
        result = api.call_structured(prompt, RULE_SCHEMA)

        # Convert JSON rule to Python Rule object
        # SAFETY: The condition_code is evaluated in a restricted context
        condition_code = result["condition_code"]
        action_message = result["action_message"]

        def make_condition(code: str):
            """Create a condition lambda from code string."""
            def condition(ctx: Dict[str, Any]) -> bool:
                # Evaluate in restricted namespace
                return eval(code, {"__builtins__": {}}, {"ctx": ctx})
            return condition

        def make_action(template: str):
            """Create an action lambda from message template."""
            def action(ctx: Dict[str, Any]) -> str:
                # Format with context values
                try:
                    return template.format(**ctx)
                except KeyError:
                    return template
            return action

        rule = Rule(
            name=result["name"],
            condition=make_condition(condition_code),
            action=make_action(action_message)
        )

        print(f"   Generated rule: {result['name']}")
        print(f"   Condition: {condition_code}")
        print(f"   Action: {action_message}")
        if "description" in result:
            print(f"   Description: {result['description']}")

        return rule

    except Exception as e:
        print(f"   Failed to generate rule: {e}")
        return None


# ============================================
# DEMO: AI-Powered Rule Generation
# ============================================

if __name__ == "__main__":
    # Load environment variables
    try:
        from dotenv import load_dotenv
        load_dotenv("infrastructure/api-keys.env")
    except ImportError:
        print("Note: python-dotenv not installed, using system env vars")

    print("=" * 60)
    print("AI-Powered Logic Engine Demo")
    print("=" * 60)

    # Initialize API with quota awareness
    try:
        api = create_from_env(verbose=True)
    except ValueError as e:
        print(f"\nSetup required: {e}")
        print("\nTo run this demo:")
        print("1. Copy infrastructure/api-keys.env.example to infrastructure/api-keys.env")
        print("2. Add your Gemini API key(s)")
        print("3. Run: python logic_engine_ai.py")
        exit(1)

    engine = LogicEngine()

    # Natural language rule descriptions
    rule_descriptions = [
        "Give a 20% discount when someone buys 10 or more items",
        "Welcome new customers with a 10% discount",
        "Apply a winter sale of 25% during December, January, and February"
    ]

    print("\nGenerating rules from natural language...\n")

    for desc in rule_descriptions:
        print(f"\nInput: \"{desc}\"")
        rule = generate_rule_from_description(api, desc)
        if rule:
            engine.add_rule(rule)

    # Test the generated rules
    print("\n" + "=" * 60)
    print("Testing Generated Rules")
    print("=" * 60)

    test_context = {
        "quantity": 15,
        "is_new_customer": True,
        "month": "January",
        "order_total": 250.00,
        "membership_tier": "basic"
    }

    print(f"\nContext: {test_context}\n")
    results = engine.evaluate(test_context)

    print("Actions taken:")
    for action in results:
        print(f"  > {action}")

    # Print API stats
    api.print_stats()
