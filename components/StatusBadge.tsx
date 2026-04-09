type Props = {
    status: string;
};
  
export function StatusBadge({ status }: Props) {
    const map = {
        PENDING: "bg-yellow-500",
        SIGNED: "bg-green-600",
        REJECTED: "bg-red-600",
        EXPIRED: "bg-gray-500",
    };
  
    const labels = {
        PENDING: "Aguardando",
        SIGNED: "Assinado",
        REJECTED: "Recusado",
        EXPIRED: "Expirado",
    };
  
    return (
        <span
            className={`px-2 py-1 text-white text-xs rounded ${map[status as keyof typeof map]}`}
        >
            {labels[status as keyof typeof labels]}
        </span>
    );
}