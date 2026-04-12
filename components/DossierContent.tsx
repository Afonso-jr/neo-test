"use client";

import { useState, useEffect } from "react";
import { Proposal } from "@/types/proposal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
import Link from "next/link";
import { ConfirmationModal } from './ConfirmationModal';
import { api } from "@/services/api";
import Loading from "@/components/Loading";

interface DossierContentProps {
    initialProposal: Proposal;
    id: string;
}

export function DossierContent({ initialProposal, id }: DossierContentProps) {
    const [proposal, setProposal] = useState<Proposal>(initialProposal);
    const [modalType, setModalType] = useState<'approve' | 'reproves' | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        
    }, []);

    const labels = {
        PENDING: "Aguardando",
        SIGNED: "Assinado",
        REJECTED: "Recusado",
        EXPIRED: "Expirado",
    };

    const getSimilarityColor = (score: number) => {
        if (score >= 85) return "text-green-500";
        if (score >= 50) return "text-yellow-500";
        return "text-red-500";
    };

    const handleApprove = async () => {
        try {
          setLoading(true);
          
          const updatedProposal = await api.approveProposal(proposal.id);
          
          setProposal(updatedProposal);
          
          setModalType(null);
          
        } catch (error) {
          console.error("Erro ao aprovar proposta:", error);
        } finally {
          setLoading(false);
        }
    };

    const handleReprove = async (reason?: string) => {
        try {
          setLoading(true);
          
          const updatedProposal = await api.rejectProposal(proposal.id, reason);
          
          setProposal(updatedProposal);
          
          setModalType(null);
        } catch (error) {
          console.error("Erro ao reprovar proposta:", error);
        } finally {
          setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <Loading isLoading={loading}/>
            <div className="flex justify-between items-end border-b border-primary/10 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-contrast">Dossiê da Proposta</h1>
                    <p className="text-contrast/60 font-mono text-sm">ID: {id}</p>
                </div>
                <Link href="/painel-financeiro" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-contrast transition-all">
                    Voltar
                </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white/5 p-6 rounded-xl border border-primary/10">
                        <h2 className="text-xl font-semibold mb-4 text-contrast">Dados do Assinante</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <DataField label="Nome" value={proposal.clientName} />
                            <DataField label="CPF" value={proposal.cpf} />
                            <DataField label="Status" value={labels[proposal.status]} />
                            <DataField 
                                label="Assinado em" 
                                value={
                                    proposal.signedAt 
                                    ? new Date(proposal.signedAt).toLocaleString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false
                                    }) 
                                    : "Pendente"
                                } 
                            />
                            <DataField label="IP de Origem" value={proposal.ip} />
                            <div className="flex flex-col">
                                <span className="text-xs text-contrast/50 uppercase font-bold">Contrato</span>
                                <a href={proposal.link} target="_blank" className="text-contrast hover:underline font-medium">Link do Doc</a>
                            </div>
                        </div>
                    </section>
                    <section className="p-2 rounded-xl border border-primary/10 overflow-hidden">
                        <iframe
                            src={`https://maps.google.com/maps?q=${proposal.latitude},${proposal.longitude}&z=15&output=embed`}
                            className="w-full h-64 rounded-lg"
                            title="Mapa de localização"
                        />
                    </section>
                </div>
                <div className="space-y-6">
                    <section className="bg-white/5 p-6 rounded-xl border border-primary/10">
                        <h2 className="text-xl font-semibold mb-4 text-contrast text-center">Biometria Facial</h2>
                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-xs text-contrast/50 mb-2 uppercase font-bold">Selfie do Cliente</p>
                                <Zoom>
                                    <Image loading="eager" src={proposal.selfieUrl} alt="Selfie" width={200} height={200} className="rounded-lg mx-auto border-2 border-primary/20" />
                                </Zoom>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-contrast/50 mb-2 uppercase font-bold">Documento (RG/CNH)</p>
                                <Zoom>
                                  <Image loading="eager" src={proposal.documentoUrl} alt="Documento" width={200} height={200} className="rounded-lg mx-auto border-2 border-primary/20" />
                                </Zoom>
                            </div>
                            <div className="pt-4 border-t border-primary/10 text-center">
                                <p className="text-sm text-contrast/60">Similaridade Facial</p>
                                <p className={`text-4xl font-black ${getSimilarityColor(proposal.similarityScore)}`}>
                                    {proposal.similarityScore}%
                                </p>
                            </div>
                        </div>
                    </section>
                    {proposal.status === "SIGNED" && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-center gap-2">
                            <span className="text-green-600 text-2xl font-bold italic">✓ Aprovado</span>
                        </div>
                    )}
                    {proposal.status === "REJECTED" && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center gap-2">
                            <span className="text-red-600 text-2xl font-bold italic">✕ Reprovado</span>
                        </div>
                    )}
                    {proposal.status === "EXPIRED" && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center gap-2">
                            <span className="text-gray-600 text-2xl font-bold italic">Expirado</span>
                        </div>
                    )}
                    <div className="flex gap-4 justify-center w-full">
                        <button
                            disabled={proposal.status !== "PENDING"}
                            className={`flex-1 max-w-xs py-4 text-xl font-bold rounded-xl transition-all shadow-md
                            ${proposal.status === "PENDING" 
                                ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer active:scale-95" 
                                : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50"
                            }`}
                            onClick={() => setModalType('approve')}
                        >
                            Aprovar
                        </button>
                        <button
                            disabled={proposal.status !== "PENDING"}
                            className={`flex-1 max-w-xs py-4 text-xl font-bold rounded-xl transition-all shadow-md
                            ${proposal.status === "PENDING" 
                              ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer active:scale-95" 
                              : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-50"
                            }`}
                            onClick={() => setModalType('reproves')}

                        >
                            Reprovar
                        </button>
                        <ConfirmationModal 
                            isOpen={modalType === 'approve'}
                            onClose={() => setModalType(null)}
                            onConfirm={handleApprove}
                            title="Confirmar Aprovação"
                            description="Tem certeza que deseja aprovar esta proposta? Esta ação não pode ser desfeita."
                            confirmText="Sim, Aprovar"
                            variant="success"
                        />
                        <ConfirmationModal 
                            isOpen={modalType === 'reproves'}
                            onClose={() => setModalType(null)}
                            onConfirm={handleReprove}
                            title="Confirmar Rejeição"
                            description="Deseja realmente rejeitar esta proposta?"
                            confirmText="Sim, Rejeitar"
                            variant="danger"
                            isReasonVisible={true}
                        />
                      </div>
                </div>
            </div>

        </div>
    );
}

function DataField({ label, value }: { label: string, value: string | number }) {
    return (
        <div className="flex flex-col">
            <span className="text-xs text-contrast/50 uppercase font-bold tracking-wider">{label}</span>
            <span className="text-contrast font-medium">{value || "---"}</span>
        </div>
    );
}