import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { cn, valueUpdater } from '../../lib/utils'

describe('utils', () => {
    describe('cn function', () => {
        it('should merge class names correctly', () => {
            const result = cn('base-class', 'additional-class')
            expect(result).toBe('base-class additional-class')
        })

        it('should handle conditional classes', () => {
            const condition = true
            const result = cn('base-class', condition && 'conditional-class')
            expect(result).toBe('base-class conditional-class')
        })

        it('should handle false conditional classes', () => {
            const condition = false
            const result = cn('base-class', condition && 'conditional-class')
            expect(result).toBe('base-class')
        })

        it('should handle objects with boolean values', () => {
            const result = cn({
                'class-1': true,
                'class-2': false,
                'class-3': true
            })
            expect(result).toBe('class-1 class-3')
        })

        it('should handle arrays of classes', () => {
            const result = cn(['class-1', 'class-2'], 'class-3')
            expect(result).toBe('class-1 class-2 class-3')
        })

        it('should merge Tailwind classes and remove duplicates', () => {
            const result = cn('p-4 text-red-500', 'p-2 text-blue-500')
            // twMerge should handle the conflict resolution
            expect(result).toContain('text-blue-500')
            expect(result).toContain('p-2')
            expect(result).not.toContain('text-red-500')
            expect(result).not.toContain('p-4')
        })

        it('should handle empty inputs', () => {
            const result = cn()
            expect(result).toBe('')
        })

        it('should handle null and undefined inputs', () => {
            const result = cn('base-class', null, undefined, 'another-class')
            expect(result).toBe('base-class another-class')
        })
    })

    describe('valueUpdater function', () => {
        it('should update ref value directly when given a value', () => {
            const testRef = ref({ name: 'John', age: 25 })
            const newValue = { name: 'Jane', age: 30 }

            valueUpdater(newValue, testRef)

            expect(testRef.value).toEqual(newValue)
        })

        it('should update ref value using updater function', () => {
            const testRef = ref({ name: 'John', age: 25 })
            const updaterFunction = (old: typeof testRef.value) => ({
                ...old,
                age: old.age + 1
            })

            valueUpdater(updaterFunction, testRef)

            expect(testRef.value).toEqual({ name: 'John', age: 26 })
        })

        it('should handle complex object updates with updater function', () => {
            const testRef = ref({
                user: { name: 'John', settings: { theme: 'dark' } },
                lastLogin: '2023-01-01'
            })

            const updaterFunction = (old: typeof testRef.value) => ({
                ...old,
                user: {
                    ...old.user,
                    settings: {
                        ...old.user.settings,
                        theme: 'light'
                    }
                }
            })

            valueUpdater(updaterFunction, testRef)

            expect(testRef.value.user.settings.theme).toBe('light')
            expect(testRef.value.user.name).toBe('John')
            expect(testRef.value.lastLogin).toBe('2023-01-01')
        })

        it('should handle array updates', () => {
            const testRef = ref([1, 2, 3])
            const updaterFunction = (old: number[]) => [...old, 4]

            valueUpdater(updaterFunction, testRef)

            expect(testRef.value).toEqual([1, 2, 3, 4])
        })

        it('should handle string updates with object wrapper', () => {
            const testRef = ref({ value: 'hello' })
            const updaterFunction = (old: { value: string }) => ({ value: old.value + ' world' })

            valueUpdater(updaterFunction, testRef)

            expect(testRef.value.value).toBe('hello world')
        })

        it('should handle number updates with object wrapper', () => {
            const testRef = ref({ count: 5 })
            const updaterFunction = (old: { count: number }) => ({ count: old.count * 2 })

            valueUpdater(updaterFunction, testRef)

            expect(testRef.value.count).toBe(10)
        })

        it('should handle direct value replacement', () => {
            const testRef = ref({ complex: { nested: { value: 'old' } } })
            const newValue = { different: { structure: { value: 'new' } } }

            valueUpdater(newValue as any, testRef)

            expect(testRef.value).toEqual(newValue)
        })
    })
}) 