import MarkdownItRenderer from 'markdown-it/lib/renderer';

export class Renderer extends MarkdownItRenderer {
    constructor() {
        super();
        this.rules.hardbreak = this.withoutNewLine(this.rules.hardbreak);
        this.rules.softbreak = this.withoutNewLine(this.rules.softbreak);
        this.rules.fence = this.withoutNewLine(this.rules.fence);
        this.rules.code_block = this.withoutNewLine(this.rules.code_block);
        this.renderToken = this.withoutNewLine(this.renderToken.bind(this));
    }

    withoutNewLine(renderer) {
        return (...args) => {
            const rendered = renderer(...args);
            if(rendered === '\n') {
                return rendered; // keep soft breaks
            }
            if(rendered[rendered.length - 1] === '\n') {
                return rendered.slice(0, -1);
            }
            return rendered;
        }
    }
}
