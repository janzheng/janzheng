
export async function onRequest({ locals, request }, next) {

  const cookieHeader = request.headers.get('cookie');
  let sessionToken = null;

  if (cookieHeader) {
    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
    sessionToken = cookies.session_token;
  }

  if (!sessionToken) {
    locals.user = null;
    return next();
  }

  // Validate the session token with AuthService
  const response = await fetch("https://auth.labspace.ai/auth/validate-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ session_token: sessionToken })
  });

  const { valid } = await response.json();

  // If the session is not valid, set user to null
  if (!valid) {
    locals.user = null;
    return;
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
  
  return next();

}