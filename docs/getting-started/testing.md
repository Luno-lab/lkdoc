# Testing

This document describes LunoKit's testing approach, coverage metrics, and provides guidance for testing LunoKit integrations.

## Testing Philosophy

LunoKit's testing strategy follows these core principles:

- **Critical Path Coverage**: We prioritize testing the most important user flows and functionality over arbitrary coverage metrics
- **Real-World Value**: Tests are designed to simulate actual usage patterns rather than simply increasing coverage percentages
- **Practical Reliability**: We focus on ensuring stable, dependable behavior in real-world scenarios

## Test Coverage

LunoKit maintains high test coverage across its core modules:

| Package | Coverage | Link |
|---------|----------|------|
| @luno-kit/core | 90.82% | [View on Codecov](https://app.codecov.io/gh/Luno-lab/LunoKit/tree/main/packages%2Fcore) |
| @luno-kit/react | 83.45% | [View on Codecov](https://app.codecov.io/gh/Luno-lab/LunoKit/tree/main/packages%2Freact) |

## Package Structure

LunoKit's testing is organized around its modular architecture:

### Core Package

The `@luno-kit/core` package contains the foundational logic for:

- Wallet connector implementations
- Chain management
- Transaction handling
- State management

### React Package

The `@luno-kit/react` package provides React-specific implementations:

- React hooks
- UI components
- Context providers
- React state management

## Running Tests

To test your LunoKit integration or contribute to the project, use these commands:

```bash
# Run all tests
pnpm test

# Test specific packages
pnpm --filter @luno-kit/core test
pnpm --filter @luno-kit/react test

# Generate coverage reports
pnpm --filter @luno-kit/core test:coverage
pnpm --filter @luno-kit/react test:coverage
```

## Testing Focus Areas

Our test suite focuses on these critical areas:

| Module | Description |
|--------|-------------|
| Connectors | Wallet connection, account detection, signing capabilities |
| State Management | Configuration, state updates, and persistence |
| Hooks | React hooks functionality and lifecycle |
| Chain Management | Chain switching, network detection |
| Transaction Handling | Transaction creation, signing, submission |

## Testing Strategy

Our comprehensive testing approach includes:

- **Unit Tests**: Testing individual functions and components in isolation
- **Integration Tests**: Verifying interactions between connected components
- **Mock Implementations**: Simulating wallet behavior without real extensions

## Common Testing Scenarios

When testing a LunoKit integration, focus on these key scenarios:

1. Wallet connection and disconnection flows
2. Account detection and switching
3. Transaction signing and submission
4. Error handling (rejected requests, network issues)
5. Chain switching behavior
