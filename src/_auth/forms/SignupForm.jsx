import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccountMutation,
  useSignInAccount,
} from "../../lib/react-query/queriesAndMutations";
import { SignupValidation } from "./../../lib/validation/index";

import { useUserContext } from "../../context/AuthContext";

export function SignupForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  //Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } =
    useSignInAccount();
  // Define a submit handler.
  async function handleSignup(user) {
    // create an new user
    try {
      const newUser = await createUserAccount(user);
      if (!newUser) {
       toast({
          title: "Sign up failed . Please try again1 ",
        });
        return;
      }
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({title: "Sign in failed . Please try again ",});
        navigate("/sign-in");
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
          Create a new Account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use OliveChat .Please Enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isCreatingUser || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already Have an Account ?{" "}
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
