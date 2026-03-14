import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemeProvider, useTheme } from "#/context/ThemeContext";

describe("ThemeContext", () => {
  it("should provide 'light' as the default theme", () => {
    function ThemeTester() {
      const { theme } = useTheme();
      return <h1>{theme}</h1>;
    }
    render(
      <ThemeProvider>
        <ThemeTester />
      </ThemeProvider>,
    );
    expect(screen.getByRole("heading").textContent).toBe("light");
  });

  it("toggles theme between light and dark", async () => {
    function ThemeToggleTester() {
      const { theme, toggleTheme } = useTheme();
      return (
        <>
          <span data-testid="theme-value">{theme}</span>
          <button data-testid="toggle-btn" onClick={toggleTheme}>
            Toggle
          </button>
        </>
      );
    }
    render(
      <ThemeProvider>
        <ThemeToggleTester />
      </ThemeProvider>,
    );
    const user = userEvent.setup();
    const value = screen.getByText("light");
    const btn = screen.getByRole("button", { name: /toggle/i });
    expect(value.textContent).toBe("light");
    await user.click(btn);
    expect(value.textContent).toBe("dark");
    await user.click(btn);
    expect(value.textContent).toBe("light");
  });

  it("throws if useTheme is called outside of ThemeProvider", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const Broken = () => {
      useTheme();
      return null;
    };
    expect(() => render(<Broken />)).toThrow(
      "useTheme must be used within ThemeProvider",
    );
    errorSpy.mockRestore();
  });
});
