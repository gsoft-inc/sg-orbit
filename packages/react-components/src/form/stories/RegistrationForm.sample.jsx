import { Actions, Form } from "@react-components/form";
import { Button } from "@react-components/button";
import { Checkbox } from "@react-components/checkbox";
import { ErrorMessage, Field, Label } from "@react-components/field";
import { TextInput } from "@react-components/input";
import { TextLink } from "@react-components/link";
import { useFormik } from "formik";

export function RegistrationForm() {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            userName: "",
            agreeTerms: false
        },
        validate: values => {
            return Object.keys(values).reduce((acc, x) => {
                if (!values[x]) {
                    acc[x] = `${x} is required.`;
                }

                return acc;
            }, {});
        },
        onSubmit: (values, actions) => {
            setTimeout(() => {
                console.log(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
                actions.resetForm();
            }, 10000);
        }
    });

    const getValidationState = fieldId => {
        return formik.touched[fieldId]
            ? formik.errors[fieldId] ? "invalid" : "valid"
            : null;
    };

    return (
        <Form onSubmit={formik.handleSubmit}>
            <Field
                id="firstName"
                validationState={getValidationState("firstName")}
            >
                <Label required>First name</Label>
                <TextInput
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
            </Field>
            <Field
                id="lastName"
                validationState={getValidationState("lastName")}
            >
                <Label required>Last name</Label>
                <TextInput
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                />
                <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
            </Field>
            <Field
                id="userName"
                validationState={getValidationState("userName")}
            >
                <Label required>Username</Label>
                <TextInput
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                />
                <ErrorMessage>{formik.errors.userName}</ErrorMessage>
            </Field>
            <Field
                id="agreeTerms"
                validationState={getValidationState("agreeTerms")}
            >
                <Checkbox
                    onChange={formik.handleChange}
                    checked={formik.values.agreeTerms}
                >
                    Agree to terms and conditions
                </Checkbox>
            </Field>
            <Actions align="end">
                <TextLink
                    as="button"
                    onClick={formik.resetForm}
                >
                    Reset
                </TextLink>
                <Button
                    loading={formik.isSubmitting}
                    type="submit"
                >
                    Submit
                </Button>
            </Actions>
        </Form>
    );
}
