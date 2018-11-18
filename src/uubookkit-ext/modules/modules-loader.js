// Load Modules
import {CopyListAsProgramComment} from "./copy-list-as-program-comment/copy-list-as-program-comment";
import {ResizeableLeftNavigation} from "./resizeable-left-navigation/resizeable-left-navigation";

export let modules = [
    new CopyListAsProgramComment(),
    new ResizeableLeftNavigation()
];

// Load external dependencies
let externalRequirementSet = new Set();
let externalCssStylesMap = {};

modules.forEach(module => {
    module.getExternalRequirements().forEach(requirement => {
        externalRequirementSet.add(requirement)
    });
    // TODO Throw exception when same resource name and different uri
    let externalResources = module.getExternalResources();
    console.log(externalResources);
    externalResources.filter(resource => {
        switch (resource.type) {
            case "css":
                externalCssStylesMap[resource.name] = resource.uri;
                break;
        }
    });
});

export const externalRequirements = [...externalRequirementSet];
export const externalCssResources = externalCssStylesMap;
