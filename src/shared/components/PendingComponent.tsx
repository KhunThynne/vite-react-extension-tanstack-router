import { Spinner } from "./ui/spinner";

const PendingComponent = () => {
  return (
    <div className="flex items-center justify-center p-4 w-full h-full min-h-[50vh]">
      <Spinner />
    </div>
  );
};

export default PendingComponent;
