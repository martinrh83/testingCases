import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "#/App";

describe("App form", () => {
  beforeEach(() => {
    render(<App />);
  });
  it("render h1 title", () => {
    expect(
      screen.getByRole("heading", { name: /Simple React Hook Form/i }),
    ).toBeInTheDocument();
  });

  it("renders all fields and the submit button", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("shows all validation errors if form is empty and submitted", async () => {
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/invalid email address/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/you must accept the terms/i),
    ).toBeInTheDocument();
  });

  it("shows error for invalid email", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "Rick");
    await userEvent.type(screen.getByLabelText(/email/i), "not-an-email");
    await userEvent.click(
      screen.getByRole("checkbox", { name: /accept terms/i }),
    );
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText(/invalid email address/i),
    ).toBeInTheDocument();
  });

  it("shows error if terms are not accepted", async () => {
    await userEvent.type(screen.getByLabelText(/name/i), "Morty");
    await userEvent.type(screen.getByLabelText(/email/i), "morty@email.com");
    // No click en el checkbox
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(
      await screen.findByText(/you must accept the terms/i),
    ).toBeInTheDocument();
  });

  it("submits when all fields are valid and resets form", async () => {
    window.alert = vi.fn();

    await userEvent.type(screen.getByLabelText(/name/i), "Summer");
    await userEvent.type(screen.getByLabelText(/email/i), "summer@email.com");
    await userEvent.click(
      screen.getByRole("checkbox", { name: /accept terms/i }),
    );
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining("Summer"),
    );
    // Verifica reset:
    expect(screen.getByLabelText(/name/i)).toHaveValue("");
    expect(screen.getByLabelText(/email/i)).toHaveValue("");
    expect(screen.getByLabelText(/accept terms/i)).not.toBeChecked();
  });
  it("Show more info text", async () => {
    const paragraph = screen.queryByText(/Este es un formulario/i);
    expect(paragraph).not.toBeInTheDocument();
    const infoTrigger = screen.getByText(/mas info/i);
    await userEvent.hover(infoTrigger);
    expect(screen.getByText(/Este es un formulario/i)).toBeInTheDocument();
    await userEvent.unhover(infoTrigger);
    expect(
      screen.queryByText(/Este es un formulario/i),
    ).not.toBeInTheDocument();
  });
});
