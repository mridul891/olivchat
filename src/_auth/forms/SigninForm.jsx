import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import {
  useSignInAccount,
} from "../../lib/react-query/queriesAndMutations";
import { SigninValidation } from "./../../lib/validation/index";

import { useUserContext } from "../../context/AuthContext";

export function SigninForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Queries
  const { mutateAsync: signInAccount} =
    useSignInAccount();
  // Define a submit handler.
  async function handleSignin(user) {
    // create an new user
    try {
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({title: "Sign in failed . Please try again ",});
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
         toast({ title: "Sign up failed. Please try again " });
         return;
      }
    } catch (error) {
      console.log({ error });
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        {<img src="assets/images/logo.svg" alt="logo" />}
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to Your Account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
         Welcome back! Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Dont have an Account ?{" "}
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
