interface LoadingProps {
    isLoading: boolean;
}
  
export default function Loading({ isLoading }: LoadingProps) {
    return (
      <div
        className={`fixed inset-0 z-999 ${isLoading ? "block" : "hidden"}`}
        tabIndex={-1}
      >
        <div id="overlay" className="fixed inset-0 bg-primary bg-opacity-50"></div>
        <div className="bg-transparent flex justify-center items-center absolute  transform shadow-lg w-full max-w-full h-full overflow-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            width="200"
            height="200"
            style={{
              shapeRendering: "auto",
              display: "block",
            }}
          >
            {[...Array(12)].map((_, i) => {
              const begin = -(1 / 12) * i + "s";
              const rotation = i * 30;
              return (
                <g key={i} transform={`rotate(${rotation} 50 50)`}>
                  <rect
                    fill="#ffff"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin={begin}
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    />
                  </rect>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
}
  