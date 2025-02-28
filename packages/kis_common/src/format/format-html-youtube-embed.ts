export const formatHTMLYoutubeEmbed = (embedContent: string) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)([a-zA-Z0-9_-]+)(?=[^\w-]|$)/;
  const match = embedContent?.match(regex);
  if (!match) return embedContent;
  const videoId = match[1];
  const newUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&rel=0&controls=0&rel=0&modestbranding=0&showinfo=0`;
  const output = embedContent?.replace(/src="[^"]+"/, `src="${newUrl}"`);
  return output;
};
