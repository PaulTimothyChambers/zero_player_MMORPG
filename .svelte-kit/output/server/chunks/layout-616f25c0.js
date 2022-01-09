import { c as create_ssr_component } from "./app-06f35934.js";
import "@sveltejs/kit/ssr";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
export { Layout as default };
