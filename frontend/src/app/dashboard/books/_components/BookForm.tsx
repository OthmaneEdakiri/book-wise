"use client";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { createBookAction, updateBookAction } from "@/lib/actions/book";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { createBookSchema, updateBookSchema } from "@/lib/validations";
import Image from "@/components/icons/admin/Image";
import X from "@/components/icons/admin/X";
import ImageUp from "@/components/icons/admin/ImageUp";

type Book = {
  id: string;
  title: string;
  genre: string;
  author: string;
  total_copies: number;
  available_copies?: number;
  image?: string;
  summary: string;
  description?: string;
};

interface Props extends Partial<Book> {
  type?: "CREATE" | "UPDATE";
}

const BookForm = ({ type, ...book }: Props) => {
  const isUpdateForm = type === "UPDATE";
  const [selectedImage, setSelectedImage] = useState(book.image ?? "");
  const bookSchema = isUpdateForm ? updateBookSchema : createBookSchema;
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: isUpdateForm
      ? {
          title: book.title ?? "",
          genre: book.genre ?? "",
          author: book.author ?? "",
          total_copies: book.total_copies ?? 1,
          image: "",
          summary: book.summary ?? "",
          description: book.description ?? "",
        }
      : {
          title: "",
          genre: "",
          author: "",
          total_copies: 100,
          image: "",
          summary:
            "People in Glass Houses by Jayne Castle (a pseudonym for Jayne Ann Krentz) is a science fiction romance set in a future world where people with psychic abilities live in harmony with advanced technology. The story follows the main characters, Harriet and Sam, who are drawn together under unusual circumstances.Harriet, a talented psychic, works for a company that offers psychic services in a futuristic society. When she finds herself tangled in a dangerous situation involving a mysterious conspiracy, she enlists the help of Sam, a former investigator with a dark past. As they uncover the secrets surrounding a glass house—a mysterious structure tied to their ",
          description:
            "Origin is a 2017 mystery-thriller novel by American author Dan Brown. It is the fifth installment in the Robert Langdon series, following previous bestsellers such as The Da Vinci Code and Angels & Demons. ",
        },
  });

  const {
    formState: { isSubmitting, isDirty },
    setError,
    reset,
  } = form;

  async function handleCreateSubmit(values: z.infer<typeof createBookSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([name, value]) => {
      formData.append(name, value as any);
    });

    try {
      const res = await createBookAction(formData);
      switch (res.status) {
        case 200:
          reset();
          setSelectedImage("");
          toast.message("Book created successfully");
          break;
        case 422:
          Object.entries(res.errors).forEach(([key, value]) => {
            const field = key as keyof typeof values;
            if (Array.isArray(value)) {
              setError(field, { type: "manual", message: value[0] });
            }
          });
          break;
        case 500:
          toast.error(res.message);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateSubmit(values: z.infer<typeof updateBookSchema>) {
    if (book.id) {
      const formData = new FormData();
      Object.entries(values).forEach(([name, value]) => {
        formData.append(name, value as any);
      });
      formData.append("_method", "PUT");
      try {
        const res = await updateBookAction(formData, book.id);
        switch (res.status) {
          case 200:
            toast.message("Book updated successfully");
            break;
          case 422:
            Object.entries(res.errors).forEach(([key, value]) => {
              const field = key as keyof typeof values;
              if (Array.isArray(value)) {
                setError(field, { type: "manual", message: value[0] });
              }
            });
            break;
          case 500:
            toast.error(res.message);
            break;

          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const onSubmit = isUpdateForm ? handleUpdateSubmit : handleCreateSubmit;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="admin-custom-label">Book Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="admin-custom-input"
                  placeholder="Enter the book title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="admin-custom-label">
                Book Description
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="admin-custom-input"
                  placeholder="Enter the book Description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="admin-custom-label">Author</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="admin-custom-input"
                  placeholder="Enter the author name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="admin-custom-label">Genre</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="admin-custom-input"
                  placeholder="Enter the genere of the book"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total_copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="admin-custom-label">
                Total number of books
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="admin-custom-input"
                  placeholder="Enter the total number of books"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(
                      e.target.value === "" ? "" : e.target.valueAsNumber,
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="admin-custom-label">Book Image</FormLabel>
              <FormControl>
                <UploadImage
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  field={field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="admin-custom-label">Book Summary</FormLabel>
              <FormControl>
                <Textarea
                  className="admin-custom-input"
                  {...field}
                  placeholder="Enter the genere of the book"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting || !isDirty}
          className="h-14 bg-[#25388C] w-full font-bold"
          type="submit"
        >
          {isSubmitting ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : isUpdateForm ? (
            "Update Book"
          ) : (
            "Create Book"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;

const UploadImage = ({
  field,
  selectedImage,
  setSelectedImage,
}: {
  field: ControllerRenderProps<any, "image">;
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];

    if (file) setSelectedImage(file.name);
    field.onChange(file);
  };

  const removeFileHandler = () => {
    setSelectedImage("");
    field.onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="">
      <Input
        onBlur={field.onBlur}
        onChange={handleImageChange}
        type="file"
        name={field.name}
        accept="image/*"
        className="hidden"
        id="image-upload"
        ref={(el) => {
          field.ref(el); // passing ref to RHF
          inputRef.current = el; // saving reference locally
        }}
      />

      <Label
        htmlFor="image-upload"
        className="w-full h-[56px] flex justify-center items-center border border-[#CBD5E1] bg-[#F9FAFB]"
      >
        {selectedImage ? (
          <span className="px-2.5 py-1.5 bg-[#25388C1A] flex items-center gap-1.5 text-[#25388C] text-[16px] leading-[24px] font-semibold">
            <Image />

            {selectedImage}

            <button
              type="button"
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                removeFileHandler();
              }}
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </span>
        ) : (
          <span className="flex items-center gap-3 text-[16px] leading-[24px]">
            <ImageUp />
            Upload an image
          </span>
        )}
      </Label>
    </div>
  );
};
