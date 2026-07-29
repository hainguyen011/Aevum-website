/**
 * TranslationService: Client-side translation service with format preservation.
 * Ported from AevumOS with layout masking and Google Translate fallback.
 */
export const TranslationService = {
  /**
   * Dịch văn bản thông thường sử dụng Google Translate Client-side API
   */
  async translateText(text, targetLang = 'vi', sourceLang = 'auto') {
    if (!text || !text.trim()) return '';
    
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Google Translate Client-side status: ${response.status}`);
      const data = await response.json();
      if (data && data[0]) {
        return data[0].map((item) => item[0]).join('');
      }
    } catch (e) {
      console.error("Client-side translation failed:", e);
    }

    return text;
  },

  /**
   * Dịch tài liệu Markdown, bảo toàn cấu trúc cú pháp (che bằng placeholders)
   */
  async translateMarkdown(md, targetLang = 'vi', sourceLang = 'auto') {
    if (!md) return '';

    const placeholders = {};
    let placeholderCounter = 0;

    const addPlaceholder = (value) => {
      const key = `__MARKDOWN_PLACEHOLDER_${placeholderCounter++}__`;
      placeholders[key] = value;
      return key;
    };

    let maskedMd = md;

    // 1. Che Code blocks (``` ... ```) - Giữ nguyên không dịch code
    const codeBlockRegex = /```[\s\S]*?```/g;
    maskedMd = maskedMd.replace(codeBlockRegex, (match) => addPlaceholder(match));

    // 2. Che Inline code (`code`) - Giữ nguyên không dịch inline code
    const inlineCodeRegex = /`([^`]+)`/g;
    maskedMd = maskedMd.replace(inlineCodeRegex, (match) => addPlaceholder(match));

    // 3. Che phần URL của Links [text](url) - Bảo vệ URL path, cho phép dịch phần text hiển thị
    const urlPlaceholders = {};
    let urlCounter = 0;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    maskedMd = maskedMd.replace(linkRegex, (match, text, url) => {
      const urlKey = `__URL_PLACEHOLDER_${urlCounter++}__`;
      urlPlaceholders[urlKey] = url;
      return `[${text}](${urlKey})`;
    });

    // Phân tách Markdown thành các đoạn bằng dấu xuống dòng kép
    const blocks = maskedMd.split(/\n\n+/);
    const translatedBlocks = [];

    for (const block of blocks) {
      if (!block.trim()) {
        translatedBlocks.push('');
        continue;
      }
      
      const trimmedBlock = block.trim();
      if (placeholders[trimmedBlock]) {
        translatedBlocks.push(trimmedBlock);
        continue;
      }

      // Dịch đoạn văn bản
      let translatedBlock = await this.translateText(block, targetLang, sourceLang);
      
      // Dọn dẹp khoảng trắng dư thừa do Google Translate thêm vào cú pháp bold/italic (ví dụ: "** Giải nén **" -> "**Giải nén**")
      translatedBlock = translatedBlock
        .replace(/\*\*\s+(.*?)\s+\*\*/g, '**$1**')
        .replace(/\*\s+(.*?)\s+\*/g, '*$1*')
        .replace(/\*\*(?:\s+)/g, '**')
        .replace(/(?:\s+)\*\*/g, '**')
        .replace(/\*(?:\s+)/g, '*')
        .replace(/(?:\s+)\*/g, '*');

      translatedBlocks.push(translatedBlock);
    }

    let translatedMd = translatedBlocks.join('\n\n');

    // Khôi phục URL placeholders
    for (const [key, value] of Object.entries(urlPlaceholders)) {
      translatedMd = translatedMd.replaceAll(key, value);
    }

    // Khôi phục Code blocks và Inline code placeholders
    let restored = true;
    let iterations = 0;
    while (restored && iterations < 5) {
      restored = false;
      for (const [key, value] of Object.entries(placeholders)) {
        if (translatedMd.includes(key)) {
          translatedMd = translatedMd.replaceAll(key, value);
          restored = true;
        }
      }
      iterations++;
    }

    return translatedMd;
  }
};

export default TranslationService;
