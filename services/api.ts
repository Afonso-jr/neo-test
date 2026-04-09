import { proposals } from "@/mocks/proposals";

export const api = {
  getProposals: async () => {
    await new Promise((r) => setTimeout(r, 500));
    return proposals;
  },
  
  getProposalById: async (id: string) => {
    await new Promise((r) => setTimeout(r, 500));
    return proposals.find((p) => p.id === id);
  },
};