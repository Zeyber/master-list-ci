require("dotenv").config();

import { providerConfig } from "./config";
import { colours } from "./colors";
import { CHECKMARK, DIVIDER } from "./input";
import { Provider } from "@master-list/core";

const providers: Provider[] = Object.values(providerConfig);

async function start() {
  await initialize();
  loop();

  async function loop() {
    await reload();
    print();
    setTimeout(() => loop(), Number.parseInt(process.env.PRINTER_REFRESH_TIME));
  }
}

async function initialize() {
  console.log("MASTER LIST INITIALIZING...");

  // const browser = await getBrowser();

  for (const provider of providers) {
    // provider.options["browser"] = browser; // Reuse manager browser

    console.log(`Initializing ${provider.settings.providerName}`);
    await provider.initialize();
    console.log(`${provider.settings.providerName} Initialized`);
  }
}

async function reload() {
  console.log("Reloading...");
  for (const provider of providers) {
    await provider.reload();
  }
}

function print() {
  console.clear();

  for (const provider of providers) {
    printItems(provider);
  }
}

/**
 * Print loaded items.
 */
function printItems(provider: Provider) {
  let toPrint: string = "";
  toPrint += DIVIDER + "\n";
  if (provider.items?.length) {
    toPrint += `${provider.settings.providerName} (${provider.items.length})`;
    provider.items.forEach((item) => {
      toPrint += `\n- ${item}`;
    });
  } else {
    toPrint += getCheckedLabel(provider);
  }

  console.log(toPrint);
}

/**
 * Get string that shows provider tasks as "done".
 */
function getCheckedLabel(provider: Provider): string {
  return `${colours.fg.green} [${CHECKMARK}] ${provider.settings.providerName} ${colours.fg.white}`;
}

start();
