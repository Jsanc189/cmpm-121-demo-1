import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jackie's game (finally)";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let total_pies: number = 0;
const button = document.createElement("button");
button.innerHTML = "Click me! 🥧";
button.addEventListener("click", () => {
  total_pies++;
  button.innerHTML = `You have ${total_pies} 🥧`;
});
app.append(button);
