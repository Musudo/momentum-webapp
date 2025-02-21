import {useState} from "react";
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {VALID_EMAIL_REGEXP} from '../../../constants/constants';
import {FormTypesEnum} from "../../../types/enums/ComponentPropsEnums.ts";
import {IInstitution} from "../../../types/models/IInstitution.ts";
import {JobTitlesEnum} from "../../../types/enums/JobTitlesEnum.ts";
import {IContact} from "../../../types/models/IContact.ts";
import {Control, Controller, FieldErrors, FieldValues, UseFormRegister, UseFormSetValue} from "react-hook-form";

type TProps = {
    register: UseFormRegister<IContact>;
    errors: FieldErrors<FieldValues>;
    setValue: UseFormSetValue<IContact>;
    control: Control<IContact>;
    institutions: IInstitution[];
    currentInstitutions?: IInstitution[];
    type: FormTypesEnum;
    contact: IContact | null;
}

const ContactForm = (props: TProps) => {
    const {register, setValue, control, institutions, type, contact} = props;
    const [title, setTitle] = useState("");
    const jobTitles = Object.keys(JobTitlesEnum);

    const handleChange = (event: SelectChangeEvent) => setTitle(event.target.value as string);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "16px",
            gap: "16px",
        }}>
            <TextField
                id="firstName2"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                {...register("firstName", {
                    required: "First name is required",
                    minLength: {value: 2, message: "Name must be longer than 1 character"}
                })}
            />
            {/*<FormHelperText error>{errors?.firstName?.message}</FormHelperText>*/}
            <TextField
                id="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                {...register("lastName", {
                    required: "Last name is required",
                    minLength: {value: 2, message: "Last name must be longer than 1 character"}
                })}
            />
            {/*<FormHelperText error>{props?.errors?.lastName?.message}</FormHelperText>*/}
            <TextField
                id="email1"
                label="Email 1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                {...register("email1", {
                    required: "Email 1 is required",
                    pattern: {
                        value: VALID_EMAIL_REGEXP,
                        message: "Email 1 is not a valid email"
                    }
                })}
            />
            {/*<FormHelperText error>{props?.errors?.email1?.message}</FormHelperText>*/}
            <TextField
                id="email2"
                label="Email 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
                {...register("email2", {
                    pattern: {
                        value: VALID_EMAIL_REGEXP,
                        message: "Email 2 is not a valid email"
                    }
                })}
            />
            {/*<FormHelperText error>{props?.errors?.email2?.message}</FormHelperText>*/}
            <TextField
                id="phone1"
                label="Phone number 1"
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
                {...register("phone1", {
                    required: "Phone number 1 is required",
                    minLength: {value: 6, message: "Phone number 1 is too short"}
                })}
            />
            {/*<FormHelperText error>{props?.errors?.phoneNumber1?.message}</FormHelperText>*/}
            <TextField
                id="phone2"
                label="Phone number 2"
                fullWidth
                variant="standard"
                {...register("phone2", {
                    minLength: {value: 6, message: "Phone number 2 is too short"}
                })}
            />
            {/*<FormHelperText error>{props?.errors?.phoneNumber2?.message}</FormHelperText>*/}
            <FormControl variant="standard" sx={{minWidth: 120}} fullWidth>
                <InputLabel id="jobTitleLabel" shrink>Job title</InputLabel>
                {type === FormTypesEnum.Create && (
                    <Select
                        id="jobTitle"
                        labelId="jobTitleLabel"
                        value={title}
                        {...register("jobTitle", {required: "Job title is required"})}
                        onChange={handleChange}
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
                        // InputLabelProps={{shrink: true}}
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
                {/*<FormHelperText error>{props?.errors?.jobTitle?.message}</FormHelperText>*/}
            </FormControl>
            {institutions && (
                <Controller
                    name="institutionId"
                    control={control}
                    render={({field: {onChange, value}, fieldState: {error}}) => {
                        const selectedInstitution =
                            institutions.find((inst) => inst.id === value) || null;

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
                                        variant="standard"
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