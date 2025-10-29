import { toast } from "sonner";
import { Button } from "./ui/button";
import { Share } from "lucide-react";

export const SharedLinkButton = ({ roomCode }: { roomCode: string }) => {
  if (typeof window === "undefined") return null;

  const shareableLink = `${window.location.origin}/join/${roomCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.success("Link copiado para a área de transferência!");
  };
  return (
    <Button variant="outline" size="icon" onClick={handleCopyLink} className="text-black bg-teal-500 hover:bg-teal-600 hover:text-white transition border-0 duration-300">
      <Share />
    </Button>
  )
}