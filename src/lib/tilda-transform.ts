type CasePreviewVideoItem = {
  shapeSelector: string;
  src: string;
};

export function removeTildaRecord(html: string, recordId: string) {
  const startMarker = `<div id="${recordId}"`;
  const startIndex = html.indexOf(startMarker);

  if (startIndex === -1) {
    return html;
  }

  const nextRecordIndex = html.indexOf(' <div id="rec', startIndex + startMarker.length);
  const endIndex = nextRecordIndex === -1 ? html.length : nextRecordIndex;

  return `${html.slice(0, startIndex)}${html.slice(endIndex)}`;
}

export function replaceTildaRecord(html: string, recordId: string, nextRecord: string) {
  const startMarker = `<div id="${recordId}"`;
  const startIndex = html.indexOf(startMarker);

  if (startIndex === -1) {
    return html;
  }

  const nextRecordIndex = html.indexOf(' <div id="rec', startIndex + startMarker.length);
  const endIndex = nextRecordIndex === -1 ? html.length : nextRecordIndex;

  return `${html.slice(0, startIndex)}${nextRecord}${html.slice(endIndex)}`;
}

export function transformTildaRecord(
  html: string,
  recordId: string,
  transform: (recordHtml: string) => string,
) {
  const startMarker = `<div id="${recordId}"`;
  const startIndex = html.indexOf(startMarker);

  if (startIndex === -1) {
    return html;
  }

  const nextRecordIndex = html.indexOf(' <div id="rec', startIndex + startMarker.length);
  const endIndex = nextRecordIndex === -1 ? html.length : nextRecordIndex;

  return `${html.slice(0, startIndex)}${transform(html.slice(startIndex, endIndex))}${html.slice(endIndex)}`;
}

export function removeTildaElement(html: string, elemId: string) {
  const elemMarker = `data-elem-id='${elemId}'`;
  const markerIndex = html.indexOf(elemMarker);

  if (markerIndex === -1) {
    return html;
  }

  const startIndex = html.lastIndexOf("<div class='t396__elem", markerIndex);

  if (startIndex === -1) {
    return html;
  }

  const nextElementIndex = html.indexOf(" <div class='t396__elem", markerIndex);
  const recordEndIndex = html.indexOf(" </div> </div> <script", markerIndex);
  const endIndex = [nextElementIndex, recordEndIndex]
    .filter((index) => index !== -1)
    .reduce((nextIndex, index) => Math.min(nextIndex, index), html.length);

  return `${html.slice(0, startIndex)}${html.slice(endIndex)}`;
}

export function removeTildaElementInRecord(html: string, recordId: string, elemId: string) {
  return transformTildaRecord(html, recordId, (recordHtml) =>
    removeTildaElement(recordHtml, elemId),
  );
}

export function replaceTildaText(html: string, elemId: string, nextText: string) {
  const pattern = new RegExp(
    `(<div\\b[^>]*data-elem-id=(['"])${elemId}\\2[^>]*>[\\s\\S]*?<div class='tn-atom'[^>]*>)([\\s\\S]*?)(</div>)`,
  );

  return html.replace(pattern, `$1${nextText}$4`);
}

export function replaceTildaTextInRecord(
  html: string,
  recordId: string,
  elemId: string,
  nextText: string,
) {
  const startMarker = `<div id="${recordId}"`;
  const startIndex = html.indexOf(startMarker);

  if (startIndex === -1) {
    return html;
  }

  const nextRecordIndex = html.indexOf(' <div id="rec', startIndex + startMarker.length);
  const endIndex = nextRecordIndex === -1 ? html.length : nextRecordIndex;
  const recordHtml = html.slice(startIndex, endIndex);

  return replaceTildaRecord(
    html,
    recordId,
    replaceTildaText(recordHtml, elemId, nextText),
  );
}

export function replaceTildaButtonTextInRecord(
  html: string,
  recordId: string,
  elemId: string,
  nextText: string,
) {
  const startMarker = `<div id="${recordId}"`;
  const startIndex = html.indexOf(startMarker);

  if (startIndex === -1) {
    return html;
  }

  const nextRecordIndex = html.indexOf(' <div id="rec', startIndex + startMarker.length);
  const endIndex = nextRecordIndex === -1 ? html.length : nextRecordIndex;
  const recordHtml = html.slice(startIndex, endIndex);
  const pattern = new RegExp(
    `(<div\\b[^>]*data-elem-id=(['"])${elemId}\\2[^>]*>[\\s\\S]*?<span class="tn-atom__button-text">)([\\s\\S]*?)(</span>)`,
  );

  return replaceTildaRecord(
    html,
    recordId,
    recordHtml.replace(pattern, `$1${nextText}$4`),
  );
}

export function restoreTildaImageSources(html: string) {
  return html.replace(/<img\b[^>]*>/g, (tag) => {
    const src = tag.match(/\bsrc=(['"])(.*?)\1/i)?.[2];
    const original = tag.match(/\bdata-original=(['"])(.*?)\1/i)?.[2];

    if (!src || !original || !src.includes("__resize__20x__")) {
      return tag;
    }

    return tag.replace(/\bsrc=(['"])(.*?)\1/i, (_match, quote) => `src=${quote}${original}${quote}`);
  });
}

export function injectCasePreviewVideos(
  html: string,
  casePreviewVideoItems: readonly CasePreviewVideoItem[],
) {
  return casePreviewVideoItems.reduce((nextHtml, item) => {
    const shapeClass = item.shapeSelector.slice(1);
    const pattern = new RegExp(
      `(<div class='t396__elem tn-elem ${shapeClass}[^']*'[\\s\\S]*?<div class='tn-atom'>)(\\s*)(</div>)`,
    );
    const videoMarkup = `<video class="case-preview-native-video" muted playsinline webkit-playsinline preload="none" loop aria-hidden="true" data-src="${item.src}"></video>`;

    return nextHtml.replace(pattern, `$1$2${videoMarkup}$3`);
  }, html);
}

export function injectBeforeTildaRecordScript(
  html: string,
  recordNumericId: string,
  markup: string,
) {
  const marker =
    `</div> </div> <scr` +
    `ipt>t_onFuncLoad('t396_initialScale',function() {t396_initialScale('${recordNumericId}');});`;

  if (!html.includes(marker)) {
    return html;
  }

  return html.replace(marker, `${markup}${marker}`);
}

export function removeHeadAssetReferences(html: string, assetPaths: readonly string[]) {
  return assetPaths.reduce((nextHtml, assetPath) => {
    const escapedPath = assetPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const linkPattern = new RegExp(
      `<link\\b(?=[^>]*\\bhref=(['"])${escapedPath}\\1)[^>]*>\\s*`,
      "gi",
    );
    const scriptPattern = new RegExp(
      `<script\\b(?=[^>]*\\bsrc=(['"])${escapedPath}\\1)[^>]*>\\s*<\\/script>\\s*`,
      "gi",
    );

    return nextHtml.replace(linkPattern, "").replace(scriptPattern, "");
  }, html);
}

export function dedupeHeadAssetReferences(html: string) {
  const seen = new Set<string>();

  return html.replace(
    /<(link|script)\b[^>]*(?:href|src)=(['"])([^'"]+)\2[^>]*(?:><\/script>|>)/gi,
    (tag, tagName, _quote, rawUrl) => {
      if (!/^(css|js)\//.test(rawUrl)) {
        return tag;
      }

      const key = `${tagName.toLowerCase()}:${rawUrl}`;

      if (seen.has(key)) {
        return "";
      }

      seen.add(key);
      return tag;
    },
  );
}
