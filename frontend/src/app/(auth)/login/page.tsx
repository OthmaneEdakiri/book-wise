"use client";
import React, { useEffect, useState } from "react";
import AuthForm from "../_components/AuthForm";
import z from "zod";
import { loginAction } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validations";

const LoginPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const response = await loginAction(values);
    switch (response?.status) {
      case 200:
        router.push(`/`);
        toast.success(response.message);
        break;
      case 422:
        setError(response.message);
        break;

      case 500:
        toast.error(response.message);
        break;

      default:
        break;
    }
  }

  return (
    <AuthForm
      type="SIGN_IN"
      defaultValues={{ email: "", password: "" }}
      schema={loginSchema}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginPage;
