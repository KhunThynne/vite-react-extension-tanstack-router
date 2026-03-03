import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { ContainerSection } from "@/shared/components/ContainerSection";
import { useAppForm } from "@/shared/hooks/useAppForm";
import { Card, CardContent } from "@/shared/components/ui/card";

export const Route = createFileRoute("/(app)/showcase/forms")({
  component: FormsShowcase,
});

function FormsShowcase() {
  const form = useAppForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      notifications: false,
      theme: "light",
      bio: "",
      role: "user",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Forms Showcase</h1>
      <p className="text-muted-foreground">
        Demonstration of TanStack Form integration with Shadcn UI using
        pre-configured field components.
      </p>

      <ContainerSection title="Example Form" className="">
        <Card className="max-w-xl">
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-4 max-w-xl"
            >
              <div className="grid grid-cols-2 gap-4">
                <form.AppField
                  name="firstName"
                  children={(field) => (
                    <field.Input label="First Name" placeholder="John" />
                  )}
                />
                <form.AppField
                  name="lastName"
                  children={(field) => (
                    <field.Input label="Last Name" placeholder="Doe" />
                  )}
                />
              </div>

              <form.AppField
                name="email"
                validators={{
                  onChange: z.string().email(),
                }}
                children={(field) => (
                  <field.Input
                    type="email"
                    label="Email"
                    placeholder="john@example.com"
                  />
                )}
              />

              <form.AppField
                name="bio"
                children={(field) => (
                  <field.TextArea
                    label="Bio"
                    placeholder="Tell us about yourself"
                  />
                )}
              />

              <form.AppField
                name="role"
                children={(field) => (
                  <field.Select
                    label="Role"
                    placeholder="Select a role"
                    options={[
                      { label: "User", value: "user" },
                      { label: "Admin", value: "admin" },
                      { label: "Developer", value: "dev" },
                    ]}
                  />
                )}
              />

              <div className="flex items-center gap-8">
                <form.AppField
                  name="notifications"
                  children={(field) => (
                    <field.CheckBox label="Enable Notifications" />
                  )}
                />

                <form.AppField
                  name="theme"
                  children={(field) => <field.Switch label="Dark Mode" />}
                />
              </div>

              <div className="pt-4">
                <Button type="submit">Submit Form</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </ContainerSection>
    </div>
  );
}
