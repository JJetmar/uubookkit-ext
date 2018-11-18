import { modules } from "./modules/modules-loader";

let currentPageData = {};

let initPage = () => {
    modules.forEach(module => module.onLoad());
};

let firstInit = function () {
    let title = $(".uu-bookkit-book-top-text");
    // if page not loaded yet - do it later
    if (!title.length) {
        setTimeout(firstInit, 3000);
        return;
    }

    // update HTML - add icons and links
    let refreshIcon = '<span class="uu5-bricks-icon mdi mdi-reload bookkit-ext-refresh"></span>';
    title.after(refreshIcon);

    $(".plus4u5-app-menu-link").each(function(item) {
        let menuText = $(this).text();
        if (menuText.includes("uuSubApp")) {
            $(this).addClass("bookkit-ext-uusubapp");
        }
        if (menuText.includes("Business Mod")) {
            $(this).addClass("bookkit-ext-business");
        }
        if (menuText.includes("uuCMD") || menuText.includes("uuCmd")) {
            $(this).addClass("bookkit-ext-cmd");
        }
        if (menuText.includes("Store")) {
            $(this).addClass("bookkit-ext-store");
        }
    });

    // init bookkit page
    initPage();
};

// inject to CMD call
let injectToHttpRequest = function () {
    let origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {

        if (url.includes("loadPage")) {
            this.addEventListener('load', function () {
                currentPageData = JSON.parse(this.responseText);
                // first action take after 3s
                setTimeout(firstInit, 3000);
            });
        }
        origOpen.apply(this, arguments);
    };
};

// do inject
injectToHttpRequest();
