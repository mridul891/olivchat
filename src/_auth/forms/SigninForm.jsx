import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigate } from "react-router";
const SigninForm = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <CardTitle className="text-[20px] font-bold"> Log in To your account</CardTitle>
        <CardDescription className="text-[16px]">Welcome Back. Please Enter your Details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type = "email" id="email" placeholder="Email" />
              <Label htmlFor="password">Password</Label>
              <Input type = "password" id="password" placeholder="Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full">Login</Button>
      </CardFooter>
    </Card>
  )
}

export default SigninForm
