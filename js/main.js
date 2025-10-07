import { switchViewport } from "./utility/switch-viewport.js";
import { initializeHamburgerMenu } from "./component/hamburgermenu.js";
import { initializeFixedCta } from "./component/fixed-cta.js";
import { initializeToggleHeaderOnScroll } from "./component/toggleheaderonscroll.js";
import { initializeDropDownMenu } from "./component/dropdownmenu.js";
import { initializeModal } from "./component/modal.js";
import { initializeTabMenu } from "./component/tabmenu.js";
import { initializeAccordion } from "./component/accordion.js";

switchViewport();
window.addEventListener("resize", switchViewport);

initializeHamburgerMenu();
initializeFixedCta();
initializeToggleHeaderOnScroll();
initializeDropDownMenu();
initializeModal();
initializeTabMenu();
initializeAccordion();
