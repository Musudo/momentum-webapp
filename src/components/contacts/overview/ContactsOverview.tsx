import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, TablePagination, useMediaQuery} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from "react-i18next";
import {IContact} from "../../../types/models/IContact.ts";
import ContactsOverviewAside from "./ContactsOverviewAside.tsx";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import ContactList from "./ContactList.tsx";
import {CardContainer} from "../../cardContainer.tsx";
import Grid from "@mui/material/Grid2";
import {useTheme} from "@mui/material/styles";

const ContactsOverview = () => {
    const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
    const [contacts, setContacts] = useState<IContact[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const {t} = useTranslation();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchContacts = async (searchValue: string) => {
        const trimmedValue = searchValue.trim();
        const url = trimmedValue || trimmedValue !== "" ? `/search-contacts/${trimmedValue}` : "";
        const res = await fetchContact.get(url);
        return res.data;
    }

    useEffect(() => {
        fetchContacts(searchValue)
            .then((result: IContact[]) => {
                if (result) {
                    setContacts(result);
                    setFilteredContacts(result);
                    setPage(0);
                }
            })
            .catch(() => {
                return <div>Error</div>;
            })
    }, [searchValue]);

    const handleJobTitleFilter = (jobTitle: string) => {
        if (jobTitle === 'All') {
            setFilteredContacts(contacts);
        } else {
            const contactsTemp = contacts.filter((contact: IContact) => contact.jobTitle === jobTitle);
            setFilteredContacts(contactsTemp);
        }
        setPage(0);
    }

    return (
        <Grid container spacing={6}>
            <ContactsOverviewAside setSearchValue={setSearchValue}
                                   handleJobTitleFilter={handleJobTitleFilter}/>
            <Box>
                <Box sx={{display: "flex", justifyContent: "end", marginBottom: 4}}>
                    <Button variant='contained'
                            startIcon={<AddIcon/>}
                            fullWidth={isMobile}
                            onClick={() => navigate(`/contacts/create`)}>
                        {t('Contacts overview page.New contact')}
                    </Button>
                </Box>
                <CardContainer variant="outlined"
                               customStyles={{
                                   padding: 0,
                                   [theme.breakpoints.up('sm')]: {
                                       width: '700px',
                                   },
                               }}>
                    <ContactList page={page} rowsPerPage={rowsPerPage} filteredContacts={filteredContacts}/>
                </CardContainer>
                <TablePagination
                    component="div"
                    count={(filteredContacts && filteredContacts.length) ?? 0}
                    page={page}
                    onPageChange={(_event, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                />
            </Box>
        </Grid>
    );
}

export default ContactsOverview;