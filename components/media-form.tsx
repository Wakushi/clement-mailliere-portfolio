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
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { createMedia, generateImage, uploadVideo } from "@/lib/data"

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
})

interface MediaFormProps {
  type: "drawing" | "animation" | "sketch"
  setIsSubmitting: (value: boolean) => void
  setIsSuccess: (value: boolean) => void
  refreshList: () => void
}

export default function MediaForm({
  type,
  setIsSuccess,
  setIsSubmitting,
  refreshList,
}: MediaFormProps) {
  const mediaForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  let selectedFile: File[] = []

  function onSelectMedia(event: any) {
    const file = event.target.files[0]
    if (file) {
      selectedFile = [file]
    }
  }

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      if (selectedFile[0].type.split("/")[0] !== "video") {
        const formData = new FormData()
        formData.append("image", selectedFile[0])
        const imageUrl = await generateImage(selectedFile[0])
        const response = await createMedia({
          title: formValues.title ?? "",
          description: formValues.description ?? "",
          type,
          imageUrl,
        })
        if (response) {
          setIsSuccess(true)
          refreshList()
        }
      } else {
        await uploadVideo(selectedFile[0], false, type)
        setIsSuccess(true)
        refreshList()
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
        className="flex flex-col gap-2 p-4 w-full m-auto max-w-[500px]"
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
        <label htmlFor="image">Media (10Mb max for images)</label>
        <input id="image" type="file" onChange={(e) => onSelectMedia(e)} />
        <Button
          type="submit"
          className="bg-indigo-800 w-full hover:text-indigo-800 hover:bg-white px-4 py-2 rounded font-bold text-md mt-4"
        >
          Create
        </Button>
      </form>
    </Form>
  )
}
