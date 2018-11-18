import {BookkitExtModule} from "./../../core/bookkit-ext-module";
import {copyToClipBoard, decodeSpecialChars} from "../../helpers/js-helpers";

export class CopyListAsProgramComment extends BookkitExtModule {

    constructor() {
        super();
        this.COMMENT_TYPE = "// ";
        this.UL_STEP_MARK = "•";
        this.STEP_JOIN = ".";
        this.STEP_POSTFIX = " - ";
        this.WORD_WRAP_CHARS = 150;

        this.walkedSteps = new Set();
    }

    onLoad() {
        document.querySelectorAll(".uu5-bricks-section > .uu5-bricks-ol").forEach(olElement => {
            olElement.insertAdjacentHTML('beforebegin', `
                <div class="bookkit-ext-copy-scenario-panel uu5-common-div uu-uuapp-designkit-embedded-text-header-bar">
                    <button class="bookkit-ext-copy-scenario-button uu5-bricks-button uu5-bricks-button-m uu5-bricks-button-transparent" type="button">
                        <span class="uu5-bricks-icon mdi mdi-content-copy"></span>
                        <span class="bookkit-ext-copy uu5-bricks-span uu5-bricks-lsi-item">Kopírovat programový komentář</span>
                    </button>
                </div>
            `);

            olElement.previousElementSibling.querySelectorAll(".bookkit-ext-copy-scenario-button")[0].addEventListener("click", () => {
                this.copyContent = "";
                let commentPrefix = "";
                let heading = olElement.parentElement.querySelectorAll("h1, h2, h3, h4, h5, h6")[0].textContent;
                if (heading.toLowerCase() === "happy day scenario") {
                    commentPrefix = "HDS ";
                } else {
                    let prefixToken = heading.split(/\s*\-/)[0];
                    if (prefixToken) {
                        this.copyContent = this.COMMENT_TYPE + heading.replace(/^\s+|\s+$/gm, "") + "\n";
                        commentPrefix = prefixToken + " ";
                    }
                }
                this.walkedSteps.clear();
                this.walkOverList(olElement, commentPrefix);
                copyToClipBoard(this.copyContent);
            });
        });
    }

    walkOverList(olElement, prefix) {
        let stepMark = (olElement.tagName === "UL" ? this.UL_STEP_MARK : 1);

        // walk over li elements
        if (!this.walkedSteps.has(prefix + stepMark) || stepMark === this.UL_STEP_MARK) {
            this.walkedSteps.add(prefix + stepMark);

            olElement.childNodes.forEach(liElement => {
                let itemTextContent = liElement.innerHTML.replace(/(\<[ou]l(\s*.*)*\/[ou]l\>)/gm, "").replace(/(\<[^\>]+\>)/gm, "");
                let stepLine = prefix + stepMark + this.STEP_POSTFIX + decodeSpecialChars(itemTextContent).replace(/\s+/gm, " ").trim();

                // wrap after WORD_WRAP_CHARS chars
                while (stepLine.length > this.WORD_WRAP_CHARS) {
                    for (let i = this.WORD_WRAP_CHARS ; i > 0 ; i--) {
                        if (stepLine.substr(i, 1).match(/^\s+$/)) {
                            this.copyContent += this.COMMENT_TYPE + stepLine.substr(0, i).replace(/^\s+|\s+$/g, "") + "\n";
                            stepLine = stepLine.substr(i).replace(/^\s+|\s+$/gm, "");
                        }
                    }
                }

                this.copyContent += this.COMMENT_TYPE + stepLine.replace(/^\s+|\s+$/gm, "") + "\n";

                let innerOlElements = liElement.querySelectorAll(":scope > ol, :scope > ul");
                if (innerOlElements.length > 0) {
                    innerOlElements.forEach((innerUlOlElement) =>  {
                        this.walkOverList(innerUlOlElement, prefix + stepMark + this.STEP_JOIN);
                    });
                }
                if (stepMark !== this.UL_STEP_MARK) {
                    stepMark++
                }
            });
        }
    }

}