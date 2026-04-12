import { ProposalTable } from "@/components/ProposalTable";

export default function DashboardPage() {
  return (
    <div className="p-6 mb-12">
      <h1 className="text-3xl text-contrast font-bold mb-8">Painel CORBAN</h1>
      <ProposalTable />
    </div>
  );
}