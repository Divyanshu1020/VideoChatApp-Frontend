import { login } from "@/api/api";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login as loginAction, UserInterface } from "@/redux/reducers/auth";
import { useLazyGetNotificationsQuery } from "@/redux/api/api";

interface Inputs {
  identifier: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const dispatch = useDispatch();
  const [getNotifications] = useLazyGetNotificationsQuery();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const loginResponse = await login({
        identifier: data.identifier,
        password: data.password,
      });

      const userData: UserInterface = loginResponse.user

      if (loginResponse) {
        const notifications = await getNotifications("");
        dispatch(loginAction({ user: userData, notification: notifications.data.data }));
      }

      
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };
  return (
    <div className=" h-full flex flex-col items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="identifier">Email/UserName</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="Enter your email Id or username"
                required
                {...register("identifier", {
                  required: "Email is required",
                  validate: {
                    matchPatern: (value) => {
                      return (
                        /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Please enter a valid email"
                      );
                    },
                  },
                  maxLength: {
                    value: 50,
                    message:"Email must be at most 50 characters long",
                  }
                })}
              />
              {errors.identifier && (
                <p className="text-sm text-red-500">
                  {errors.identifier.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to={"/forgot-password"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                {...register("password",{
                  required: true,
                  maxLength: {
                    value: 50,
                    message:"Password must be at most 50 characters long",
                  }
                } )}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {errors.root && (
                <p className="text-sm text-red-500">
                  {errors.root?.message}
                </p>
              )}
            <Button type="submit" className="w-full">
              {isSubmitting ? "Loading..." : "Login"}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
