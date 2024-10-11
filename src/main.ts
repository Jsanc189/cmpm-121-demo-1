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


let total_pies: number = 0;
const button = document.createElement("button");
button.innerHTML = "Click me! 🥧";
button.addEventListener("click", () => {
  incrementPies(true, 0);
});
app.append(button);

let growth_rate: number = 1;

type executeFunction = () => boolean; // This function will represent the action of the upgrade.


class upgradeCommand{
    private readonly executeFunction: executeFunction;
    public cost: number;
    public name: string;
    public rate: number;
    public newRate: number;

    constructor(executeFunction: executeFunction, cost: number, name: string, rate: number, newRate: number) {
        this.executeFunction = executeFunction;
        this.cost = cost;
        this.name = name;
        this.rate = rate;
        this.newRate = newRate;
    }

    execute(): boolean {
        if (total_pies >= this.cost) {
            total_pies -= this.cost;
            this.executeFunction();
            this.rate += this.rate;
            this.cost *= this.rate;
            if (this.rate > 0) {
                this.enableAutoClicker();
            }
            this.name = `Increase Growth Rate to ${(this.rate)}X`
            return true;
        }
        return false;
    }

    getDetails() : string {
        return `${this.name} \nCost: ${this.cost} 🥧`;
    }

    enableAutoClicker() {
        let lastTime = 0;
        const autoclick = (timestamp: number) => {
            if ((timestamp - lastTime) >= 1000 ) {
                total_pies += this.rate;
                pieCounterDiv.innerHTML = `Total Pies: ${total_pies}`;
                 
                lastTime = timestamp;
                }
            requestAnimationFrame(autoclick);
            };
        requestAnimationFrame(autoclick);
    }
}

const upgradeCommand1 = new upgradeCommand(
    () => {
        growth_rate = 1;
        return true;
    },
    10,
    `Increase Growth Rate to ${growth_rate}X`,
    1,
    0
);

function setUpgradeButton(button: HTMLButtonElement, command: upgradeCommand) {
    button.innerHTML = command.getDetails();
    button.addEventListener("click", () => {
        if (command.execute()) {
            button.innerHTML = command.getDetails();
            pieCounterDiv.innerHTML = `Total Pies: ${total_pies}`;
        }
     });
     app.append(button);
}

const upgradeButton1 = document.createElement("button");
setUpgradeButton(upgradeButton1, upgradeCommand1);

//increment pies by 1 or by growth rate.
function incrementPies(isClicked: boolean = false, growth_rate: number) {
  if (isClicked || growth_rate === 0) {
    total_pies = total_pies + 1;
  } else {
    total_pies = total_pies + growth_rate;
  }
  pieCounterDiv.innerHTML = `Total Pies: ${total_pies} 🥧`;
  button.innerHTML = "Click me! 🥧";
}
