import {useState} from "react";
import {
    Autocomplete,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {VALID_EMAIL_REGEXP} from '../../../constants/commonConstants.ts';
import {FormTypesEnum} from "../../../types/enums/ComponentPropsEnums.ts";
import {IInstitution} from "../../../types/models/IInstitution.ts";
import {JobTitlesEnum} from "../../../types/enums/JobTitlesEnum.ts";
import {IContact} from "../../../types/models/IContact.ts";
import {Control, Controller, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {fetchInstitution} from "../../../utils/axios/configs/institutionAxios.ts";

type TContactFormProps = {
    register: UseFormRegister<IContact>;
    errors: any;
    setValue: UseFormSetValue<IContact>;
    control: Control<IContact>;
    currentInstitutions?: IInstitution[];
    type: FormTypesEnum;
    contact: IContact | null;
}

const ContactForm = (props: TContactFormProps) => {
    const {register, setValue, control, type, contact, errors} = props;
    const [title, setTitle] = useState("");
    const jobTitles = Object.keys(JobTitlesEnum);

    const {
        data: institutions,
    } = useQuery({
        queryKey: ["institutions"],
        queryFn: async () => {
            const res = await fetchInstitution.get("");
            return res.data;
        },
    });

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "16px",
        }}>
            <TextField
                id="firstName"
                label="First name"
                fullWidth
                autoComplete="first name"
                {...register("firstName", {
                    required: "First name is required",
                    minLength: {value: 2, message: "Name must be longer than 1 character"}
                })}
            />
            <FormHelperText error>{errors?.firstName?.message}</FormHelperText>
            <TextField
                id="lastName"
                label="Last name"
                fullWidth
                autoComplete="last name"
                {...register("lastName", {
                    required: "Last name is required",
                    minLength: {value: 2, message: "Last name must be longer than 1 character"}
                })}
            />
            <FormHelperText error>{errors?.lastName?.message}</FormHelperText>
            <TextField
                id="email1"
                label="Email 1"
                fullWidth
                autoComplete="email1"
                {...register("email1", {
                    required: "Email 1 is required",
                    pattern: {
                        value: VALID_EMAIL_REGEXP,
                        message: "Email 1 is not a valid email"
                    }
                })}
            />
            <FormHelperText error>{errors?.email1?.message}</FormHelperText>
            <TextField
                id="email2"
                label="Email 2"
                fullWidth
                autoComplete="email2"
                {...register("email2", {
                    pattern: {
                        value: VALID_EMAIL_REGEXP,
                        message: "Email 2 is not a valid email"
                    }
                })}
            />
            <FormHelperText error>{errors?.email2?.message}</FormHelperText>
            <TextField
                id="phone1"
                label="Phone number 1"
                fullWidth
                autoComplete="phone1"
                {...register("phone1", {
                    required: "Phone number 1 is required",
                    minLength: {value: 6, message: "Phone number 1 is too short"}
                })}
            />
            <FormHelperText error>{errors?.phone1?.message}</FormHelperText>
            <TextField
                id="phone2"
                label="Phone number 2"
                fullWidth
                autoComplete="phone2"
                {...register("phone2", {
                    minLength: {value: 6, message: "Phone number 2 is too short"}
                })}
            />
            <FormHelperText error>{errors?.phone2?.message}</FormHelperText>
            <FormControl variant="standard" sx={{minWidth: 120}} fullWidth>
                <InputLabel id="jobTitleLabel" shrink>Job title</InputLabel>
                {type === FormTypesEnum.Create && (
                    <Select
                        id="jobTitle"
                        labelId="jobTitleLabel"
                        value={title}
                        autoComplete="job title"
                        {...register("jobTitle", {required: "Job title is required"})}
                        onChange={(event) => setTitle(event.target.value as string)}
                    >
                        {jobTitles.map((jobTitle: string, index: number) => (
                            <MenuItem key={index + 1} value={jobTitle}>
                                {jobTitle}
                            </MenuItem>
                        ))}
                    </Select>
                )}
                {(type === FormTypesEnum.Edit && contact) && (
                    <Select
                        id="jobTitle"
                        labelId="jobTitleLabel"
                        autoComplete="job title"
                        displayEmpty
                        defaultValue={contact?.jobTitle}
                        {...register("jobTitle", {required: "Job title is required"})}
                        onChange={(event: SelectChangeEvent) => setValue("jobTitle", event.target.value)}
                    >
                        <MenuItem key={0} value={contact?.jobTitle}>
                            <em>{contact?.jobTitle}</em>
                        </MenuItem>
                        {
                            jobTitles.map((jobTitle: string, index: number) => (
                                <MenuItem key={index + 1}
                                          value={jobTitle}>{jobTitle}
                                </MenuItem>
                            ))
                        }
                    </Select>
                )}
                <FormHelperText error>{errors?.jobTitle?.message}</FormHelperText>
            </FormControl>
            {institutions && (
                <Controller
                    name="institutionId"
                    control={control}
                    render={({field: {onChange, value}, fieldState: {error}}) => {
                        const selectedInstitution =
                            institutions.find((i: IInstitution) => i.id === value) || null;

                        return (
                            <Autocomplete
                                disablePortal
                                options={institutions}
                                getOptionLabel={(option) => option.name}
                                sx={{minWidth: 120}}
                                onChange={(_event, newValue) => onChange(newValue ? newValue.id : null)}
                                value={selectedInstitution}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Institution"
                                        error={!!error}
                                        helperText={error ? error.message : ''}
                                    />
                                )}
                            />
                        );
                    }}
                />

            )}
        </div>
    );
}

export default ContactForm;