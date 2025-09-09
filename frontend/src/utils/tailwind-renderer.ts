import { Parser, Tokens } from 'marked';
import { MarkedRenderer, MarkedOptions } from 'ngx-markdown';

export class TailwindMarkedRenderer implements MarkedRenderer {
  options!: MarkedOptions<string, string>;
  parser = new Parser();

  /* -------- Block-level -------- */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  space(_: Tokens.Space): string {
    return '';
  }

  code({ text, lang }: Tokens.Code): string {
    const preClasses = 'rounded-md overflow-auto my-4';
    const codeClasses = 'font-mono text-sm leading-normal block p-4 whitespace-pre';
    const langLabel = lang
      ? `<div class="text-xs px-3 py-1 rounded-t-md text-gray-600 bg-gray-100 border-b border-gray-200 inline-block">${escapeAttr(
          lang
        )}</div>`
      : '';

    return `<div class="${preClasses}">
              <div class="relative">${langLabel}
                <pre class="bg-gray-900 text-gray-100 rounded-b-md">
                  <code class="${codeClasses}">${escapeHtml(text)}</code>
                </pre>
              </div>
            </div>`;
  }

  blockquote({ tokens }: Tokens.Blockquote): string {
    return `<blockquote class="border-l-4 border-gray-200 pl-4 italic text-gray-700 mt-4 mb-4">
              ${this.parser.parse(tokens)}
            </blockquote>`;
  }

  html({ text }: Tokens.HTML | Tokens.Tag): string {
    console.log('Rendering heading:', text);
    return text; // ⚠️ consider sanitizing if content is untrusted
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  def(_: Tokens.Def): string {
    return '';
  }

  heading({ tokens, depth }: Tokens.Heading): string {
    console.log('Rendering heading:', tokens, depth);
    const sizes: Record<number, string> = {
      1: 'text-3xl md:text-4xl font-extrabold leading-tight',
      2: 'text-2xl md:text-3xl font-bold leading-snug',
      3: 'text-xl font-semibold',
      4: 'text-lg font-medium',
      5: 'text-base font-medium',
      6: 'text-sm font-medium',
    };
    const sizeClass = sizes[depth] || sizes[3];
    const text = this.parser.parseInline(tokens);
    return `<h${depth} class="${sizeClass} mt-6 mb-3 scroll-mt-20">${text}</h${depth}>`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hr(_: Tokens.Hr): string {
    return `<hr class="my-6 border-t border-gray-200" />`;
  }

  list(token: Tokens.List): string {
    const body = token.items.map((item) => this.listitem(item)).join('');
    if (token.ordered) {
      return `<ol class="list-decimal list-inside ml-0 mb-4">${body}</ol>`;
    }
    return `<ul class="list-disc list-inside ml-4 mb-4">${body}</ul>`;
  }

  listitem(item: Tokens.ListItem): string {
    const content = this.parser.parse(item.tokens);
    return `<li class="mb-1">${content}</li>`;
  }

  checkbox({ checked }: Tokens.Checkbox): string {
    return `<input type="checkbox" class="mr-2" disabled ${checked ? 'checked' : ''} />`;
  }

  paragraph({ tokens }: Tokens.Paragraph): string {
    return `<p class="mb-4 leading-7">${this.parser.parseInline(tokens)}</p>`;
  }

  table(token: Tokens.Table): string {
    const header = `<thead>${token.header.map((row) => this.tablerow(row)).join('')}</thead>`;
    const body = ''; // `<tbody>${token.rows.map((row) => this.tablerow(row)).join('')}</tbody>`;
    return `<div class="overflow-auto my-4">
              <table class="min-w-full text-left divide-y divide-gray-200 border-collapse">
                ${header}${body}
              </table>
            </div>`;
  }

  tablerow({ text }: Tokens.TableRow<string>): string {
    return `<tr class="odd:bg-white even:bg-gray-50">${text}</tr>`;
  }

  tablecell(token: Tokens.TableCell): string {
    const tag = token.header ? 'th' : 'td';
    const alignClass = token.align === 'center' ? 'text-center' : token.align === 'right' ? 'text-right' : 'text-left';
    const cellClass = `${alignClass} px-4 py-2 align-top`;
    return tag === 'th'
      ? `<th class="${cellClass} font-medium">${token.text}</th>`
      : `<td class="${cellClass}">${token.text}</td>`;
  }

  /* -------- Inline -------- */

  strong({ tokens }: Tokens.Strong): string {
    return `<strong class="font-semibold">${this.parser.parseInline(tokens)}</strong>`;
  }

  em({ tokens }: Tokens.Em): string {
    return `<em class="italic">${this.parser.parseInline(tokens)}</em>`;
  }

  codespan({ text }: Tokens.Codespan): string {
    return `<code class="bg-gray-100 text-sm font-mono px-1.5 py-0.5 rounded">${escapeHtml(text)}</code>`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  br(_token: Tokens.Br): string {
    return `<br/>`;
  }

  del({ tokens }: Tokens.Del): string {
    return `<del class="line-through">${this.parser.parseInline(tokens)}</del>`;
  }

  link({ href, title, tokens }: Tokens.Link): string {
    const isExternal = /^https?:\/\//i.test(href);
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const titleAttr = title ? ` title="${escapeAttr(title)}"` : '';
    const content = this.parser.parseInline(tokens);
    return `<a href="${escapeAttr(
      href
    )}"${titleAttr}${target} class="underline hover:text-blue-600 transition-colors">${content}</a>`;
  }

  image({ href, title, text }: Tokens.Image): string {
    const titleAttr = title ? ` title="${escapeAttr(title)}"` : '';
    const alt = escapeAttr(text || '');
    return `<figure class="my-6">
              <img src="${escapeAttr(
                href
              )}" alt="${alt}" class="w-full rounded-lg shadow-sm object-contain" loading="lazy"${titleAttr} />
              ${title ? `<figcaption class="mt-2 text-sm text-gray-500">${escapeAttr(title)}</figcaption>` : ''}
            </figure>`;
  }

  text(token: Tokens.Text | Tokens.Escape): string {
    console.log('Rendering text token:', token);
    return escapeHtml(token.text);
  }
}

/* -------- Helpers -------- */
function escapeHtml(html: string): string {
  return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
