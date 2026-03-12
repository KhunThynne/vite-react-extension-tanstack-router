import { createRoot } from "react-dom/client";
import cssText from "@/assets/global.css?inline";

// import { Overlay } from "./components/Overlay";
import { useThemeBridge } from "@/shared/hooks/useThemeBridge";

export default function Main({ container }: { container?: HTMLElement }) {
  useThemeBridge(container);
  return null;
}

const HOST_ID = "HepPost-tiktok-host";

if (!document.getElementById(HOST_ID)) {
  const host = document.createElement("div");
  host.id = HOST_ID;
  Object.assign(host.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    zIndex: "2147483647",
    pointerEvents: "none",
  });
  document.body.appendChild(host);
  const shadow = host.attachShadow({ mode: "open" });
  const styleTag = document.createElement("style");
  styleTag.textContent = cssText;
  shadow.appendChild(styleTag);
  const mountPoint = document.createElement("div");
  mountPoint.id = "HepPost-root";
  mountPoint.style.width = "100%";
  mountPoint.style.height = "100%";
  shadow.appendChild(mountPoint);
  createRoot(mountPoint).render(<Main container={mountPoint} />);
}
