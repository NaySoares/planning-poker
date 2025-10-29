'use client';

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Share } from "lucide-react";
import { usePathname } from "next/navigation";

export const SharedLinkButton = () => {
  const pathname = usePathname()
  const roomCode = pathname.split("/").pop();
  const URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const shareableLink = `${URL}join/${roomCode}`;

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