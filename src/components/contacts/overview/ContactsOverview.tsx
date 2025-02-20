import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Container, Paper, TablePagination, useMediaQuery} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useQuery} from "@tanstack/react-query";
import {useTranslation} from "react-i18next";
import {IContact} from "../../../types/models/IContact.ts";
import ContactsOverviewAside from "./ContactsOverviewAside.tsx";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import ContactList from "./ContactList.tsx";

const ContactsOverview = () => {
    const [filteredContacts, setFilteredContacts] = useState<IContact[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const {t} = useTranslation();

    /* pagination configuration */
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    /* pagination configuration */

    const {
        data: contacts,
        status,
    } = useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const res = await fetchContact.get("");
            return res.data;
        },
    });

    useEffect(() => {
        if (status === "success" && contacts) {
            setFilteredContacts(contacts);
            setPage(0);
        }
    }, [contacts, status]);

    const handleJobTitleFilter = (jobTitle: string)=> {
        if (jobTitle === 'Show all') {
            setFilteredContacts(contacts as IContact[]);
        } else {
            const contactsTemp = (contacts && contacts.length > 0)
                ? contacts.filter((contact: IContact) => contact.jobTitle === jobTitle)
                : '';
            setFilteredContacts(contactsTemp as IContact[]);
        }
        setPage(0);
    }

    return (
        <Container sx={{
            flexGrow: 1,
            overflow: 'auto',
            py: 2
        }} maxWidth='lg'>
            <div style={{display: "flex"}}>
                <ContactsOverviewAside setSearchValue={setSearchValue}
                                       handleJobTitleFilter={handleJobTitleFilter}/>
                <div>
                    <div style={{display: "flex", justifyContent: "end", marginBottom: 4}}>
                        <Button variant='contained'
                                startIcon={<AddIcon/>}
                                fullWidth={isMobile}
                                onClick={() => navigate(`/contacts/create`)}>
                            {t('Contacts overview page.New contact')}
                        </Button>
                    </div>
                    <Paper>
                        <ContactList page={page} rowsPerPage={rowsPerPage} filteredContacts={filteredContacts}/>
                    </Paper>
                    <TablePagination
                        component="div"
                        count={(filteredContacts && filteredContacts.length) ?? 0}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </Container>
    );
}

export default ContactsOverview;