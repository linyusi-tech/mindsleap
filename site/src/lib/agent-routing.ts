const AGENT_CONTENT_PATH = /^\/(zh|en)(?:\/(?:ai|topics(?:\/[a-z0-9-]+)?|people(?:\/[a-z0-9-]+)?|news(?:\/[a-z0-9-]+)?))?\/?$/;

export function isAgentContentPath(pathname: string) {
  return AGENT_CONTENT_PATH.test(pathname);
}

export function acceptsMarkdown(acceptHeader: string | null) {
  if (!acceptHeader) return false;

  return acceptHeader.split(",").some((entry) => {
    const [mediaType, ...parameters] = entry.trim().toLowerCase().split(";");
    if (mediaType !== "text/markdown") return false;

    const quality = parameters
      .map((parameter) => parameter.trim())
      .find((parameter) => parameter.startsWith("q="));

    if (!quality) return true;

    const qualityValue = Number.parseFloat(quality.slice(2));
    return Number.isNaN(qualityValue) || qualityValue > 0;
  });
}
