"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Proposal } from "@/types/proposal";
import { StatusBadge } from "./StatusBadge";
import { useRouter } from "next/navigation";
import { svgCheckCircle, svgAlertTriangle, svgAlertHexagon, svgSlashCancel } from "@/components/Icons";

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos os Status' },
  { value: 'PENDING', label: 'Aguardando' },
  { value: 'SIGNED', label: 'Assinado' },
  { value: 'REJECTED', label: 'Recusado' },
  { value: 'EXPIRED', label: 'Expirado' },
];

export function ProposalTable() {
    const [data, setData] = useState<Proposal[]>([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        api.getProposals().then((res) => {
          setData(res);
          setLoading(false);
        });
    }, []);

    const normalizeText = (text: string) => {
        return text
          .normalize("NFD") 
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
    };

    const filteredData = data.filter((p) => {
        const normalizedSearch = normalizeText(search);
        const normalizedClientName = normalizeText(p.clientName);
        const normalizedId = normalizeText(p.id);
      
        const matchesSearch = 
            normalizedClientName.includes(normalizedSearch) ||
            normalizedId.includes(normalizedSearch);
        
        const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
      
        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
          case "SIGNED":
            return <span className="text-green-500">{svgCheckCircle}</span>;
      
          case "PENDING":
            return <span className="text-yellow-500">{svgAlertTriangle}</span>;
      
          case "EXPIRED":
            return <span className="text-gray-400">{svgAlertHexagon}</span>;
      
          case "REJECTED":
            return <span className="text-red-500">{svgSlashCancel}</span>;
      
          default:
            return null;
        }
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full">
                <input
                    type="text"
                    placeholder="Buscar por cliente ou número..."
                    className="border lg:w-64 h-fit p-2 mb-4 bg-contrast text-primary"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex gap-2 flex-col">
                    <label htmlFor="status-filter" className="text-contrast font-bold">
                        Filtrar por Status:
                    </label>
                    <select 
                        id="status-filter"
                        className="border p-2 mb-3 rounded-lg text-primary bg-contrast"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        >
                        {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="w-full overflow-x-auto lg:overflow-hidden">
                <table className="w-full min-w-125 border mt-4 overflow-x-auto lg:overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 w-150 lg:w-[15%] text-primary">Número</th>
                            <th className="p-2 w-200 lg:w-[40%] text-primary">Cliente</th>
                            <th className="p-2 w-70 lg:w-[25%] text-primary">Status</th>
                            <th className="p-2 w-80 lg:w-[20%] text-primary">Atualizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-t animate-pulse">
                                    <td className="p-2">
                                        <div className="h-4 bg-gray-300 rounded w-12" />
                                    </td>
                                    <td className="p-2">
                                        <div className="h-4 bg-gray-300 rounded w-16" />
                                    </td>
                                    <td className="p-2">
                                        <div className="h-4 bg-gray-300 rounded w-16" />
                                    </td>
                                    <td className="p-2">
                                        <div className="h-4 bg-gray-300 rounded w-16" />
                                    </td>
                                </tr>
                            ))
                        ) : filteredData.length > 0 ? (
                            filteredData.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-t cursor-pointer hover:bg-secundary"
                                    onClick={() => router.push(`/detalhes/${p.id}`)}
                                >
                                    <td className="p-2 text-contrast">
                                        <div className="flex items-center gap-2">
                                        {getStatusIcon(p.status)}
                                        <span>{p.id}</span>
                                        </div>
                                    </td>
                                    <td className="p-2 text-contrast">{p.clientName}</td>
                                    <td className="p-2 text-contrast">
                                         <StatusBadge status={p.status} />
                                    </td>
                                    <td className="p-2 text-contrast">
                                        {new Date(p.updatedAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">
                                        Nenhuma proposta encontrada
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>                
    );  
}