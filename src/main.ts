import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Jackie's game (finally)";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.fontSize = "100px";
app.append(header);

const pieCounterDiv = document.createElement("div");
pieCounterDiv.innerHTML = `Total Pies: 0`;
pieCounterDiv.style.fontSize = "80px";
app.append(pieCounterDiv);

let total_pies: number = 0;
const button = document.createElement("button");
button.innerHTML = "Click me! <br>🥧";
button.style.borderRadius = "100%";
button.style.padding = "60px 20px";
button.style.color = "#f5deb3";
button.style.fontSize = "60px";
button.style.cursor = "pointer";
button.addEventListener("click", () => {
  incrementPies(true, 0);
});
app.append(button);
app.append(document.createElement("br"));

type executeFunction = () => boolean; // This function will represent the action of the upgrade.

class upgradeCommand {
  private readonly executeFunction: executeFunction;
  public cost: number;
  public name: string;
  public rate: number;
  public nextRate: number;
  public totalRate: number;
  public clickCount: number;
  public upgradeName: string;

  constructor(
    executeFunction: executeFunction,
    cost: number,
    name: string,
    rate: number,
    nextRate: number,
    totalRate: number,
    clickCount: number,
    upgradeName: string,
  ) {
    this.executeFunction = executeFunction;
    this.cost = cost;
    this.name = name;
    this.rate = rate;
    this.nextRate = nextRate;
    this.totalRate = totalRate;
    this.clickCount = clickCount;
    this.upgradeName = upgradeName;
  }

  execute(): boolean {
    const increaseFactor = 0.15;
    if (total_pies >= this.cost) {
      total_pies -= this.cost;
      this.executeFunction();
      this.cost += Math.pow(this.cost, increaseFactor);
      console.log(this.rate);
      this.totalRate += this.rate;
      this.clickCount++;
      if (this.rate > 0) {
        this.enableAutoClicker();
      }
      this.name = `${this.upgradeName}: <div>Increase Growth Rate by ${this.rate.toFixed(1)} 🥧/sec`;
      return true;
    }
    return false;
  }

  getDetails(): string {
    if (this.clickCount > 0) {
      return `${this.name} <br>Cost: ${this.cost.toFixed(2)} 🥧<br>Rate: ${this.totalRate.toFixed(1)} 🥧/s <br>Total Purchased: ${this.clickCount} 💰`;
    } else {
      return `${this.name} <br>Cost: ${this.cost}`;
    }
  }

  enableAutoClicker() {
    let lastTime = 0;
    const autoclick = (timestamp: number) => {
      if (timestamp - lastTime >= 1000) {
        total_pies += this.rate;
        pieCounterDiv.innerHTML = `Total Pies: ${total_pies.toFixed(1)} 🥧`;

        lastTime = timestamp;
      }
      requestAnimationFrame(autoclick);
    };
    requestAnimationFrame(autoclick);
  }
}

const growth_rate: number = 0.1;
const upgradeCommand1 = new upgradeCommand(
  () => {
    return true;
  },
  10,
  `Rolling Pin: <div>Increase Pies by ${growth_rate} 🥧/sec`,
  0.1,
  0.1,
  0,
  0,
  `Rolling Pin`,
);

const growth_rate2: number = 2.0;
const upgradeCommand2 = new upgradeCommand(
  () => {
    return true;
  },
  100,
  `Oven: <div>Increase pies by ${growth_rate2} 🥧/sec`,
  2.0,
  2.0,
  0,
  0,
  `Oven`,
);

const growth_rate3: number = 50;
const upgradeCommand3 = new upgradeCommand(
  () => {
    return true;
  },
  1000,
  `Pastry Chef: <div>Increase pies by ${growth_rate3} 🥧/sec`,
  50,
  50,
  0,
  0,
  `Pastry Chef`,
);

function setUpgradeButton(button: HTMLButtonElement, command: upgradeCommand) {
  button.innerHTML = command.getDetails();
  button.style.borderRadius = "30px";
  button.style.color = "#f5deb3";
  button.addEventListener("click", () => {
    if (command.execute()) {
      button.innerHTML = command.getDetails();
      pieCounterDiv.innerHTML = `Total Pies: ${total_pies.toFixed(1)} 🥧`;
    }
  });
  app.append(button);
}

const upgradeButton1 = document.createElement("button");
setUpgradeButton(upgradeButton1, upgradeCommand1);

const upgradeButton2 = document.createElement("button");
setUpgradeButton(upgradeButton2, upgradeCommand2);

const upgradeButton3 = document.createElement("button");
setUpgradeButton(upgradeButton3, upgradeCommand3);

//increment pies by 1 or by growth rate.
function incrementPies(isClicked: boolean = false, growth_rate: number) {
  if (isClicked || growth_rate === 0) {
    total_pies = total_pies + 1;
  } else {
    total_pies = total_pies + growth_rate;
  }
  pieCounterDiv.innerHTML = `Total Pies: ${total_pies.toFixed(1)} 🥧`;
  button.innerHTML = "Click me! <br>🥧";
}
