"use client";

type LoaderProps = {
  show?: boolean;
  text?: string;
};

export default function Loader({ show = false, text = "Please wait..." }: LoaderProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        <p className="text-white text-sm tracking-wide">{text}</p>
      </div>
    </div>
  );
}