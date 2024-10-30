import "./style.css";
//set up HTML BG, title, and header
document.body.style.backgroundColor = "#1E3770";
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "The Great Pie Pursuit";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.fontSize = "70px";
app.append(header);

//set up pie counter
const pieCounterDiv = document.createElement("div");
pieCounterDiv.innerHTML = `Total Pies: 0`;
pieCounterDiv.style.fontSize = "60px";
app.append(pieCounterDiv);

// set up pie increment button
const button = document.createElement("button");
button.innerHTML = "🥧";
button.style.borderRadius = "100%";
button.style.padding = ".1px .1px";
button.style.color = "#f5deb3";
button.style.backgroundColor = "#A884C4";
button.style.fontSize = "300px";
button.style.cursor = "pointer";
button.addEventListener("click", () => {
  incrementPies(true, 0);
});
app.append(button);
app.append(document.createElement("br"));
const space = document.createElement("div");
space.innerHTML = "Click Me!";
space.style.fontSize = "50px";
app.append(space);

let total_pies: number = 0;

//upgrade commmand for pie upgrade buttons
class PurchaseUpgradeCommand {
  public cost: number;
  public name: string;
  public rate: number;
  public nextRate: number;
  public totalRate: number;
  public clickCount: number;
  public upgradeName: string;
  public decription: string;

  constructor(
    cost: number,
    name: string,
    rate: number,
    nextRate: number,
    totalRate: number,
    clickCount: number,
    upgradeName: string,
    description: string,
  ) {
    this.cost = cost;
    this.name = name;
    this.rate = rate;
    this.nextRate = nextRate;
    this.totalRate = totalRate;
    this.clickCount = clickCount;
    this.upgradeName = upgradeName;
    this.decription = description;
  }

  executePurchase(): boolean {
    const increaseFactor = 0.15;
    if (total_pies >= this.cost) {
      total_pies -= this.cost;
      this.cost += Math.pow(this.cost, increaseFactor);
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

  //returns string for button description
  getDetails(): string {
    if (this.clickCount > 0) {
      return `${this.name} <br>Cost: ${this.cost.toFixed(2)} 🥧<br>Total Purchased: ${this.clickCount} 💰`;
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

//create a sidebar for upgrade buttons
const sidebar = document.createElement("div");
sidebar.style.position = "fixed";
sidebar.style.top = "0";
sidebar.style.left = "0";
sidebar.style.width = "400px";
sidebar.style.height = "100%";
sidebar.style.padding = "10px";
document.body.appendChild(sidebar);
const sidebarTitle = document.createElement("h2");
sidebar.append(sidebarTitle);
sidebarTitle.textContent = "Upgrades";

interface Item {
  name: string;
  cost: number;
  rate: number;
  nextRate: number;
  totalRate: number;
  clickCount: number;
  upgradeName: string;
  description: string;
}

//list of available items to purchase buttons
const availableItems: Item[] = [
  {
    name: `Rolling Pin`,
    cost: 10,
    rate: 0.1,
    nextRate: 0.1,
    totalRate: 0,
    clickCount: 0,
    upgradeName: `Rolling Pin`,
    description: "A handy tool for rolling out pie crusts.",
  },
  {
    name: `Oven`,
    cost: 100,
    rate: 2.0,
    nextRate: 2.0,
    totalRate: 0,
    clickCount: 0,
    upgradeName: `Oven`,
    description: "Bake your pies to perfection in this reliable oven.",
  },
  {
    name: `Pastry Chef`,
    cost: 1000,
    rate: 50,
    nextRate: 50,
    totalRate: 0,
    clickCount: 0,
    upgradeName: `Pastry Chef`,
    description: "Hire a skilled pastry chef to help you produce more pies.",
  },
  {
    name: `Bakery`,
    cost: 10000,
    rate: 1000,
    nextRate: 1000,
    totalRate: 0,
    clickCount: 0,
    upgradeName: `Bakery`,
    description:
      "Expand your business and open a bakery to produce even more pies.",
  },
  {
    name: `Pi: 3.14`,
    cost: 100000,
    rate: 314159,
    nextRate: 314159,
    totalRate: 0,
    clickCount: 0,
    upgradeName: `Pi: 3.14`,
    description:
      "Discover the secret to the universe and increase your pie production exponentially.",
  },
];

//create bew purchase upgrade command for each item and add to sidebar
availableItems.forEach((config) => {
  const command = new PurchaseUpgradeCommand(
    config.cost,
    `${config.name}: <div>Increase Growth Rate by ${config.rate.toFixed(1)} 🥧/sec`,
    config.rate,
    config.nextRate,
    config.totalRate,
    config.clickCount,
    config.upgradeName,
    config.description,
  );

  const button = document.createElement("button");
  button.innerHTML = command.getDetails();
  button.style.borderRadius = "30px";
  button.style.color = "#f5deb3";
  button.style.backgroundColor = "#5D8FC1";
  button.style.fontSize = "20px";

  button.addEventListener("click", () => {
    if (command.executePurchase()) {
      button.innerHTML = command.getDetails();
      pieCounterDiv.innerHTML = `Total Pies: ${total_pies.toFixed(1)} 🥧`;
    }
  });

  // Create a description element
  const description = document.createElement("div");
  description.textContent = config.description;
  description.style.fontSize = "16px";
  description.style.marginBottom = "10px";
  description.style.color = "#23DF9A";
  sidebar.append(button);
  sidebar.append(description);
});

//increment pies by 1 or by growth rate.
function incrementPies(isClicked: boolean = false, growth_rate: number) {
  if (isClicked || growth_rate === 0) {
    total_pies = total_pies + 1;
  } else {
    total_pies = total_pies + growth_rate;
  }
  pieCounterDiv.innerHTML = `Total Pies: ${total_pies.toFixed(1)} 🥧`;
  button.innerHTML = "🥧";
}
