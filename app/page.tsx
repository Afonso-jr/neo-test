import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-primary/20 to-black p-6">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-contrast tracking-tight">
          Neo <span className="text-primary">Crédito</span>
        </h1>
        <p className="text-lg md:text-xl text-contrast/80 max-w-md mx-auto leading-relaxed">
          Gerenciamento inteligente de propostas e fluxos financeiros em tempo real.
        </p>
        <div className="pt-4">
          <Link 
            href="/painel-financeiro" 
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-contrast transition-all duration-200 bg-primary rounded-xl hover:bg-primary/90 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Acessar Painel Financeiro
            <svg 
              className="w-5 h-5 ml-2 -mr-1 transition-all duration-200 group-hover:translate-x-1" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      <footer className="absolute bottom-8 text-contrast/40 text-sm">
        &copy; {new Date().getFullYear()} Neo Crédito - Área Restrita
      </footer>
    </main>
  );
}