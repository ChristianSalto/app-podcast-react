

export function removeHTMLTags(text) {
    return text[0].replace(/<[^>]+>/g, '');
  }