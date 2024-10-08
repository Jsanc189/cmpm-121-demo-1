import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jackie's game (finally)";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const pieCounterDiv = document.createElement("div");
pieCounterDiv.innerHTML = `Total Pies: 0`;
app.append(pieCounterDiv);

//set up autoclicker to only work when a user clicks once
requestAnimationFrame(addPies);

let lastTime = 0;
let total_pies: number = 0;
const button = document.createElement("button");
button.innerHTML = "Click me! 🥧";
button.addEventListener("click", () => {
  incrementPies();
});
app.append(button);

function addPies(timestamp: number) {
  if ((timestamp - lastTime) / 1000 > 1 && total_pies != 0) {
    incrementPies();
    lastTime = timestamp;
  }
  requestAnimationFrame(addPies);
}

function incrementPies() {
  total_pies++;
  pieCounterDiv.innerHTML = `Total Pies: ${total_pies} 🥧`;
}
