import {Dispatch, Fragment, SetStateAction} from 'react';
import {Chip, List, ListItem, Stack} from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {JobTitlesEnum} from "../../../types/enums/JobTitlesEnum.ts";
import ContactSearchBar from "./ContactSearchBar.tsx";

type TProps = {
    setSearchValue: Dispatch<SetStateAction<string>>
    handleJobTitleFilter: (value: string) => void;
}

const ContactsOverviewAside = ({setSearchValue, handleJobTitleFilter}: TProps) => {
    const jobTitles = Object.keys(JobTitlesEnum);
    const {t} = useTranslation();

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '22px'}}>
            <ContactSearchBar setSearchValue={setSearchValue}/>
            <List dense style={{marginLeft: "22px"}}>
                <Fragment key={1}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <LabelIcon/>
                        <Typography variant="body1">{t('Contacts overview page.Job title')}</Typography>
                    </Stack>
                    <>
                        <ListItem sx={{marginLeft: 2}}>
                            <Chip label="All" onClick={() => {
                            }}/>
                        </ListItem>
                        {
                            jobTitles.map((jobTitle: string) => (
                                <ListItem sx={{marginLeft: 2}}>
                                    <Chip label={jobTitle}
                                          onClick={() => handleJobTitleFilter(jobTitle)}/>
                                </ListItem>
                            ))
                        }
                    </>
                </Fragment>
            </List>
        </div>
    );
}

export default ContactsOverviewAside;