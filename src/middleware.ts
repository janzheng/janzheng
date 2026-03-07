
const CACHE_MAX_AGE = 86400; // 24 hours

export async function onRequest({ locals, request }, next) {

  const url = new URL(request.url);
  const refresh = url.searchParams.get("refresh") === "true";

  const cookieHeader = request.headers.get('cookie');
  let sessionToken = null;

  if (cookieHeader) {
    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
    sessionToken = cookies.session_token;
  }

  if (!sessionToken) {
    locals.user = null;
    const response = await next();
    setCacheHeaders(response, refresh, url.pathname);
    return response;
  }

  // Validate the session token with AuthService
  const authResponse = await fetch("https://auth.labspace.ai/auth/validate-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ session_token: sessionToken })
  });

  const { valid } = await authResponse.json();

  // If the session is not valid, set user to null
  if (!valid) {
    locals.user = null;
    const response = await next();
    setCacheHeaders(response, refresh, url.pathname);
    return response;
  }

  // Fetch the user details using the session token
  const userResponse = await fetch("https://auth.labspace.ai/auth/get-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ session_token: sessionToken })
  });

  const { user } = await userResponse.json();

  // Set the user in locals for access in all pages
  if (user) {
    locals.user = user;
  } else {
    locals.user = null;
  }
  
  const response = await next();
  setCacheHeaders(response, refresh, url.pathname);
  return response;

}

function setCacheHeaders(response, refresh, pathname) {
  if (!response) return;

  const isAuthRoute = pathname.startsWith("/auth") || pathname === "/login" || pathname === "/logout" || pathname === "/dashboard";

  if (isAuthRoute) {
    response.headers.set("Cache-Control", "no-store, private");
    return;
  }

  if (refresh) {
    response.headers.set("Cache-Control", "no-cache");
    response.headers.set("CDN-Cache-Control", "no-cache");
  } else {
    response.headers.set("Cache-Control", "public, max-age=" + CACHE_MAX_AGE + ", s-maxage=" + CACHE_MAX_AGE);
    response.headers.set("CDN-Cache-Control", "public, max-age=" + CACHE_MAX_AGE);
  }
}