import { Suspense } from "react";
import Loading from "@/components/Loading"; 
import { DossierContent } from "@/components/DossierContent";
import { api } from "@/services/api";
import Link from "next/link";

export default async function DossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const proposal = await api.getProposalById(id);

  if (!proposal) {
    return (
      <div className="flex flex-col justify-center items-center mt-20 text-center">
        <h1 className="text-3xl font-bold text-contrast">Proposta não encontrada</h1>
        <p className="text-contrast/60 mb-6">O ID {id} não consta em nossa base.</p>
        <Link href="/painel-financeiro" className="text-contrast hover:underline">
          Voltar para a listagem
        </Link>
      </div>
    );
  }

  return <DossierContent initialProposal={proposal} id={id} />;
}