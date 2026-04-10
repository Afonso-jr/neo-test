import { render, screen } from "@testing-library/react";
import { StatusBadge } from "../StatusBadge";

describe("StatusBadge", () => {
  it("renderiza status SIGNED corretamente", () => {
    render(<StatusBadge status="SIGNED" />);
    expect(screen.getByText("Assinado")).toBeInTheDocument();
  });

  it("renderiza status REJECTED corretamente", () => {
    render(<StatusBadge status="REJECTED" />);
    expect(screen.getByText("Recusado")).toBeInTheDocument();
  });
});