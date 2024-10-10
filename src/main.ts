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
  incrementPies(true);
});
app.append(button);

let growth_rate: number = 0;
const upgrade = document.createElement("button");
upgrade.innerHTML = `Auto ${growth_rate + 1}X 🥧\nCost: 10 🥧`;
upgrade.addEventListener("click", () => {
  if (
    total_pies / (growth_rate * 10) >= 1 &&
    total_pies >= (growth_rate + 1) * 10
  ) {
    total_pies = total_pies - (growth_rate + 1) * 10;
    incrementPies();
    growth_rate = growth_rate + 1;
  }
});
app.append(upgrade);

function addPies(timestamp: number) {
  if (
    (timestamp - lastTime) / 1000 > 1 &&
    total_pies != 0 &&
    growth_rate != 0
  ) {
    incrementPies();
    lastTime = timestamp;
  }
  requestAnimationFrame(addPies);
}

//increment pies by 1 or by growth rate. 
function incrementPies(isClicked: boolean = false) {
  if (isClicked || growth_rate === 0) {
    total_pies = total_pies + 1
  } else {
    total_pies = total_pies +  growth_rate * 1;;
  }
  pieCounterDiv.innerHTML = `Total Pies: ${total_pies} 🥧`;
  upgrade.innerHTML = `${growth_rate + 1}X 🥧\nCost: ${(growth_rate + 1) * 10} 🥧`;
  button.innerHTML = "Click me! 🥧";
}
