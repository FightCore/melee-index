import { CardPassThrough } from 'primeng/card';

export const ALIGN_FOOTER_CARD_PT: CardPassThrough = {
  body: 'h-full',
  footer: 'mt-auto',
  content: 'h-full',
};

export const ALIGN_FOOTER_CARD_WITH_HEADER_PT: CardPassThrough = {
  root: 'flex flex-col h-full',
  header: 'h-40 overflow-hidden', // Fixed height for header
  body: 'flex flex-col flex-1 h-[calc(100%-10rem)]',
  content: 'flex flex-col flex-1',
  footer: 'mt-auto',
};
