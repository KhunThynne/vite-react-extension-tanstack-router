import { useField, useStore } from "@tanstack/react-form";
import { useFieldContext } from "../hooks";

import type { WithClassNames, LabelDescription, ValidateProps } from "./type";

import { Field, FieldGroup, FieldLabel } from "@@/components/ui/field";
import { cn } from "@@/components/ui/utils";
import { Checkbox } from "@@/components/custom/checkbox";
import FieldErrorMessage from "./shared/FieldErrorMessage";

type FieldSelectProps = LabelDescription &
  React.ComponentProps<typeof Checkbox> & {
    validate?: ValidateProps;
  } & WithClassNames<
    "label" | "description" | "selectTriger" | "field" | "validate"
  >;

export default function FieldCheckBox({
  label,
  classNames,
  validate,
  className,
  ...checkbox
}: FieldSelectProps) {
  const { form, name } = useFieldContext<string[]>();
  const field = useField({ mode: "array", name, form });
  const errors = useStore(field.store, (state) => state.meta.errors);
  // const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const isInvalid = errors.length > 0;

  return (
    <FieldGroup data-slot="checkbox-group">
      <Field
        data-invalid={isInvalid}
        className={cn(`flex flex-col gap-1.5`, className, classNames?.field)}
      >
        <span className="flex gap-2">
          <Checkbox {...checkbox} id={field.name} className={cn(`peer cursor-pointer`)} />
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        </span>
      </Field>
      <FieldErrorMessage className={cn(classNames?.validate)} {...validate} />
    </FieldGroup>
  );
}
