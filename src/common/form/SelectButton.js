import React from "react";
import { Form, Label, Button } from "semantic-ui-react";

const SelectButton = ({ type, meta: { touched, error, color, content } }) => {
  return (
    <Form.Field error={touched && !!error}>
      <Button type={type} color={color} content={content} basic>
        A{" "}
      </Button>
      {touched &&
        error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
    </Form.Field>
  );
};

export default SelectButton;
