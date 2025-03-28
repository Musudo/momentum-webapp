import {FormControl} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type TArchivedActivitiesYearPickerProps = {
    archivedYear: string | null;
    setArchivedYear: (year: string | null) => void;
}

const ArchivedActivitiesYearPicker = ({archivedYear, setArchivedYear}: TArchivedActivitiesYearPickerProps) => {

    return (
        <FormControl>
            {/*TODO: try to replace dayjs by date-fns in the future*/}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={"Select Year"}
                    views={["year"]}
                    openTo="year"
                    defaultValue={dayjs(archivedYear)}
                    minDate={dayjs("2020-01-01 00:00:00")}
                    maxDate={dayjs()}
                    slotProps={{
                        textField: {size: "small"}
                    }}
                    onChange={(value) => {
                        setArchivedYear(value?.year().toString() ?? archivedYear);
                    }}
                />
            </LocalizationProvider>
        </FormControl>
    );
}

export default ArchivedActivitiesYearPicker;