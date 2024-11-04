// Neither of these imports work!
//
// import { welcomeMessage } from "@extension-monorepo-test/sdk";
import { welcomeMessage } from "../scripts/sdk";

function ActionApp() {
  return <h1>{welcomeMessage}</h1>;
}

export default ActionApp;
