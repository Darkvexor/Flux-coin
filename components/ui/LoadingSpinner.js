export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="w-10 h-10 border-2 border-flux-purple border-t-flux-blue rounded-full animate-spin"></div>
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}