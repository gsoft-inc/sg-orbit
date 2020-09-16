import { Button, ButtonGroup } from "@react-components/button";
import { Checkbox } from "@react-components/checkbox";
import { ErrorMessage, Field, Label } from "@react-components/field";
import { Form } from "@react-components/form";
import { TextInput } from "@react-components/input";
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
            }, 1000);
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
            <ButtonGroup className="self-justify-center">
                <Button
                    variant="link"
                    onClick={formik.resetForm}
                >
                    Reset
                </Button>
                <Button
                    loading={formik.isSubmitting}
                    type="submit"
                >
                    Submit
                </Button>
            </ButtonGroup>
        </Form>
    );
}
