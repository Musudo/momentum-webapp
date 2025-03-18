import {SyntheticEvent, useState} from "react";
import {IInstitution} from "../../types/models/IInstitution.ts";
import {Autocomplete, TextField} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {fetchInstitution} from "../../utils/axios/configs/institutionAxios.ts";

type TInstitutionFilterProps = {
    institutionName: string | null;
    setInstitutionName: (institutionName: string | null) => void;
}

const InstitutionFilter = ({institutionName, setInstitutionName}: TInstitutionFilterProps) => {
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

    if (!institutions) {
        return <div>Error</div>;
    }

    return (
        <Autocomplete
            value={institutionName}
            onChange={(_event: SyntheticEvent, newValue: string | null) => setInstitutionName(newValue)}
            inputValue={inputValue}
            onInputChange={(_event: SyntheticEvent, newInputValue: string) => setInputValue(newInputValue)}
            options={institutions.map((institution: IInstitution) => institution.name)}
            renderInput={(params) => (
                <TextField {...params} size="small" label="Filter by institution"/>
            )}
        />
    );
}

export default InstitutionFilter;