import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

class TestIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin = '0px'
  readonly scrollMargin = '0px'
  readonly thresholds: readonly number[] = []

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    void callback
    void options
  }

  disconnect() {}
  observe(target: Element) { void target }
  takeRecords(): IntersectionObserverEntry[] { return [] }
  unobserve(target: Element) { void target }
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((media: string): MediaQueryList => ({
    matches: false,
    media,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  })),
})

vi.stubGlobal('IntersectionObserver', TestIntersectionObserver)

afterEach(() => {
  cleanup()
})
