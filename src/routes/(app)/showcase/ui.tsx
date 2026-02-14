import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { ContainerSection } from "@components/ContainerSection";
import type { JSX } from "react";

export const Route = createFileRoute("/(app)/showcase/ui")({
  component: UIShowcase,
});

function UIShowcase(): JSX.Element {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">UI Components Showcase</h1>
      <p className="text-muted-foreground">
        A collection of beautiful Shadcn UI components available in the system.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContainerSection
          title="Buttons"
          className="bg-card p-6 rounded-lg shadow-sm border"
        >
          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </ContainerSection>

        <ContainerSection
          title="Badges"
          className="bg-card p-6 rounded-lg shadow-sm border"
        >
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </ContainerSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContainerSection
          title="Cards"
          className="bg-card p-6 rounded-lg shadow-sm border"
        >
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content goes here.</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </ContainerSection>
      </div>
    </div>
  );
}
