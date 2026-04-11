'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { Proposal } from "@/types/proposal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
import Link from "next/link";
import Loading from '@/components/Loading'

export default function DossierPage() {
  const params = useParams();
  const id = params.id as string;
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProposalById(id).then((res) => {
      setProposal(res || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loading isLoading={true} />;
  }

  const labels = {
    PENDING: "Aguardando",
    SIGNED: "Assinado",
    REJECTED: "Recusado",
    EXPIRED: "Expirado",
  };

  const getSimilarityColor = (score: number): string => {
    if (score >= 85) return "text-green-600 font-bold";  
    if (score >= 50) return "text-amber-500 font-bold";   
    return "text-red-600 font-bold";                     
  };

  if (!proposal) {
    return (
      <div className="flex flex-col justify-center items-center mt-20">
        <p className="text-4xl p-6 text-contrast">Proposta não encontrada para o ID: {id}!</p>
        <p className="text-2xl p-6 text-contrast">Verifique o ID do cliente ou solicite ajuda tecnica.</p>
        <Link 
          href="/painel-financeiro" 
          className="text-gray-400 hover:text-black transition-colors w-fit"
        >
          <span>Voltar para tabela de assinaturas</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start lg:items-center flex-col">
        <h1 className="text-4xl text-contrast font-bold mb-4">Dossiê da Proposta</h1>
        <Link 
          href="/painel-financeiro" 
          className="text-white hover:text-white-400 transition-colors w-fit"
        >
          <span>Voltar</span>
        </Link>
      </div>
      <div className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-6 text-contrast">Dados do Assinante</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p className="text-contrast"><strong className="text-contrast">Nome:</strong> {proposal.clientName}</p>
          <p className="mt-2 text-contrast">
            <strong className="text-contrast">Status:</strong>{" "}
            {labels[proposal.status] || "Status não informado"}
          </p>
          <p className="text-contrast"><strong className="text-contrast">CPF:</strong> {proposal.cpf || "Não informado"}</p>
          <p className="text-contrast">
            <strong className="text-contrast">Data da assinatura:</strong>{" "}
              {proposal.signedAt
                ? new Date(proposal.signedAt).toLocaleString()
                : "Não informado"
              }
          </p>
          <div>
            <p className="text-contrast"><strong className="text-contrast">IP:</strong> {proposal.ip || "Não informado"}</p>
          </div>
          <div>
            <strong className="text-contrast mr-2">Link contrato:</strong>
              {proposal.link ? (
                <a 
                  href={proposal.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-contrast hover:underline cursor-pointer font-medium"
                >
                  Visualizar Contrato
                </a>
              ) : (
                <span className="text-gray-400 italic">
                  Link do contrato não informado
                </span>
              )}
          </div>
        </div>
          <div className="mt-4">
          <iframe
            src={`https://maps.google.com/maps?q=${proposal.latitude},${proposal.longitude}&z=15&output=embed`}
            title="Localização no mapa"
            className="w-full h-64 rounded"
          />
        </div>
        <div className="border p-4 rounded mt-2">
          <h2 className="text-2xl font-semibold mb-6 text-contrast">Selfie e Documento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
            <div>
              <p className="mb-2 font-medium text-contrast">Selfie</p>
              <Zoom>
                <Image
                  src={proposal.selfieUrl}
                  alt="Selfie"
                  width={300}
                  height={300}
                  className="rounded-lg w-full max-w-xs cursor-zoom-in border shadow-sm"
                />
              </Zoom>
            </div>
            <div>
              <p className="mb-2 font-medium text-contrast">Documento</p>
              <Zoom>
                <Image
                  src={proposal.documentoUrl}
                  alt="Documento"
                  width={300}
                  height={300}
                  className="rounded-lg w-full max-w-xs cursor-zoom-in border shadow-sm"
                />
              </Zoom>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <p className="text-contrast">
              <strong>Similaridade facial:</strong> 
            </p>
            <span className={`ml-1 text-2xl ${getSimilarityColor(proposal.similarityScore)}`}>
                {proposal.similarityScore}%
              </span>
          </div>
        </div>
        <div>
          <div className="flex gap-4 mt-6 justify-center w-full">
            <button
              className="bg-green-600 hover:bg-green-800 cursor-pointer text-contrast text-xl p-5 rounded-4xl"
              onClick={() => setApproveOpen(true)}
            >
              Aprovar
            </button>

            <button
              className="bg-red-600 hover:bg-red-800 cursor-pointer text-contrast text-xl p-5 rounded-4xl"
              onClick={() => setRejectOpen(true)}
            >
              Reprovar
            </button>
          </div>
          {approveOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded">
                <p  >Tem certeza que deseja aprovar?</p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-gray-300 hover:bg-gray-500 cursor-pointer p-5 rounded-4xl"
                    onClick={() => setApproveOpen(false)}
                  >
                    Cancelar
                    </button>

                  <button
                    className="bg-green-600 hover:bg-green-800 cursor-pointer text-white p-5 rounded-4xl"
                    onClick={() => {
                      setProposal((prev) =>
                        prev
                          ? { ...prev, status: "SIGNED" } 
                          : prev
                      );
                      alert(`Usuário ${id} foi aprovado!`);
                      setApproveOpen(false);
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
          {rejectOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-white p-6 rounded w-full mx-4 lg:mx-0 lg:max-w-md">
                <p className="font-semibold text-primary">Motivo da reprovação</p>
                <textarea
                  className="border w-full mt-2 p-2 text-primary"
                  placeholder="Digite o motivo..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-gray-300 hover:bg-gray-500 cursor-pointer p-5 rounded-4xl"
                    onClick={() => setRejectOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 cursor-pointer text-white p-5 rounded-4xl"
                    onClick={() => {
                      if (!reason) {
                        alert("Informe o motivo!");
                        return;
                      }
                    
                      setProposal((prev) =>
                        prev
                          ? { ...prev, status: "REJECTED" }
                          : prev
                      );
                      
                      alert(`Reprovado!\nMotivo: ${reason}`);
                      setRejectOpen(false);
                      setReason("");
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}