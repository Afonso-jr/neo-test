"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { Proposal } from "@/types/proposal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
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

  if (!proposal) {
    return (
      <div className="flex flex-col justify-center items-center mt-20">
        <p className="text-4xl p-6">Proposta não encontrada para o ID: {id}!</p>
        <p className="text-2xl p-6">Verifique o ID do cliente ou solicite ajuda tecnica.</p>
        <Link 
          href="/dashboard" 
          className="text-blue-600 hover:text-blue-800 transition-colors w-fit"
        >
          <span>Voltar para tabela de assinaturas</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-bold">Dossiê da Proposta</h1>
        <Link 
          href="/dashboard" 
          className="text-white hover:text-white-400 transition-colors w-fit"
        >
          <span>Voltar</span>
        </Link>
      </div>
      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-3">Dados do Assinante</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p><strong>Nome:</strong> {proposal.clientName}</p>
          <p className="mt-2">
            <strong>Status:</strong> {proposal.status || "Status informado"}
          </p>
          <p><strong>CPF:</strong> {proposal.cpf || "Não informado"}</p>
          <p>
            <strong>Data da assinatura:</strong>{" "}
              {proposal.signedAt
                ? new Date(proposal.signedAt).toLocaleString()
                : "Não informado"
              }
          </p>
          <div>
            <strong>IP:</strong> {proposal.ip || "Não informado"}
          </div>
        </div>
          <div className="mt-4">
          <iframe
            src={`https://maps.google.com/maps?q=${proposal.latitude},${proposal.longitude}&z=15&output=embed`}
            className="w-full h-64 rounded"
          />
        </div>
        <div className="border p-4 rounded mt-2">
          <h2 className="font-semibold mb-3">Selfie e Documento</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="mb-2 font-medium">Selfie</p>
              <Zoom>
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Selfie"
                  className="rounded w-full max-w-xs cursor-zoom-in"
                />
              </Zoom>
            </div>
            <div>
              <p className="mb-2 font-medium">Documento</p>
              <Zoom>
                <img
                  src="https://via.placeholder.com/300x200?text=Documento"
                  alt="Documento"
                  className="rounded w-full max-w-xs cursor-zoom-in"
                />
              </Zoom>
            </div>
          </div>
          <div className="mt-4">
            <p>
              <strong>Similaridade facial:</strong> 92%
            </p>
          </div>
        </div>
        <div>
          <div className="flex gap-4 mt-6 justify-center w-full">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => setApproveOpen(true)}
            >
              Aprovar
            </button>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
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
                    className="bg-gray-300 px-3 py-1"
                    onClick={() => setApproveOpen(false)}
                  >
                    Cancelar
                    </button>

                  <button
                    className="bg-green-600 text-white px-3 py-1"
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
              <div className="bg-white p-6 rounded w-full max-w-md">
                <p className="font-semibold">Motivo da reprovação</p>

                <textarea
                  className="border w-full mt-2 p-2"
                  placeholder="Digite o motivo..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />

                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-gray-300 px-3 py-1"
                    onClick={() => setRejectOpen(false)}
                  >
                    Cancelar
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1"
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