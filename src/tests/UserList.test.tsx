import { render, screen } from "@testing-library/react";

import UserList from "#/components/UserList";

describe("User List tests", () => {
  it("should render no user when list is empty", () => {
    render(<UserList users={[]} />);
    const noUsersMessage = screen.getByText(/no users found/i);
    expect(noUsersMessage).toBeInTheDocument();
  });
  it("should render user list", () => {
    const users = [
      { id: 1, name: "John Doe", isAdmin: false },
      { id: 2, name: "Jane Smith", isAdmin: true },
    ];
    render(<UserList users={users} />);
    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
