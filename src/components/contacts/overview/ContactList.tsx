import {Divider, List, Paper} from "@mui/material";
import {IContact} from "../../../types/models/IContact.ts";
import ContactListItem from "./ContactListItem.tsx";

type TContactListProps = {
    page: number;
    rowsPerPage: number;
    filteredContacts: IContact[] | [];
}

const ContactList = (props: TContactListProps) => {
    const {page, rowsPerPage, filteredContacts} = props;
    return (
        <Paper>
            <List sx={{width: '100%', minWidth: 800, bgcolor: 'background.paper'}}>
                {filteredContacts.length > 0 ? (
                    filteredContacts
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((contact: IContact, index: number) => (
                            <div key={index}>
                                <ContactListItem contact={contact}/>
                                <Divider/>
                            </div>
                        ))
                ) : (
                    <div style={{padding: 10}}>No contacts</div>
                )}
            </List>
        </Paper>
    );
}

export default ContactList;