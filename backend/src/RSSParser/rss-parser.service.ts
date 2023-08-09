import { Injectable } from "@nestjs/common";
import * as Parser from 'rss-parser'; 

@Injectable()
export class RSSParserService {
    private readonly parser: Parser;

    constructor() {
        this.parser = new Parser();
    }

    async parseRSSFeed(url: string) {
        try {
            const feed = await this.parser.parseURL(url);
            return feed.items;
        } catch (e) {
            throw new Error(e);
        }
    }
}