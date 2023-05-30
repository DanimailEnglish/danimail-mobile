export function muxPlaybackUrl(playbackId: string | undefined) {
  return playbackId && `https://stream.mux.com/${playbackId}.m3u8`;
}

export function muxThumbnailUrl(playbackId: string | undefined) {
  return playbackId && `https://image.mux.com/${playbackId}/thumbnail.png`;
}
