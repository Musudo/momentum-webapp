import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Container, TablePagination, useMediaQuery} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useTranslation} from "react-i18next";
import {IContact} from "../../../types/models/IContact.ts";
import ContactsOverviewAside from "./ContactsOverviewAside.tsx";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import ContactList from "./ContactList.tsx";

const ContactsOverview = () => {
    const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
    const [contacts, setContacts] = useState<IContact[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 600px)');
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
        <Container sx={{
            display: 'flex',
            flexGrow: 1,
            overflow: 'auto',
            py: 2,
            gap: 6
        }} maxWidth='lg'>
            <ContactsOverviewAside setSearchValue={setSearchValue}
                                   handleJobTitleFilter={handleJobTitleFilter}/>
            <div>
                <div style={{display: "flex", justifyContent: "end", marginBottom: 16}}>
                    <Button variant='contained'
                            startIcon={<AddIcon/>}
                            fullWidth={isMobile}
                            onClick={() => navigate(`/contacts/create`)}>
                        {t('Contacts overview page.New contact')}
                    </Button>
                </div>
                <ContactList page={page} rowsPerPage={rowsPerPage} filteredContacts={filteredContacts}/>
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
            </div>
        </Container>
    );
}

export default ContactsOverview;