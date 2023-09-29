import { createRoot, render } from "@wordpress/element";
import App from "./components/App";
require("./helpers/otherPlugins");
import "../sass/style.scss";

// Render App.
const app = document.getElementById("app");
if (createRoot) {
	const root = createRoot(app);
	root.render(<App />);
} else {
	render(<App />, app);
}
