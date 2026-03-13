import { render, screen, waitFor } from "@testing-library/react";
import type { Mock } from "vitest";

import UserProfile from "#/components/UserProfile";

beforeAll(() => {
  globalThis.fetch = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("UserProfile", () => {
  it("muestra Loading... mientras espera datos", () => {
    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    });
    render(<UserProfile userId={1} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("muestra nombre y email tras fetch exitoso", async () => {
    const fakeUser = { name: "Juan", email: "juan@email.com" };
    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => fakeUser,
    });
    render(<UserProfile userId={2} />);
    await waitFor(() => expect(screen.getByText("Juan")).toBeInTheDocument());
    expect(screen.getByText("Email: juan@email.com")).toBeInTheDocument();
  });

  it("usa userId=1 por defecto", async () => {
    const fakeUser = { name: "Mario", email: "mario@email.com" };
    (globalThis.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => fakeUser,
    });
    render(<UserProfile />);
    await waitFor(() => expect(screen.getByText("Mario")).toBeInTheDocument());
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users/1",
    );
  });

  it("muestra Loading... si fetch falla", () => {
    (globalThis.fetch as Mock).mockRejectedValueOnce(new Error("fail"));
    render(<UserProfile userId={3} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
