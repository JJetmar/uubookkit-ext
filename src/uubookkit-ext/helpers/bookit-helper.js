export class BookitHelper {

    static getTid() {
        return location.href.match("^https?:\/\/[^/]+/[^/]+/([^-]+)-[^/]+/.*$")[1];
    }

    static getAwid() {
        return location.href.match("^https?:\/\/[^/]+/[^/]+/[^-]+-([^/]+)/.*$")[1];
    }

    static getPageCode() {
        return location.href.match("/page\\?code=(.+)$")[1];
    }
}