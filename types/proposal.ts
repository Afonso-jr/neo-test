export type ProposalStatus =
    | "PENDING"
    | "SIGNED"
    | "REJECTED"
    | "EXPIRED"
;

export interface Proposal {
    id: string;
    clientName: string;
    status: ProposalStatus;
    updatedAt: string;
    link: string;
    cpf: string;
    signedAt: string;
    ip: string;
    latitude: number;
    longitude: number;
}