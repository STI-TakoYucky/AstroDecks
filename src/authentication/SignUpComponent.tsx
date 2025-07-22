import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState, type FormEvent } from "react";
import UsernameComponent from "./ConfirmSignUpComponent";
import Logo from '/images/AstroDecksLogo.svg'

export default function SignUpComponent() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("")
  const [error, setError] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);

  const handleVerifyEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailVerified(null);

    if (error) {
      setError(null);
    }

    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }

    // if all validities are passed axios req to check if email already exists
    try {
      const { status } = await axios.post(`${import.meta.env.VITE_API_URL}/api/protected/verify-email`,{ email });
      if (status == 200) {
        setEmailVerified(true);
        setError(null)
      }
    } catch (error: any) {
      setError(error.response.data.message);
      setEmailVerified(null)
    }
  };

  return (
    <>
      {!emailVerified ? (
        <div className={"flex flex-col gap-6"}>
          <Card >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-header-font">
                <CardTitle className="text-4xl font-header-font text-center flex items-center justify-center gap-2 mb-2"><div><img src={Logo} alt="AstroDecksLogo" className="w-[3rem] h-[3rem] "/> </div>AstroDecks</CardTitle>
              </CardTitle>
              <CardDescription>Sign up to get you started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleVerifyEmail(e)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        onInvalid={(e) => {
                          e.preventDefault()
                          setError("Email is invalid")
                        }}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        onInvalid={(e) => {
                          e.preventDefault();
                          const validity = e.currentTarget.validity;
                          
                          if (validity.patternMismatch) {
                            setError(
                              "Password must be at least 8 characters and include a letter and a number."
                            );
                          } else {
                            setError("Invalid password");
                          }
                        }}
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                      </div>
                      <Input
                        id="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      {error && <p className="text-red-600">{error}</p>}
                    </div>
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <a href="/sign-in" className="underline underline-offset-4">
                      Sign in
                    </a>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : (
        <UsernameComponent setEmailVerified={setEmailVerified} email={email} username={username} setUsername={setUsername} password={password}></UsernameComponent>
      )}
    </>
  );
}
