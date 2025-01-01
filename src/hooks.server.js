import { redirect } from "@sveltejs/kit"

export async function handle({ event, resolve }) {
  // ambil cookie token
  const token = event.cookies.get("token")

  // ambil url
  const { pathname } = event.url

  // URL yang tidak memerlukan token (login dan register)
  const publicPaths = ["/login", "/register"]

  // pengecekan /admin
  const isAdmin = pathname.startsWith("/admin")

  if (token && publicPaths.includes(pathname)) {
    throw redirect(302, "/admin/dashboard")
  }

  if (!token &&isAdmin) {
    throw redirect(302, "/login")
  }

  // lanjutkan permintaan berikutnya
  return await resolve(event)
}