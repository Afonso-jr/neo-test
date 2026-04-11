"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Proposal } from "@/types/proposal";
import { StatusBadge } from "./StatusBadge";
import { useRouter } from "next/navigation";

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

    return (
        <div>
            <div className="flex flex-col w-full lg:w-70">
                <input
                    type="text"
                    placeholder="Buscar por cliente ou número..."
                    className="border p-2 mb-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                <select 
                  className="border p-2 mb-3 rounded-lg"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  >
                  {STATUS_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
            <div className="w-full overflow-x-auto lg:overflow-hidden">
                <table className="w-full min-w-125 border mt-4 overflow-x-auto lg:overflow-hidden">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 w-150 lg:w-[15%] text-black">Número</th>
                            <th className="p-2 w-200 lg:w-[40%] text-black">Cliente</th>
                            <th className="p-2 w-70 lg:w-[25%] text-black">Status</th>
                            <th className="p-2 w-80 lg:w-[20%] text-black">Atualizado</th>
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
                                    className="border-t cursor-pointer hover:bg-gray-600"
                                    onClick={() => router.push(`/detalhes/${p.id}`)}
                                >
                                    <td className="p-2">{p.id}</td>
                                    <td className="p-2">{p.clientName}</td>
                                    <td className="p-2">
                                         <StatusBadge status={p.status} />
                                    </td>
                                    <td className="p-2">
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