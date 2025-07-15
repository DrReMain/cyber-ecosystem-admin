import Loader from './loader';

export default function LoadingBlock() {
  return (
    <div className="w-full h-full relative">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative w-full h-full flex items-center justify-center z-10 text-center">
        <Loader size="lg" />
      </div>

      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gray-400 opacity-50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gray-400 opacity-50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gray-400 opacity-50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gray-400 opacity-50" />
    </div>
  );
}
