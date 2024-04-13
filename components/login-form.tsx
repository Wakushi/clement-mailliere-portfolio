"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { logIn } from "@/lib/auth"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide." }),
  password: z.string(),
})

export default function LoginForm() {
  const router = useRouter()

  const contactForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    const { email, password } = formValues
    try {
      await logIn(email, password)
      contactForm.reset()
      router.push("/")
    } catch (error) {
      alert("Identifiants incorrects.")
      console.error(error)
    }
  }

  return (
    <Form {...contactForm}>
      <form
        onSubmit={contactForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={contactForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  style={{
                    backgroundColor: "transparent",
                    border: "transparent",
                    borderBottom: "1px solid #fff",
                    borderRadius: "0",
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={contactForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password *</FormLabel>
              <FormControl>
                <Input
                  style={{
                    backgroundColor: "transparent",
                    border: "transparent",
                    borderBottom: "1px solid #fff",
                    borderRadius: "0",
                  }}
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4 bg-slate-800 hover:bg-slate-900">
          Login
        </Button>
      </form>
    </Form>
  )
}
