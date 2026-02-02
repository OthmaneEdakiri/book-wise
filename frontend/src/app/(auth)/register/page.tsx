"use client";
import React, { useState } from "react";
import AuthForm from "../_components/AuthForm";
import z from "zod";
import { signupAction } from "@/lib/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Pages } from "@/constants/enums";
import { registerSchema } from "@/lib/validations";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const res = await signupAction(values);

    switch (res.status) {
      case 204:
        toast.success("Account created successfully");
        router.push(`/${Pages.LOGIN}`);
        break;
      case 422:
        setError(res.message);
        break;
      case 500:
        toast.error(res.message);
        break;
      default:
        break;
    }
  };
  return (
    <AuthForm
      error={error}
      onSubmit={onSubmit}
      type="SIGN_UP"
      defaultValues={{
        firstname: "",
        lastname: "",
        university_id: "",
        email: "",
        password: "",
        password_confirmation: "",
      }}
      schema={registerSchema}
    />
  );
};

export default RegisterPage;
