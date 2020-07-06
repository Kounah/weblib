import * as android from "./android";
import * as functions from "./functions";

declare global {
    interface Window {
        kouna_weblib: {
            android: typeof android,
            functions: typeof functions
        }
    }
}

window.kouna_weblib = {
    android,
    functions
}