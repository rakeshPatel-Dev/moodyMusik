export async function fetchPlaylist(selectedMood: string, API_KEY: string) {
  const searchResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&videoDuration=medium&q=${selectedMood}+official+music+video&maxResults=50&videoEmbeddable=true&key=${API_KEY}`
  );

  const searchData = await searchResponse.json();

  if (!searchData.items || searchData.items.length === 0) return [];

  const videoIds = searchData.items.map((v: any) => v.id.videoId).join(",");

  const videoResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${API_KEY}`
  );

  const videoData = await videoResponse.json();

  const format = (iso: string) => {
    if (!iso) return "N/A";
    const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
    const m = match?.[1] ? parseInt(match[1]) : 0;
    const s = match?.[2] ? parseInt(match[2]) : 0;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return searchData.items.map((item: any, index: number) => {
    const iso = videoData.items[index]?.contentDetails?.duration;
    const duration = format(iso);

    const title = item.snippet.title.toLowerCase();
    let language = "English";
    if (title.match(/नेपाली|nepali|नेपाल/)) language = "Nepali";
    else if (title.match(/हिन्दी|hindi|bollywood/)) language = "Hindi";

    return { ...item, duration, language };
  });
}
