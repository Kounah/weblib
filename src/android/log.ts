import { Base64 } from "../functions/base64";

export type Category
    = "verbose"
    | "info"
    | "debug"
    | "warn"
    | "error"
    | "data"

export class Log {
    private static __tag: string = 'default';
    private static __prefix: string = '$android-app';
    private static __delimiter: string = ':';

    static setup(config?: {
        tag?: string,
        prefix?: string,
        delimiter?: string
    }) {

        if(config) {
            if(config.tag) Log.__tag = config.tag;
            if(config.prefix) Log.__prefix = config.prefix;
            if(config.delimiter) Log.__prefix = config.delimiter;
        }

    }

    static tag(tag: string | undefined) {
        if(typeof tag === 'string' && tag.length > 0) {
            Log.__tag = tag;
        } else {
            Log.__tag = 'default';
        }

        return this;
    }

    /**
     * logs stuff in a defined structure so that the android app can use it
     * @param category how should the log be interpreted
     * @param args content
     */
    static log(category: Category, ...args: any[]) {
        console.log([
            this.__prefix,
            ...[
                category,
                this.__tag,
                ...args
            ]
            .map(arg => {
                switch(typeof arg) {
                    case 'object':
                        return JSON.stringify(arg);
                    case 'function':
                        return (arg as Function).toString();
                    default:
                        return String(arg);
                }
            })
            .map(arg => Base64.encode(arg))
        ].join(Log.__delimiter));

        return this;
    }

    /**
     * shortcut for `log('verbose', ...)`
     * @param args content
     */
    static verbose(...args: any[]) {
        return this.log("verbose", ...args);
    }

    /**
     * alias for `verbose(...)`
     * @param args content
     */
    static v(...args: any[]) {
        return this.verbose(...args);
    }

    /**
     * shortcut for `log('info', ...)`
     * @param args content
     */
    static info(...args: any[]) {
        return this.log("info", ...args);
    }

    /**
     * alias for `info(...)`
     * @param args content
     */
    static i(...args: any[]) {
        return this.info(...args);
    }

    /**
     * shortcut for `log('debug', ...)`
     * @param args content
     */
    static debug(...args: any[]) {
        return this.log("debug", ...args);
    }

    /**
     * alias for `debug(...)`
     * @param args content
     */
    static d(...args: any[]) {
        return this.debug(...args);
    }

    /**
     * shortcut for `log("warn", ...)`
     * @param args content
     */
    static warn(...args: any[]) {
        return this.log("warn", ...args);
    }

    /**
     * alias for `warn(...)`
     * @param args content
     */
    static w(...args: any[]) {
        return this.warn(...args);
    }

    /**
     * shortcut for `log("error", ...args)`
     * @param args content
     */
    static error(...args: any[]) {
        return this.log("error", ...args);
    }

    /**
     * alias for `log("error", ...args)`
     * @param args content
     */
    static e(...args: any) {
        return this.error(...args);
    }

    /**
     * sends every arg as data using `log("data", type, [classname, ] value)
     * @param args data argumnets
     */
    static data(...args: any[]) {
        args.forEach((v) => {
            if(typeof v === 'object')
                return this.log("data", typeof v, Object.getPrototypeOf(v).constructor.name, v);

            return this.log("data", typeof v, v);
        });

        return this;
    }
}