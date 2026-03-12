import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@@/components/ui/field";

import { useField, useStore } from "@tanstack/react-form";
import { useFieldContext } from "../hooks";
import FieldErrorMessage from "./shared/FieldErrorMessage";

import type { LabelDescription, ValidateProps, WithClassNames } from "./type";
import { Switch } from "@@/components/ui/switch";
import { cn } from "@@/components/ui/utils";

type FieldSwitchProps = LabelDescription &
  React.ComponentProps<typeof Switch> & {
    validate?: ValidateProps;
  } & WithClassNames<
    "label" | "description" | "switch" | "field" | "validate" | "content"
  >;

export default function FieldSwitch({
  label,
  description,
  classNames,
  className,
  validate,
  ...switchProp
}: FieldSwitchProps) {
  const { form, name } = useFieldContext<string[]>();
  const field = useField({ mode: "array", name, form });
  const errors = useStore(field.store, (state) => state.meta.errors);
  // const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const isInvalid = errors.length > 0;

  return (
    <FieldGroup data-slot="checkbox-group">
      <Field
        data-invalid={isInvalid}
        orientation="horizontal"
        className={cn(`flex gap-1.5`, className, classNames?.field)}
      >
        {(label || description) && (
          <FieldContent className={cn(classNames?.content)}>
            {label && (
              <FieldLabel className={cn(classNames?.label)} htmlFor={field.name}>{label}</FieldLabel>
            )}
            {description && (
              <FieldDescription className={cn(classNames?.description)}>
                {description}
              </FieldDescription>
            )}
            <FieldErrorMessage
              {...validate}
              className={cn(`order-4`, classNames?.validate)}
            />
          </FieldContent>
        )}

        <Switch
          id={field.name}
          type="button"
          name={field.name}
          checked={field.state.value}
          className={cn(``, classNames?.switch)}
          onCheckedChange={field.handleChange}
          aria-invalid={isInvalid}
          {...switchProp}
        />
      </Field>
    </FieldGroup>
  );
}
