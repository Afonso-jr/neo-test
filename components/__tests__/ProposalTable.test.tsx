import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/services/api", () => ({
  api: {
    getProposals: jest.fn().mockResolvedValue([
      {
        id: "1001",
        clientName: "João Silva",
        status: "PENDING",
        updatedAt: new Date().toISOString(),
        link: "",
      },
      {
        id: "1002",
        clientName: "Maria Souza",
        status: "SIGNED",
        updatedAt: new Date().toISOString(),
        link: "",
      },
    ]),
  },
}));

import { ProposalTable } from "../ProposalTable";

describe("ProposalTable", () => {
  it("filtra propostas ao digitar na busca", async () => {
    render(<ProposalTable />);

    const input = screen.getByPlaceholderText(
      "Buscar por cliente ou número..."
    );

    await userEvent.type(input, "Maria");

    expect(await screen.findByText("Maria Souza")).toBeInTheDocument();
    expect(screen.queryByText("João Silva")).not.toBeInTheDocument();
  });
});