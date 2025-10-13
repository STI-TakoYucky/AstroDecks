import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, type FormEvent } from "react";
import UsernameComponent from "./ConfirmSignUpComponent";
import Logo from '/images/AstroDecksLogo.svg'
import { Eye, LockKeyhole, Mail } from "lucide-react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function SignUpComponent() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("")
  const [error, setError] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {!emailVerified ? (
        <div className={"flex flex-col gap-6"}>
          <Card className="rounded-md dark:bg-foreground text-black-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-header-font">
                <CardTitle className="text-4xl font-header-font text-center flex items-center justify-center gap-2 mb-2"><div><img src={Logo} alt="AstroDecksLogo" className="min-w-[3rem] h-[3rem] "/> </div>AstroDecks</CardTitle>
              </CardTitle>
              <CardDescription>Sign up to get you started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleVerifyEmail(e)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-3 relative">
                      <Mail size={18} className="absolute bottom-[9px] left-3 text-gray-600"/>
                      <Input
                        id="email"
                        type="email"
                        className="px-10"
                        placeholder="m@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        onInvalid={(e) => {
                          e.preventDefault()
                          setError("Email is invalid")
                        }}
                        required
                      />
                    </div>
                    <div className="grid gap-3 relative">
                      <LockKeyhole size={18} className="absolute bottom-[9px] left-3 text-gray-600"/>
                      <Input
                        id="password"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="px-10"
                        placeholder="Password"
                        type={showPassword ? "text": "password"}
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
                      <button type="button" className="absolute bottom-[7px] cursor-pointer right-3 text-gray-600" onClick={() => setShowPassword(prev => !prev)}>
                        <Eye size={22}/>
                      </button>
                    </div>
                    <div className="grid gap-3 relative">
                      <LockKeyhole size={18} className="absolute bottom-[9px] left-3 text-gray-600"/>
                      <Input
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        className="px-10"
                        type={showConfirmPassword ? "text": "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button className="absolute bottom-[7px] cursor-pointer right-3 text-gray-600" type="button" onClick={() => setShowConfirmPassword(prev => !prev)}>
                        <Eye size={22}/>
                      </button>
                    </div>
                    <div>
                      {error && <p className="text-red-600">{error}</p>}
                    </div>
                    <Button type="submit" className="w-full">
                      {loading ? <>Loading <Spinner key={"circle"} variant={"circle"} /></> : "Sign Up"}
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
