"use client";

import { SignIn } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md shadow-2xl border">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center gap-3">
              <CardTitle className="text-4xl font-sans font-semibold flex items-center gap-2 text-emerald-600">
                <Image
                  src="/clinivet.png"
                  alt="CliniVet Logo"
                  width={75}
                  height={65}
                  className="rounded-full"
                />
                CliniVet
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Acesse sua conta para continuar
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <SignIn
              path="/sign-in"
              routing="path"
              signUpUrl="/sign-up"
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition-colors",
                },
                variables: {
                  colorPrimary: "#059669",
                },
              }}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
