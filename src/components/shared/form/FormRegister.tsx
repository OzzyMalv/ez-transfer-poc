import React, { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";

interface IFormRegister {
  defaultValues?: FieldValues;
  onSubmit: (data: FieldValues) => void;
}
const FormRegister: React.FC<PropsWithChildren<IFormRegister>> = ({
  defaultValues,
  children,
  onSubmit,
}) => {
  const { handleSubmit, register } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export default FormRegister;
