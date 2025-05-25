// auth.mjs

export function requireFeideRole(redirectTo = "/auth.html") {
  const role = localStorage.getItem("feide_role");
  if (!role) {
    window.location.href = redirectTo;
  }
}

export function logoutAndRedirect(redirectTo = "/") {
  localStorage.removeItem("id_token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("feide_role");
  window.location.href = redirectTo;
}

export function requireAnyAuth(redirectTo = "/auth.html") {
  const role = localStorage.getItem("feide_role");
  const hasWfUserCookie = document.cookie.includes("wf_user=");
  if (!role && !hasWfUserCookie) {
    window.location.href = redirectTo;
  }
}

export function isLoggedIn() {
  const hasFeide = !!localStorage.getItem("feide_role");
  const hasWebflowUser = document.cookie.includes("wf_user=");
  return hasFeide || hasWebflowUser;
}