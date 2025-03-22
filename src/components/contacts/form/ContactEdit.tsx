import {useEffect, useState} from 'react';
import {Button, Snackbar, Typography} from '@mui/material';
import {useForm} from 'react-hook-form';
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from '@tanstack/react-query';
import {IContact} from '../../../types/models/IContact';
import ContactForm from "./ContactForm.tsx";
import {FormTypesEnum} from "../../../types/enums/ComponentPropsEnums.ts";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import {CardContainer} from "../../cardContainer.tsx";

const ContactEdit = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const {id} = useParams();

    const {
        data: contact
    } = useQuery({
        queryKey: ["contact"],
        queryFn: async () => {
            const res = await fetchContact.get(`/${id}`);
            return res.data;
        },
    });

    const {register, handleSubmit, control, setValue, reset, formState: {errors}} = useForm<IContact>({
        defaultValues: {
            firstName: contact?.firstName,
            lastName: contact?.lastName,
            email1: contact?.email1,
            email2: contact?.email2,
            phone1: contact?.phone1,
            phone2: contact?.phone2,
            jobTitle: contact?.jobTitle,
            institution: contact?.institution,
            institutionId: contact?.institutionId,
        }
    });

    useEffect(() => {
        reset(contact);
    }, [contact, reset]);

    const modifyContactMutation = useMutation(
        {
            mutationFn: (data: object) => fetchContact.patch(`/${contact?.id}`, data),
            onSuccess: () => {
                setOpenSnackbar(true);
                setSnackbarMessage("Contact updated");
            },
            onError: () => {
                setOpenSnackbar(true);
                setSnackbarMessage("Failed to update a contact");
            },
        }
    );

    const onSubmit = (data: object) => {
        modifyContactMutation.mutate(data);
    }

    if (!contact) {
        return <div>Error</div>;
    }

    return (
        <CardContainer variant="outlined">
            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                autoHideDuration={2000}
            />
            <Typography component='h1' variant='h4' align='center'>
                Edit Contact
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ContactForm register={register} errors={errors} control={control}
                             setValue={setValue} type={FormTypesEnum.Edit} contact={contact}/>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        type='submit'
                        variant="contained"
                        sx={{mt: 3, ml: 1}}>
                        Save
                    </Button>
                </div>
            </form>
        </CardContainer>
    );
}

export default ContactEdit;