import { fail } from "@sveltejs/kit"

export const actions = {
  register: async ({ request }) => {
    try {
      const formData = await request.formData()
      const name = formData.get("name")
      const email = formData.get("email")
      const password = formData.get("password")

      // insert data with API
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        return fail(response.status, {
          success: false,
          message: result.message || "Terjadi error ketika menyimpan data.",
          errors: result.errors || [],
          values: { name, email, password  }
        })
      }

      return { success: true }

    } catch (error) {
      if (error instanceof Response) {
        throw error
      }
      console.error("Error registering user:", error)
      return fail(500, {
        success: false,
        message: "Terjadi kesalahan server.",
      })
    }

  }
}