import {useEffect, useState} from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    FormHelperText,
    IconButton,
    InputAdornment,
    Switch,
    TextField,
    Tooltip
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ClearIcon from "@mui/icons-material/Clear";
import {IExternalParticipant} from "../../../types/models/IExternalParticipant.ts";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {UseFormSetValue} from "react-hook-form";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";

type TExternalParticipantFormProps = {
    setValue: UseFormSetValue<any>;
    isWithParticipants: boolean;
    setIsWithParticipants: (isWithParticipants: boolean) => void;
}

const ExternalParticipantForm = ({
                                     setValue,
                                     isWithParticipants,
                                     setIsWithParticipants
                                 }: TExternalParticipantFormProps) => {
    const [externalParticipants, setExternalParticipants] = useState<IExternalParticipant[]>([]);
    const {t} = useTranslation();

    useEffect(() => {
        setIsWithParticipants(externalParticipants.length > 0);
    }, [externalParticipants, setIsWithParticipants]);

    const addExternalParticipant = () => {
        const newExternal: IExternalParticipant = {id: Date.now().toString(), name: '', email: ''};
        setExternalParticipants(prevExternals => [...prevExternals, newExternal]);
    };

    const removeExternalParticipant = (id: string) => {
        setExternalParticipants(prevExternals => prevExternals
            .filter(external => external.id !== id));
    };

    const handleChange = (
        id: string,
        field: keyof Omit<IExternalParticipant, 'id'>,
        value: string
    ) => {
        setExternalParticipants((prevExternals) => {
            const updatedExternals = prevExternals.map((external) =>
                external.id === id ? {...external, [field]: value} : external
            );
            // Remove the 'id' field from each object before updating the form value.
            const updatedWithoutId = updatedExternals.map(({id, ...rest}) => rest);
            setValue("externalParticipants", updatedWithoutId);
            return updatedExternals;
        });
    };

    return (
        <>
            {externalParticipants.map(external => (
                <Grid key={external.id}>
                    <Card sx={{position: 'relative', mt: 4, borderRadius: 4}}>
                        <CardHeader
                            action={
                                <IconButton
                                    onClick={() => removeExternalParticipant(external.id)}
                                >
                                    <ClearIcon/>
                                </IconButton>
                            }
                            subheader="Add external participant"
                        />
                        <CardContent>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Name"
                                value={external.name}
                                onChange={(e) =>
                                    handleChange(external.id, 'name', e.target.value)
                                }
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon/>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                value={external.email}
                                onChange={(e) =>
                                    handleChange(external.id, 'email', e.target.value)
                                }
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AlternateEmailIcon/>
                                            </InputAdornment>
                                        )
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            <Tooltip title="Add External Participant" sx={{mt: 2}}>
                <IconButton
                    color="primary"
                    onClick={() => addExternalParticipant()}
                >
                    <AddIcon/>
                </IconButton>
            </Tooltip>

            {isWithParticipants && (
                <Box>
                    <Switch
                        onChange={(e) => {
                            const isChecked = e.target.checked;
                            if (isChecked) {
                                setValue(
                                    "emailSentAt",
                                    dayjs().format("YYYY-MM-DD[T]HH:mm:ss")
                                );
                            } else {
                                // Clear the value when unchecked
                                setValue("emailSentAt", "");
                            }
                        }}
                    />
                    <FormHelperText>
                        {t("Activity form.Switch to send email")}
                    </FormHelperText>
                </Box>
            )}
        </>
    );
}

export default ExternalParticipantForm;