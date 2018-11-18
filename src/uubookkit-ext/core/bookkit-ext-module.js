import {BookitHelper} from "../helpers/bookit-helper";

export class BookkitExtModule {

    constructor() {
    }

    onload() {
    }

    getExternalRequirements() {
        return [];
    }

    getExternalResources() {
        return [];
    }

    storeData(key, value) {
        // TODO SOLVE different then string key and value types
        let type = typeof  value;
        switch (type) {
            case "number":
            case "string":
                localStorage.setItem(this.getLocalStoragePrefix() + key, value);
                break;
            default:
                if (value instanceof Date) {
                    type = "date";
                    localStorage.setItem(this.getLocalStoragePrefix() + key, value.toISOString());
                }
                else {

                }
        }
        localStorage.setItem(this.getLocalStoragePrefix() + key + "_type", type);
    }

    loadData(key) {
        return localStorage.getItem(this.getLocalStoragePrefix() + key);
    }

    getLocalStoragePrefix() {
        return this.constructor.name + "_" + BookitHelper.getAwid() + "_";
    }

}