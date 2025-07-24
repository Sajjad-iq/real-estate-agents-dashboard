import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock Vue Router
const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: {
        value: {
            path: '/',
            params: {},
            query: {},
            meta: {}
        }
    }
}

const mockRoute = {
    path: '/',
    params: {},
    query: {},
    meta: {}
}

// Global mocks for components
config.global.mocks = {
    $router: mockRouter,
    $route: mockRoute,
    $t: (key: string) => key,
    $i18n: {
        locale: 'en'
    }
}

// Mock console methods in tests
Object.defineProperty(window, 'console', {
    value: {
        ...console,
        log: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
    }
}) 