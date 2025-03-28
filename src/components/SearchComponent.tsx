import {useMemo} from 'react';
import {alpha, InputBase, styled} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {debounce} from "lodash";

type TSearchComponentProps = {
    setSearchValue: (value: string) => void;
    placeholder?: string;
}

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
        theme.palette.mode === 'light'
            ? alpha(theme.palette.common.black, 0.05)
            : alpha(theme.palette.common.white, 0.1),
    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'light'
                ? alpha(theme.palette.common.black, 0.075)
                : alpha(theme.palette.common.white, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const SearchComponent = ({setSearchValue, placeholder = "Search"}: TSearchComponentProps) => {
    // TODO: here and at other places consider replacing lodash debounce to something better and more performant
    const debouncedSearchHandler = useMemo(
        () => debounce((event: any) => setSearchValue(event.target.value), 300),
        [setSearchValue]
    );

    return (
        <Search
            sx={{
                width: {xs: '100vw', sm: '100%'},
            }}>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={placeholder}
                inputProps={{'aria-label': 'search'}}
                onKeyUp={debouncedSearchHandler}
            />
        </Search>
    );
}

export default SearchComponent;