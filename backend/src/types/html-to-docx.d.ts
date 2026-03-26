declare module 'html-to-docx' {
  function HTMLtoDOCX(
    htmlString: string,
    headerHTMLString: string | null,
    documentOptions?: Record<string, unknown>,
    footerHTMLString?: string | null
  ): Promise<ArrayBuffer>;
  export default HTMLtoDOCX;
}
