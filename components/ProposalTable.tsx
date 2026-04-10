"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Proposal } from "@/types/proposal";
import { StatusBadge } from "./StatusBadge";
import { useRouter } from "next/navigation";

export function ProposalTable() {
    const [data, setData] = useState<Proposal[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        api.getProposals().then((res) => {
          setData(res);
          setLoading(false);
        });
    }, []);

    const filteredData = data.filter((p) =>
        p.clientName.toLowerCase().includes(search.toLowerCase()) ||
        p.id.includes(search)
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar por cliente ou número..."
                className="border p-2 w-full mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table className="w-full border mt-4">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 text-black">Número</th>
                        <th className="p-2 text-black">Cliente</th>
                        <th className="p-2 text-black">Status</th>
                        <th className="p-2 text-black">Atualizado</th>
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
                                onClick={() => router.push(`/dossier/${p.id}`)}
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
    );  
}