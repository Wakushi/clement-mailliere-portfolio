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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { generateImage } from "@/lib/data"

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
})

interface MediaFormProps {
  type: "drawing" | "animation" | "sketch"
  setIsSubmitting: (value: boolean) => void
  setIsSuccess: (value: boolean) => void
}

export default function MediaForm({
  type,
  setIsSuccess,
  setIsSubmitting,
}: MediaFormProps) {
  const mediaForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  let selectedImage: File[] = []

  function onSelectImage(event: any) {
    const file = event.target.files[0]
    if (file) {
      selectedImage = [file]
    }
  }

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("image", selectedImage[0])
      const imageUrl = await generateImage(selectedImage[0])
      const newMedia = {
        title: formValues.title ?? "",
        description: formValues.description ?? "",
        type,
        imageUrl,
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/media` ?? "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMedia),
        }
      )
      const data = await response.json()
      if (true) {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...mediaForm}>
      <form
        onSubmit={mediaForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={mediaForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
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
          control={mediaForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  style={{
                    backgroundColor: "transparent",
                    border: "transparent",
                    borderBottom: "1px solid #fff",
                    borderRadius: "0",
                    resize: "none",
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <label htmlFor="image">Image (10Mb max)</label>
        <input id="image" type="file" onChange={(e) => onSelectImage(e)} />
        <Button type="submit" className="mt-4">
          Create
        </Button>
      </form>
    </Form>
  )
}
