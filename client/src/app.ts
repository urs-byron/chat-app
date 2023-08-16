import { GenUtil as Gen } from "./util/gen.util";
import { AuthComponent } from "./components/auth.comp";
import { ChatComponent } from "./components/chat.comp";
import { ErrorComponent } from "./components/error.comp";

AuthComponent.getInstance();
ChatComponent.getInstance();
ErrorComponent.getInstance();

window.addEventListener("load", Gen.logUser);
