import {Dispatch, SetStateAction, SyntheticEvent, useEffect, useMemo, useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {fetchDataReactQuery} from "../../../utils/HttpRequestUtil";
import {IInstitution} from "../../../types/models/IInstitution";
import {debounce} from "lodash";
import {AutocompleteRenderInputParams, CircularProgress, InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useTranslation} from "react-i18next";
import {useQuery} from "@tanstack/react-query";
import {IContact} from "../../../types/models/IContact";
import ClearIcon from '@mui/icons-material/Clear';
import {IActivity} from "../../../types/models/IActivity.ts";
import {fetchActivity} from "../../../utils/axios/configs/activityAxios.ts";
import {fetchInstitution} from "../../../utils/axios/configs/institutionAxios.ts";

type TProps = {
	setValue: (value: string) => void;
	institution: IInstitution | null;
	setInstitution: Dispatch<SetStateAction<IInstitution | null>>;
	setContacts: Dispatch<SetStateAction<IContact[]>> | null;
}

const InstitutionFilter = (props: TProps) => {
	const {setValue, institution, setInstitution, setContacts} = props;
	const [searchValue, setSearchValue] = useState("");
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<readonly IInstitution[]>([]);
	let loading = open && options.length === 0;
	const {t} = useTranslation();

	const {
		data: institutions,
	} = useQuery<IInstitution[]>({
		queryKey: ["institutions"],
		queryFn: async () => {
			const res = await fetchInstitution.get("");
			return res.data;
		}
	});

	useEffect(() => {
		if (!open) setOptions([]);
	}, [open]);

	// useEffect(() => {
	// 	if (institutions && institutions.length > 0) {
	// 		setOptions([...institutions.map((i: IInstitution) => i)]);
	// 		loading = false;
	// 	}
	// }, [institutions]);

	const handleSearchValueChange = (event: any) => setSearchValue(event.target.value);

	const debouncedSearchValueChangeHandler = useMemo(() => debounce(handleSearchValueChange, 300), []);

	const handleCloseButton = () => {
		setOpen(false);
		if (setContacts) setContacts?.([]);
		if (setValue) setValue?.('contacts', []);
	}

	const memoizedSearchValue = useMemo(() => {
		return props.institution;
	}, [props.institution]);

	return (
		<Autocomplete
			open={open}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			clearIcon={<ClearIcon color='inherit' fontSize='small' onClick={handleCloseButton}/>}
			onChange={(event: SyntheticEvent, value: Value | Value[]) => setInstitution(value)}
			// show needed info from institution objects
			// isOptionEqualToValue={(option, value) => {
			// 	return `${option.name} - ${option.clientId}, ${option.city} ${option.zipCode}`
			// 		=== `${value.name} - ${value.clientId}, ${value.city} ${value.zipCode}`
			// }}
			value={memoizedSearchValue}
			getOptionLabel={(option) => `${option.name} - ${option.clientId}, ${option.city} ${option.zipCode}`}
			options={institutions}
			loading={loading}
			renderInput={(params: AutocompleteRenderInputParams) => (
				<TextField
					{...params}
					size="small"
					placeholder={t('Activities overview page.Search institution')}
					onKeyUp={debouncedSearchValueChangeHandler}
					slotProps={{
						...params.InputProps,
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
						endAdornment: (
							<>
								{loading && <CircularProgress color="inherit" size={20} />}
								{params.InputProps.endAdornment}
							</>
						),
					}}
					label="" // Use an empty label if you don't want one
				/>

			)}
		/>
	);
}

export default InstitutionFilter;
