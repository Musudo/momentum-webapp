import {useForm} from "react-hook-form";
import {Button, Container, Paper, Snackbar, Typography} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {IContact} from "../../../types/models/IContact.ts";
import {FormTypesEnum} from "../../../types/enums/ComponentPropsEnums.ts";
import ContactForm from "./ContactForm.tsx";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import {useState} from "react";
import {useLocation} from "react-router";

const ContactCreate = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
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
                setOpenSnackbar(true);
                setSnackbarMessage("Contact created");
            },
            onError: () => {
                setOpenSnackbar(true);
                setSnackbarMessage("Failed to create a contact");
            },
        }
    );

    const onSubmit = (data: object) => {
        createContactMutation.mutate(data)
    }

    return (
        <Container component="main" maxWidth="sm" sx={{mb: 4}}>
            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                <Typography component="h1" variant="h4" align="center">
                    Create Contact
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ContactForm register={register} errors={errors} control={control}
                                 setValue={setValue} type={FormTypesEnum.Create}
                                 contact={null}/>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 4}}>
                            Save
                        </Button>
                    </div>
                </form>
            </Paper>
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                autoHideDuration={3000}
            />
        </Container>
    );
}

export default ContactCreate;