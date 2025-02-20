import { Loader2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function Loader() {
  const isLoading = useSelector((state) => state.ui.isLoading);
  if (!isLoading) {
    return null;
  }
  return <div className="fixed inset-0 bg-[#00000083] backdrop-blur-sm flex items-center justify-center z-50">
    <div className="mx-auto flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-white w-10 h-10" />
      <p className="text-center text-white">Please Wait...</p>
    </div>
  </div>
}
