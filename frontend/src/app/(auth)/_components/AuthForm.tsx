"use client";
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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import Link from "next/link";
import { Pages } from "@/constants/enums";
import { Loader2 } from "lucide-react";

interface Props {
  type: "SIGN_IN" | "SIGN_UP";
  defaultValues: Record<string, string>;
  schema: z.ZodType<any, any>;
  onSubmit: (values: any) => Promise<void>;
  error: string;
}

const AuthForm = ({
  type,
  defaultValues,
  schema,
  onSubmit,
  error,
}: Props) => {
  const isSignIn = type === "SIGN_IN";

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const { isSubmitting } = form.formState;

  return (
    <div className="space-y-9">
      <div className="space-y-3">
        <h2 className="text-[28px] leading-[32px] font-semibold text-white">
          {isSignIn
            ? "Welcome Back to the BookWise"
            : "Create Your Library Account"}
        </h2>
        <p className="text-[18px] leading-[28px]">
          {isSignIn
            ? "Access the vast collection of resources, and stay updated"
            : "Please complete all fields and upload a valid university ID to gain access to the library"}
        </p>
      </div>

      <div className="">
        {error && (
          <p className="text-[18px] mb-1.5 bg-red-200 border-red-800 px-2 py-3 rounded-[4px] text-red-800">
            {error}
          </p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {Object.keys(defaultValues).map((field) => (
              <FormField
                key={field}
                control={form.control}
                name={field}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize text-[16px] leading-[24px] font-normal">
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-14 rounded-[5px] ps-5 text-white !text-[16px] bg-[#232839] border-none font-semibold"
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              disabled={isSubmitting}
              className="bg-gold h-14 rounded-[6px] w-full text-[#14171C] !text-[16px] font-bold hover:bg-gold cursor-pointer"
              type="submit"
            >
              {isSubmitting ? (
                <Loader2 className="!h-7 !w-7 animate-spin" />
              ) : isSignIn ? (
                "Login"
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </div>

      <p className="text-center !text-[16px]">
        {isSignIn ? (
          <>
            Don’t have an account already?{" "}
            <Link
              className="text-gold font-semibold"
              href={`/${Pages.REGISTER}`}
            >
              Register here
            </Link>
          </>
        ) : (
          <>
            Have an account already?{" "}
            <Link className="text-gold font-semibold" href={`/${Pages.LOGIN}`}>
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;
