import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, type FormEvent } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

export default function SignInComponent() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { status } = await axios.post(`${import.meta.env.VITE_API_URL}/api/protected/sign-in`,{ email, password }, {withCredentials: true});
      if (status == 200) {
        setError(null)
        setSuccess("Logged in successfully")

        setTimeout(() => {
          navigate('/my-decks')
        }, 2000);
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
  }
 
  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-header-font">Welcome to AstroDecks</CardTitle>
          <CardDescription>
            A free flashcard app for every student
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={e => handleSignUp(e)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        onInvalid={(e) => {
                          e.preventDefault();
                          setError("Invalid password");
                        }}
                      />
                    </div>
                    <div>
                      {error && <p className="text-red-600">{error}</p>}
                      {success && <p className="text-green-600">{success}</p>}
                    </div>
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
