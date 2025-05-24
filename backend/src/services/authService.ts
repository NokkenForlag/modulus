export function createLoginRedirectURL(): string {
  const clientId = process.env.FEIDE_CLIENT_ID;
  const redirectUri = process.env.FEIDE_REDIRECT_URI;
  const issuer = process.env.FEIDE_ISSUER;

  if (!clientId || !redirectUri || !issuer) {
    throw new Error("Missing FEIDE_* env variables");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
  });

  return `${issuer}/authorize?${params.toString()}`;
}