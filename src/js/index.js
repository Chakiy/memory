import "../../icons/svgxuse";
//import Memory
import Memory from "./Memory.js";

// const username = window.prompt("Enter your nickname");
// new memory(username);

//const username = window.prompt("Enter your nickname");
// new Memory();
const mem = new Memory();
// console.log(mem.fetchIcons());
// card.generateInitialHtml();
window.addEventListener("flipped", (item) => console.log(item.detail._icon));
