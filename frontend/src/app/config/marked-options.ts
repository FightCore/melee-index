import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { Parser } from 'marked';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.code = ({ text, lang }) => {
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
  };

  renderer.blockquote = ({ tokens }) => {
    return `<blockquote class="border-l-4 border-gray-200 pl-4 italic text-gray-700 mt-4 mb-4">
              ${new Parser().parse(tokens)}
            </blockquote>`;
  };

  renderer.heading = ({ tokens, depth }) => {
    const sizes: Record<number, string> = {
      1: 'text-3xl md:text-4xl font-bold',
      2: 'text-2xl md:text-3xl font-bold',
      3: 'text-xl font-semibold',
      4: 'text-lg font-medium',
      5: 'text-base font-medium',
      6: 'text-sm font-medium',
    };
    const sizeClass = sizes[depth] || sizes[3];
    const text = new Parser().parseInline(tokens);
    return `<h${depth} class="${sizeClass} mt-6 mb-3 scroll-mt-20">${text}</h${depth}>`;
  };

  // renderer.hr = () => {
  //   return `<hr class="my-6 border-t border-gray-200" />`;
  // };

  renderer.list = (token) => {
    const body = token.items.map((item) => renderer.listitem(item)).join('');
    if (token.ordered) {
      return `<ol class="list-decimal list-inside ml-0 mb-4">${body}</ol>`;
    }
    return `<ul class="list-disc list-inside ml-4 mb-4">${body}</ul>`;
  };

  renderer.listitem = (item) => {
    // const content = item.tokens
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   .map((token) => (renderer as any)[token.type](token)) // tell TS to ignore strict typing
    //   .join('');

    const content = new Parser().parseInline(item.tokens);
    return `<li class="mb-1">${content}</li>`;
  };

  // renderer.checkbox = ({ checked }) => {
  //   return `<input type="checkbox" class="mr-2" disabled ${checked ? 'checked' : ''} />`;
  // };

  // renderer.paragraph = ({ tokens }) => {
  //   return `<p class="mb-4 leading-7">${new Parser().parseInline(tokens)}</p>`;
  // };

  // renderer.table = (token) => {
  //   const header = `<thead>${token.header.map((row) => renderer.tablerow(row)).join('')}</thead>`;
  //   const body = ''; //`<tbody>${token.rows.map((row) => renderer.tablerow(row)).join('')}</tbody>`;
  //   return `<div class="overflow-auto my-4">
  //             <table class="min-w-full text-left divide-y divide-gray-200 border-collapse">
  //               ${header}${body}
  //             </table>
  //           </div>`;
  // };

  // renderer.tablerow = ({ text }) => {
  //   return `<tr class="odd:bg-white even:bg-gray-50">${text}</tr>`;
  // };

  // renderer.tablecell = (token) => {
  //   const tag = token.header ? 'th' : 'td';
  //   const alignClass = token.align === 'center' ? 'text-center' : token.align === 'right' ? 'text-right' : 'text-left';
  //   const cellClass = `${alignClass} px-4 py-2 align-top`;
  //   return tag === 'th'
  //     ? `<th class="${cellClass} font-medium">${token.text}</th>`
  //     : `<td class="${cellClass}">${token.text}</td>`;
  // };

  // renderer.strong = ({ tokens }) => {
  //   return `<strong class="font-semibold">${new Parser().parseInline(tokens)}</strong>`;
  // };

  // renderer.em = ({ tokens }) => {
  //   return `<em class="italic">${new Parser().parseInline(tokens)}</em>`;
  // };

  // renderer.codespan = ({ text }) => {
  //   return `<code class="bg-gray-100 text-sm font-mono px-1.5 py-0.5 rounded">${escapeHtml(text)}</code>`;
  // };

  // renderer.br = () => {
  //   return `<br/>`;
  // };

  // renderer.del = ({ tokens }) => {
  //   return `<del class="line-through">${new Parser().parseInline(tokens)}</del>`;
  // };

  // renderer.link = ({ href, title, tokens }) => {
  //   const isExternal = /^https?:\/\//i.test(href);
  //   const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  //   const titleAttr = title ? ` title="${escapeAttr(title)}"` : '';
  //   const content = new Parser().parseInline(tokens);
  //   return `<a href="${escapeAttr(
  //     href
  //   )}"${titleAttr}${target} class="underline hover:text-blue-600 transition-colors">${content}</a>`;
  // };

  // renderer.image = ({ href, title, text }) => {
  //   const titleAttr = title ? ` title="${escapeAttr(title)}"` : '';
  //   const alt = escapeAttr(text || '');
  //   return `<figure class="my-6">
  //             <img src="${escapeAttr(
  //               href
  //             )}" alt="${alt}" class="w-full rounded-lg shadow-sm object-contain" loading="lazy"${titleAttr} />
  //             ${title ? `<figcaption class="mt-2 text-sm text-gray-500">${escapeAttr(title)}</figcaption>` : ''}
  //           </figure>`;
  // };

  // renderer.text = (token) => {
  //   return escapeHtml(token.text);
  // };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
  };
}

function escapeHtml(html: string): string {
  return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
