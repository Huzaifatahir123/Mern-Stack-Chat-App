import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    // 'animate-spin' makes it rotate
    <Loader2 className="animate-spin h-8 w-8 text-white" />
  );
}