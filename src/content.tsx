import Content from "./content/Content";
import "./index.css";

import { createRoot } from "react-dom/client";

const root = document.createElement("div");
root.id = "extension-root";
document.body.append(root);

createRoot(root).render(<Content />);
