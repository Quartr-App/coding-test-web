import "@testing-library/jest-dom";

// Polyfill fetch so jest.spyOn(global, "fetch") works in jsdom
global.fetch = jest.fn();
