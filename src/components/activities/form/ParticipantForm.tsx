import {useState} from "react";
import {Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {Control, Controller, UseFormSetValue} from "react-hook-form";
import {IContact} from "../../../types/models/IContact";
import {useTranslation} from "react-i18next";
import {MenuProps} from "../../../props/MUIElementProps";
import {useQuery} from "@tanstack/react-query";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import InstitutionFilter from "../InstitutionFilter.tsx";

type TProps = {
    control: Control<any>,
    errors: any;
    setValue: UseFormSetValue<any>;
}

const ParticipantForm = (props: TProps) => {
    const {control, setValue, errors} = props;
    const [institutionName, setInstitutionName] = useState<string | null>(null);
    const {t} = useTranslation();

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

    if (!contacts) {
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
        <div>
            <Grid size={12} sx={{mb: 2}}>
                <FormControl sx={{width: "100%"}}>
                    <InstitutionFilter institutionName={institutionName} setInstitutionName={setInstitutionName}/>
                </FormControl>
            </Grid>
            <Grid size={12}>
                <FormControl fullWidth sx={{minWidth: 120}}>
                    <InputLabel id="contactsLabelId">{t('Activity form.Participants')}</InputLabel>
                    <Controller
                        name="contactIds"
                        control={control}
                        rules={{required: "Participants required"}}
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
                <FormHelperText error>{errors?.contacts?.message}</FormHelperText>
            </Grid>
        </div>
    );
}

export default ParticipantForm;