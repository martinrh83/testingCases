import { render, screen } from "@testing-library/react";

import UserAccount from "#/components/UserAccount";

describe("User Account tests", () => {
  it("Check if user is not admin", () => {
    const user = { id: 1, name: "John Doe", isAdmin: false };
    render(<UserAccount user={user} />);
    const editButton = screen.queryByRole("button", { name: /edit/i });
    expect(editButton).not.toBeInTheDocument();
  });
  it("Check if user is admin", () => {
    const user = { id: 1, name: "John Doe", isAdmin: true };
    render(<UserAccount user={user} />);
    const editButton = screen.getByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();
  });
});
