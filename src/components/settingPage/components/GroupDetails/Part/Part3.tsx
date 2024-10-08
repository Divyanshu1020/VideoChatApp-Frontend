import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGroupDetails } from "../ContextApi/groupDeatailsContextApi";

export default function Part3() {
 const {isLoading} = useGroupDetails()

  return (
    <Card className="" x-chunk="dashboard-04-chunk-2">
      <CardHeader className="pb-3">
        <CardTitle>Update</CardTitle>
        <CardDescription className=" text-balance leading-relaxed">
          Update all the changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button disabled={isLoading} className="disabled:opacity-50" type="submit">{isLoading ? "Loading..." : "Update" }</Button>
      </CardContent>
    </Card>
  );
}
