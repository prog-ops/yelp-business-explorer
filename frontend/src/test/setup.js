import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect dengan jest-dom matchers
expect.extend(matchers);

// Cleanup setelah setiap test agar DOM bersih
afterEach(() => {
    cleanup();
});
