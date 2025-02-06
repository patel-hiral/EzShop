import { Loader2 } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

function Loader() {
  const isLoading = useSelector((state) => state.ui.isLoading);

  if (!isLoading) return null;

  return createPortal(
    <div className="fixed inset-0 bg-[#00000083] backdrop-blur-sm flex items-center justify-center z-50">
      <Loader2 className="animate-spin text-white w-10 h-10" />
    </div>,
    document.getElementById("loader")
  );
}

export default Loader;
