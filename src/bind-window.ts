import * as android_log from "./android/log";
import * as android_ok from "./android/ok";
import * as android_resource from "./android/resource";
import * as functions_base64 from "./functions/base64";
import * as functions_nodeList from "./functions/node-list";

declare global {
    interface Window {
        kouna_weblib: {
            android: {
                Log: typeof android_log.Log
                OK: typeof android_ok.OK
                Resource: typeof android_resource.Resource
            },
            functions: {
                Base64: typeof functions_base64.Base64
                NodeList: typeof functions_nodeList.NodeListHelper
            }
        }
    }
}

window.kouna_weblib = {
    android: {
        Log: android_log.Log,
        OK: android_ok.OK,
        Resource: android_resource.Resource
    }, 
    functions: {
        Base64: functions_base64.Base64,
        NodeList: functions_nodeList.NodeListHelper
    }
}