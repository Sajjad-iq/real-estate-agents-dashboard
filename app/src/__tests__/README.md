# Tests

This directory contains comprehensive tests for the Real Estate Agents Dashboard application.

## Test Structure

```
__tests__/
├── setup.ts                    # Global test setup and mocks
├── helpers/
│   └── mockData.ts             # Test data and helper functions
├── services/
│   ├── agentsService.test.ts   # Tests for agents service
│   └── propertiesService.test.ts # Tests for properties service
├── composables/
│   ├── useAgents.test.ts       # Tests for useAgents composable
│   └── useRTL.test.ts          # Tests for useRTL composable
├── components/
│   ├── ui/
│   │   └── StatusBadge.test.ts # Tests for StatusBadge component
│   └── properties/
│       └── PropertyStatusBadge.test.ts # Tests for PropertyStatusBadge component
└── lib/
    └── utils.test.ts           # Tests for utility functions
```

## Test Categories

### 1. Service Tests
- **agentsService.test.ts**: Tests CRUD operations, data validation, and API simulation
- **propertiesService.test.ts**: Tests property management, filtering, and data integrity

### 2. Composable Tests
- **useAgents.test.ts**: Tests reactive state management, filtering, and business logic
- **useRTL.test.ts**: Tests internationalization and RTL/LTR direction handling

### 3. Component Tests
- **StatusBadge.test.ts**: Tests UI component rendering, props, and styling
- **PropertyStatusBadge.test.ts**: Tests property-specific status rendering

### 4. Utility Tests
- **utils.test.ts**: Tests helper functions for class merging and value updating

## Key Features Tested

### Data Layer
- ✅ Service API simulation with realistic delays
- ✅ Data filtering and searching
- ✅ CRUD operations validation
- ✅ Error handling

### Business Logic
- ✅ Agent filtering by status, search, and date range
- ✅ Reactive state management
- ✅ Data manipulation and updates

### UI Components
- ✅ Component rendering and props
- ✅ Styling and CSS classes
- ✅ Internationalization integration

### Utilities
- ✅ Class name merging with Tailwind CSS
- ✅ Reactive value updates
- ✅ Type safety validation

## Running Tests

```bash
# Run all tests
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run tests with coverage
npm run test:unit -- --coverage

# Run specific test file
npm run test:unit -- src/__tests__/services/agentsService.test.ts
```

## Test Data

The tests use real data from the project's JSON files:
- `agents.json` - Real agent data
- `properties.json` - Real property data

Helper functions in `mockData.ts` provide convenient access to test data and utilities for creating test scenarios.

## Mocking Strategy

- **Services**: Mocked at the function level to test business logic
- **Vue I18n**: Mocked to return translation keys for predictable testing
- **Vue Router**: Mocked for navigation testing
- **UI Components**: Minimal mocks focusing on testing behavior over implementation

## Test Patterns

### Service Testing
```typescript
// Test async operations with timing
const startTime = Date.now()
const result = await service.method()
const endTime = Date.now()
expect(endTime - startTime).toBeGreaterThanOrEqual(expectedDelay)
```

### Composable Testing
```typescript
// Test reactive state changes
const { state, action } = useComposable()
action(newValue)
expect(state.value).toBe(expectedValue)
```

### Component Testing
```typescript
// Test component rendering and behavior
const wrapper = mount(Component, { props })
expect(wrapper.text()).toContain(expectedText)
expect(wrapper.classes()).toContain(expectedClass)
```

This testing suite provides comprehensive coverage of the application's core functionality, ensuring reliability and maintainability. 