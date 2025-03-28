import {DataGrid, GridRowsProp} from '@mui/x-data-grid';
import {useQuery} from "@tanstack/react-query";
import {fetchStat} from "../../../utils/axios/configs/statAxios.ts";
import {useTheme} from "@mui/material/styles";
import {gray} from "../../../shared-theme/themePrimitives.ts";
import {columns} from "./institutionsData.tsx";

const InstitutionsDataGrid = () => {
    const theme = useTheme();

    const {
        data: institutionsData,
    } = useQuery<GridRowsProp>({
        queryKey: ["institutionsData"],
        queryFn: async () => {
            const res = await fetchStat.get("/institutions-table-data");
            return res.data;
        },
    });

    return (
        <DataGrid
            checkboxSelection
            rows={institutionsData}
            columns={columns}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            initialState={{
                pagination: {paginationModel: {pageSize: 20}},
            }}
            pageSizeOptions={[10, 20, 50]}
            disableColumnResize
            density="compact"
            sx={{
                background: theme.palette.mode === "dark" ? gray[800] : gray[50],
            }}
            slotProps={{
                filterPanel: {
                    filterFormProps: {
                        logicOperatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                        },
                        columnInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: {mt: 'auto'},
                        },
                        operatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: {mt: 'auto'},
                        },
                        valueInputProps: {
                            InputComponentProps: {
                                variant: 'outlined',
                                size: 'small',
                            },
                        },
                    },
                },
            }}
        />
    );
}

export default InstitutionsDataGrid;