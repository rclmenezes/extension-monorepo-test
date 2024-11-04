// Neither of these imports work!
//
// import { welcomeMessage } from "@extension-test/sdk";
import { welcomeMessage } from "../scripts/sdk";

function ActionApp() {
  return <h1>{welcomeMessage}</h1>;
}

export default ActionApp;
