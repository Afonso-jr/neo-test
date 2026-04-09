import { ProposalTable } from "@/components/ProposalTable";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Painel CORBAN</h1>
      <ProposalTable />
    </div>
  );
}