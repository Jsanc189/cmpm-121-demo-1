import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jackie's game (finally)";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//set up autoclicker to only work when a user clicks once
setInterval(addPies, 1000);

function addPies() {
  if (total_pies != 0) {
    incrementPies();
  }
}

function incrementPies() {
  total_pies++;
  button.innerHTML = `You have ${total_pies} 🥧`;
}

let total_pies: number = 0;
const button = document.createElement("button");
button.innerHTML = "Click me! 🥧";
button.addEventListener("click", () => {
  incrementPies();
});
app.append(button);
