import {useState} from "react";
import {Autocomplete, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import {Control, Controller, UseFormSetValue} from "react-hook-form";
import {IContact} from "../../../types/models/IContact";
import {useTranslation} from "react-i18next";
import {MenuProps} from "../../../props/MUIElementProps";
import {useQuery} from "@tanstack/react-query";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import {IInstitution} from "../../../types/models/IInstitution.ts";
import {fetchInstitution} from "../../../utils/axios/configs/institutionAxios.ts";

type TParticipantFormProps = {
    control: Control<any>,
    register: any,
    setValue: UseFormSetValue<any>;
}

const ParticipantForm = (props: TParticipantFormProps) => {
    const {control, setValue} = props;
    const [institutionName, setInstitutionName] = useState<string | null>(null);
    const {t} = useTranslation();
    const [inputValue, setInputValue] = useState<string>("");

    const {
        data: institutions,
    } = useQuery<IInstitution[]>({
        queryKey: ["institutions"],
        queryFn: async () => {
            const res = await fetchInstitution.get("");
            return res.data;
        }
    });

    const {
        data: contacts,
    } = useQuery<IContact[]>({
        queryKey: ["contacts", institutionName],
        queryFn: async () => {
            if (institutionName) {
                setValue("institutionName", institutionName);
                const res = await fetchContact.get(`/by-institution-name/${institutionName}`);
                return res.data;
            }
            const res = await fetchContact.get("");
            return res.data;
        }
    });

    if (!institutions || !contacts) {
        return <div>Error</div>;
    }

    // selected chips data for multiselect
    let contactIdsObj: any = [];
    if (contacts && contacts.length > 0) {
        contacts?.map((c: IContact) => contactIdsObj[c.id] = c.firstName + " " + c.lastName);
    } else {
        contactIdsObj = [];
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "16px",
        }}>
            <FormControl sx={{minWidth: 120, mb: 2}}>
                <Controller
                    name="institutionName"
                    control={control}
                    rules={{required: "Institution is required"}}
                    render={({field, fieldState}) => (
                        <Autocomplete
                            {...field}
                            onChange={(_event, newValue) => {
                                field.onChange(newValue);
                                setInstitutionName(newValue);
                            }}
                            value={field.value || null}
                            inputValue={inputValue}
                            onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
                            options={institutions.map((institution: IInstitution) => institution.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label="Choose institution *"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                    )}
                />
            </FormControl>
            <FormControl fullWidth sx={{minWidth: 120}}>
                <InputLabel id="contactsLabelId">{t('Activity form.Participants')}</InputLabel>
                <Controller
                    name="contactIds"
                    control={control}
                    render={({field}) => (
                        <Select
                            {...field}
                            labelId="contactsLabelId"
                            id="contactIds"
                            multiple
                            input={<OutlinedInput label={t('Activity form.Participants')}/>}
                            renderValue={(selected) => (
                                <div style={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected.map((value: any) => (
                                        contactIdsObj[value] && <Chip key={value} label={contactIdsObj[value]}/>
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {contacts.length > 0 && contacts.map((contact: IContact) => (
                                <MenuItem
                                    key={contact.id}
                                    value={contact.id}
                                >
                                    {contact.firstName} {contact.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>
        </div>
    );
}

export default ParticipantForm;