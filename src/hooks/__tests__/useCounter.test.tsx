import { act, renderHook } from "@testing-library/react";

import useCounter from "../useCounter";

describe("useCounter", () => {
  it("should return default initial value 0", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("should accept a custom initial value", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it("increment increases count by 1", () => {
    const { result } = renderHook(() => useCounter(2));
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(3);
  });

  it("decrement decreases count by 1", () => {
    const { result } = renderHook(() => useCounter(2));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(1);
  });

  it("reset returns count to initial value after increment and decrement", () => {
    const { result } = renderHook(() => useCounter(10));
    act(() => {
      result.current.increment(); // 11
      result.current.decrement(); // 10
      result.current.decrement(); // 9
      result.current.reset(); // 10
    });
    expect(result.current.count).toBe(10);
  });
});
