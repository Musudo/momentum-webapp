import {useForm} from "react-hook-form";
import {Button, Container, Paper, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import {IContact} from "../../../types/models/IContact.ts";
import {FormTypesEnum} from "../../../types/enums/ComponentPropsEnums.ts";
import ContactForm from "./ContactForm.tsx";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import {fetchInstitution} from "../../../utils/axios/configs/institutionAxios.ts";

const ContactCreate = () => {
    const {external} = useParams();

    const {register, control, handleSubmit, setValue, formState: {errors}} = useForm<IContact>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email1: external ?? "",
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
            onSuccess: () => console.log("Success"),
            onError: error => console.log(error),
        }
    );

    const onSubmit = (data: object) => {
        // console.log('Form data:', data);
        createContactMutation.mutate(data)
    }

    const {
        data: institutions,
        error,
        status,
    } = useQuery({
        queryKey: ["institutions"],
        queryFn: async () => {
            const res = await fetchInstitution.get("");
            return res.data;
        },
    });
    console.log("-->", institutions)

    return (
        <Container component="main" maxWidth="sm" sx={{mb: 4}}>
            <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                <Typography component="h1" variant="h4" align="center">
                    Create Contact
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ContactForm register={register} errors={errors} control={control}
                                 setValue={setValue} institutions={institutions} type={FormTypesEnum.Create}
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
        </Container>
    );
}

export default ContactCreate;