import {useState} from "react";
import {Controller, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import dayjs from "dayjs";
import {ActivityTypesEnum} from "../../../types/enums/ActivityTypesEnum";
import {ITag} from "../../../types/models/ITag";
import {IActivity} from "../../../types/models/IActivity";
import {useTranslation} from "react-i18next";
import {MenuProps} from "../../../props/MUIElementProps";
import {FormTypesEnum} from "../../../types/enums/ComponentPropsEnums";
import {useQuery} from "@tanstack/react-query";
import {fetchTag} from "../../../utils/axios/configs/tagAxios.ts";
import {DateTimePicker} from "@mui/x-date-pickers";

type TActivityFormProps = {
    register: UseFormRegister<IActivity>;
    controller: any;
    errors: any;
    activity: IActivity | null;
    setValue: UseFormSetValue<any>;
    formType?: FormTypesEnum;

}

const ActivityForm = (props: TActivityFormProps) => {
    const {register, controller, errors, activity, setValue, formType = FormTypesEnum.Create} = props;
    const activityTypes = Object.keys(ActivityTypesEnum);
    const [endTimeValue, setEndTimeValue] = useState(activity ? dayjs(activity?.endTime) : dayjs());
    const {t, /*i18n*/} = useTranslation();
    // const [locale, setLocale] = useState<string>("en-gb");

    // change datetime locale when language is changed
    // useEffect(() => {
    //     setLocale(getLocale(i18n.language));
    // }, [i18n.language]);

    const {
        data: tags,
        error,
    } = useQuery<ITag[]>({
        queryKey: ["tags"],
        queryFn: async () => {
            const res = await fetchTag.get("");
            return res.data;
        }
    });

    if (!tags || error) {
        return <div>Error</div>;
    }

    // Array of tags for select
    const tagIdsObj: any = [];
    tags?.map((t: ITag) => tagIdsObj[t.id] = t.name);

    // Array to hold the IDs for defaultValue
    const preselectedTagIds: string[] = activity?.tags ? activity.tags.map((t: ITag) => t.id) : [];

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "16px",
        }}>
            <FormControl variant="standard" fullWidth sx={{minWidth: 120, mb: 2}}>
                <InputLabel id="typeLabel">{t('Activity form.Type')}</InputLabel>
                <Controller
                    name="type"
                    control={controller}
                    render={({field}) => (
                        <Select
                            {...field}
                            labelId="typeLabel"
                        >
                            {
                                activityTypes.map((at: string) => (
                                    <MenuItem key={at} value={at}>
                                        {at}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    )}
                />
            </FormControl>
            <TextField
                label={t('Activity form.Subject')}
                fullWidth
                {...register("subject", {
                    required: "Subject is required",
                    maxLength: {value: 50, message: "Subject may not be longer than 50 characters"}
                })}
            />
            <FormHelperText error>{errors?.subject?.message}</FormHelperText>
            <FormControl variant="standard" fullWidth sx={{minWidth: 120}}>
                <DateTimePicker
                    label={t('Activity form.Start time')}
                    minDateTime={dayjs()}
                    format="DD/MM/YYYY HH:mm"
                    minutesStep={5}
                    defaultValue={activity ? dayjs(activity?.startTime) : dayjs()}
                    reduceAnimations={true}
                    onChange={(value) => {
                        setValue("startTime", dayjs(value).format('YYYY-MM-DD[T]HH:mm:ss'));
                        setValue("endTime", dayjs(value).add(60, 'minutes').format('YYYY-MM-DD[T]HH:mm:ss'));
                        setEndTimeValue(dayjs(value).add(60, 'minutes'));
                    }}
                />
            </FormControl>
            <FormHelperText error>{errors?.startTime?.message}</FormHelperText>
            <FormControl variant="standard" fullWidth sx={{minWidth: 120}}>
                <DateTimePicker
                    label={t('Activity form.End time')}
                    minDateTime={endTimeValue}
                    format="DD/MM/YYYY HH:mm"
                    minutesStep={5}
                    defaultValue={activity ? dayjs(activity?.endTime) : dayjs().add(60, 'minutes')}
                    value={endTimeValue}
                    reduceAnimations={true}
                    onChange={(value) => {
                        setValue("endTime", dayjs(value).format('YYYY-MM-DD[T]HH:mm:ss'));
                    }}
                />
            </FormControl>
            <FormHelperText error>{errors?.endTime?.message}</FormHelperText>
            <FormControl fullWidth sx={{minWidth: 120}}>
                <InputLabel id="tagLabelId">{t('Activity form.Tags')}</InputLabel>
                {formType === FormTypesEnum.Create ? (
                    <Controller
                        name="tagIds"
                        control={controller}
                        rules={{required: "Tag is required"}}
                        render={({field}) => (
                            <Select
                                {...field}
                                multiple
                                id="tagSelect"
                                labelId="tagLabelId"
                                input={<OutlinedInput label={t('Activity form.Tags')}/>}
                                renderValue={(selected) => (
                                    <div style={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                        {selected.map((value: any) => (
                                            tagIdsObj[value] && <Chip color="success"
                                                                      key={value}
                                                                      label={tagIdsObj[value].toLowerCase()}/>
                                        ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                            >
                                {tags.map((tag: ITag) => (
                                    <MenuItem
                                        key={tag.id}
                                        value={tag.id}
                                    >
                                        {tag.name.toLowerCase()}
                                    </MenuItem>
                                ))}
                            </Select>

                        )}
                    />
                ) : (
                    <Select
                        multiple
                        id="tagSelect"
                        labelId="tagLabelId"
                        defaultValue={preselectedTagIds}
                        input={<OutlinedInput label={t('Activity form.Tags')}/>}
                        renderValue={(selected) => (
                            <div style={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value: any) => (
                                    tagIdsObj[value] && <Chip color="success"
                                                              key={value}
                                                              label={tagIdsObj[value].toLowerCase()}/>
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                        onChange={(element: SelectChangeEvent<string[]>) => setValue('tagIds', element.target.value)}
                    >
                        {tags.map((tag: ITag) => (
                            <MenuItem
                                key={tag.id}
                                value={tag.id}
                            >
                                {tag.name}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </FormControl>
            <FormHelperText error>{errors?.tagIds?.message}</FormHelperText>
            <TextField
                label={t('Activity form.External note')}
                slotProps={{formHelperText: {style: {color: "#f57c00"}}}}
                helperText={t('Activity form.Client will be able to see this note')}
                variant="filled"
                color="warning"
                fullWidth
                multiline
                rows={3}
                focused
                {...register("externalNote")}
            />
            <TextField
                label={t('Activity form.Internal note')}
                variant="filled"
                fullWidth
                multiline
                rows={3}
                focused
                {...register("internalNote")}
            />
        </div>
    );
}

export default ActivityForm;