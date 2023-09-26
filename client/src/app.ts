import { GenUtil } from "./util/gen.util";
import { AuthComponent } from "./components/auth.comp";
import { ChatComponent } from "./components/chat.comp";
import { ErrorComponent } from "./components/error.comp";

sessionStorage.clear();

AuthComponent.getInstance();
ChatComponent.getInstance();
ErrorComponent.getInstance();

window.addEventListener("load", GenUtil.logUser);
