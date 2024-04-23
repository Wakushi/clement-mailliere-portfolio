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
import { updateMedia } from "@/lib/data"
import { Media } from "@/lib/types"
import { Button } from "./ui/button"

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
})

interface UpdateMediaFormProps {
  media: Media
  setIsSubmitting: (value: boolean) => void
  setIsSuccess: (value: boolean) => void
  setSuccessMessage: (value: string) => void
  refreshList?: () => void
}

export default function MediaUpdateForm({
  media,
  setIsSuccess,
  setIsSubmitting,
  setSuccessMessage,
  refreshList,
}: UpdateMediaFormProps) {
  const mediaForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: media.title,
      description: media.description,
    },
  })

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await updateMedia({
        ...media,
        title: formValues.title ?? "",
        description: formValues.description ?? "",
      })
      if (response) {
        setIsSuccess(true)
        setSuccessMessage("Media updated successfully !")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
      if (refreshList) refreshList()
    }
  }
  return (
    <Form {...mediaForm}>
      <form
        onSubmit={mediaForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
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
        <Button
          type="submit"
          className="bg-indigo-800 w-full hover:text-indigo-800 hover:bg-white px-4 py-2 rounded font-bold text-md"
        >
          Update
        </Button>
      </form>
    </Form>
  )
}
