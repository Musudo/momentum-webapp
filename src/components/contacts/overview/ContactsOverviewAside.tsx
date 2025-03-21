import {Fragment} from 'react';
import {Chip, List, ListItem, Stack} from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {JobTitlesEnum} from "../../../types/enums/JobTitlesEnum.ts";
import SearchComponent from "../../SearchComponent.tsx";

type TContactsOverviewAsideProps = {
    setSearchValue: (value: string) => void;
    handleJobTitleFilter: (value: string) => void;
}

const ContactsOverviewAside = ({setSearchValue, handleJobTitleFilter}: TContactsOverviewAsideProps) => {
    const jobTitles = Object.keys(JobTitlesEnum);
    const {t} = useTranslation();

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '22px'}}>
            <SearchComponent setSearchValue={setSearchValue}/>
            <List dense style={{marginLeft: "22px"}}>
                <Fragment key={1}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <LabelIcon/>
                        <Typography variant="body1">{t('Contacts overview page.Job title')}</Typography>
                    </Stack>
                    <ListItem sx={{marginLeft: 2}}>
                        <Chip label="All" onClick={() => handleJobTitleFilter("All")}/>
                    </ListItem>
                    {jobTitles.map((jobTitle: string, index: number) => (
                        <ListItem key={index} sx={{marginLeft: 2}}>
                            <Chip label={jobTitle}
                                  onClick={() => handleJobTitleFilter(jobTitle)}/>
                        </ListItem>
                    ))}
                </Fragment>
            </List>
        </div>
    );
}

export default ContactsOverviewAside;