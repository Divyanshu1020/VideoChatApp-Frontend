import Bottom from "./components/Bottom";
import Center from "./components/Center";
import Top from "./components/Top";

export default function Right() {
  return (
    <div className="  relative flex  min-h-[50vh] flex-col rounded-xl bg-muted/50  ">
      <Top/>
      <Center/>
      <Bottom/>
    </div>
  );
}
