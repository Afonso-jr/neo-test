import { proposals } from "@/mocks/proposals";

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const delay = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

const checkAuth = () => {
  if (!API_TOKEN) {
    throw new Error("401: Unauthorized - Token de acesso não configurado.");
  } else {
    console.log("Cliente validado")
  }
};

export const api = {
  getProposals: async () => {
    checkAuth();
    await delay();
    return proposals;
  },
  
  getProposalById: async (id: string) => {
    checkAuth();
    await delay();
    return proposals.find((p) => p.id === id);
  },

  approveProposal: async (id: string) => {
    checkAuth();
    await delay();
    
    const proposal = proposals.find((p) => p.id === id);
    if (!proposal) {
      throw new Error("Proposta não encontrada");
    }
    
    proposal.status = "SIGNED";
    proposal.signedAt = new Date().toISOString();
    
    return proposal;
  },

  rejectProposal: async (id: string, reason?: string) => {
    checkAuth();
    await delay();
    
    const proposal = proposals.find((p) => p.id === id);
    if (!proposal) {
      throw new Error("Proposta não encontrada");
    }
    
    console.log(reason);
    proposal.status = "REJECTED";
    
    return proposal;
  }

};