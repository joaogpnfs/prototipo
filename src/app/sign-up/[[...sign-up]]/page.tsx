import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            card: "shadow-xl rounded-2xl border border-gray-200 p-6 bg-white",
            formButtonPrimary:
              "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded",
          },
          variables: {
            colorPrimary: "#4f46e5",
          },
        }}
      />
    </div>
  );
}
