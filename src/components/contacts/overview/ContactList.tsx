import {Divider, List} from "@mui/material";
import {Fragment} from "react";
import {IContact} from "../../../types/models/IContact.ts";
import ContactListItem from "./ContactListItem.tsx";

type TProps = {
    page: number;
    rowsPerPage: number;
    filteredContacts: IContact[] | [];
}

const ContactList = (props: TProps) => {
    const {page, rowsPerPage, filteredContacts} = props;
    return (
        <List sx={{width: '100%', minWidth: 800, bgcolor: 'background.paper'}}>
            {(filteredContacts && filteredContacts.length > 0) && (
                filteredContacts
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((contact: IContact, index: number) => (
                        <Fragment key={index}>
                            <ContactListItem contact={contact}/>
                            <Divider variant="inset" component="li"/>
                        </Fragment>
                    ))
            )}
        </List>
    );
}

export default ContactList;