export async function POST(request: Request) {
  const scope = "user-top-read";
  const NEXT_PUBLIC_SPOTIFY_CLIENT_ID =  process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
  const NEXT_PUBLIC_NEXTAUTH_URL =  process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: `${NEXT_PUBLIC_NEXTAUTH_URL}/api/auth`,
  }).toString();

  // Return the URL as JSON, don't redirect
  return new Response(JSON.stringify({
    url: `https://accounts.spotify.com/authorize?${queryParams}`
  }), {
    headers: { "Content-Type": "application/json" }
  });
}