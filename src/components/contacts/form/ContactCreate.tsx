import {useForm} from "react-hook-form";
import {Button, Snackbar, SnackbarCloseReason, Typography} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {IContact} from "../../../types/models/IContact.ts";
import {FormTypesEnum} from "../../../types/enums/ComponentPropsEnums.ts";
import ContactForm from "./ContactForm.tsx";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import {useState} from "react";
import {useLocation} from "react-router";
import {CardContainer} from "../../cardContainer.tsx";
import * as React from "react";

const ContactCreate = () => {
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: "",
    });
    const location = useLocation();
    const {email, name} = location.state || {};

    const {register, control, handleSubmit, setValue, formState: {errors}} = useForm<IContact>({
        defaultValues: {
            firstName: name ?? "",
            lastName: "",
            email1: email ?? "",
            email2: null,
            phone1: "",
            phone2: null,
            jobTitle: "",
            institutionId: ""
        }
    });

    const createContactMutation = useMutation(
        {
            mutationFn: (data: object) => fetchContact.post("", data),
            onSuccess: () => {
                setSnackbarState({
                    ...snackbarState,
                    open: true,
                    message: "Contact created",
                });

                setTimeout(() => {
                    window.location.href = "/contacts";
                }, 2000);
            },
            onError: () => {
                setSnackbarState({
                    ...snackbarState,
                    open: true,
                    message: "Failed to create a contact",
                });
            },
        }
    );

    const onSubmit = (data: object) => {
        createContactMutation.mutate(data)
    }

    return (
        <CardContainer variant="outlined">
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={snackbarState.open}
                onClose={(
                    _event: React.SyntheticEvent<any> | Event,
                    reason?: SnackbarCloseReason
                ) => {
                    if (reason === "clickaway") {
                        return;
                    }
                    setSnackbarState({...snackbarState, open: false});
                }}
                message={snackbarState.message}
                autoHideDuration={2000}
            />
            <Typography component="h1" variant="h4" align="center">
                Create Contact
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ContactForm register={register}
                             errors={errors}
                             control={control}
                             setValue={setValue}
                             type={FormTypesEnum.Create}
                             contact={null}
                />
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 4}}>
                        Save
                    </Button>
                </div>
            </form>
        </CardContainer>
    );
}

export default ContactCreate;