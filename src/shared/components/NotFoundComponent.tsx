import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const NotFoundComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 dark:bg-neutral-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-destructive">
            404 Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>The page you are looking for does not exist.</p>
          <Button onClick={() => window.history.back()} variant="outline">
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default NotFoundComponent;
