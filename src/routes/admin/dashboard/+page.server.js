export async function load({ cookies }) {
  const dataUser = cookies.get("user")

  // kembalikan data sebagai props
  return {
    user: JSON.parse(dataUser)
  }
}