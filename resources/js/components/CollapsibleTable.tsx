import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';

// Definición de tipos
export interface Column {
    id: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
}

export interface RowData {
    [key: string]: any;
    expandableContent?: React.ReactNode;
    nestedData?: any[];
}

interface CollapsibleTableProps {
    columns: Column[];
    rows: RowData[];
    expandableRenderer?: (rowData: RowData) => React.ReactNode;
    nestedColumns?: Column[];
    theme?: 'light' | 'dark';
    striped?: boolean;
    hover?: boolean;
}

// Tema moderno
const modernTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    borderCollapse: 'separate',
                    borderSpacing: '0 8px',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-root': {
                        backgroundColor: '#1976d2',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        border: 'none',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    border: 'none',
                    padding: '16px',
                    fontSize: '14px',
                },
                head: {
                    borderRadius: '8px',
                },
            },
        },
    },
});

// Fila estilizada
const StyledTableRow = styled(TableRow)<{ striped?: boolean; hover?: boolean }>(
    ({ theme, striped, hover }) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: '8px',
        '&:nth-of-type(odd)': {
            backgroundColor: striped
                ? theme.palette.action.hover
                : theme.palette.background.paper,
        },
        '&:hover': {
            backgroundColor: hover ? theme.palette.action.selected : 'inherit',
            transform: hover ? 'translateY(-2px)' : 'none',
            transition: hover ? 'all 0.2s ease' : 'none',
        },
    }),
);

// Componente de fila colapsible
function CollapsibleRow({
    row,
    columns,
    expandableRenderer,
    nestedColumns,
    striped,
    hover,
}: {
    row: RowData;
    columns: Column[];
    expandableRenderer?: (rowData: RowData) => React.ReactNode;
    nestedColumns?: Column[];
    striped?: boolean;
    hover?: boolean;
}) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <StyledTableRow striped={striped} hover={hover}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align || 'left'}
                        sx={{ width: column.width }}
                    >
                        {row[column.id]}
                    </TableCell>
                ))}
            </StyledTableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={columns.length + 1}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box
                            sx={{
                                margin: 1,
                                padding: 2,
                                backgroundColor: 'grey.50',
                                borderRadius: '8px',
                            }}
                        >
                            {expandableRenderer ? (
                                expandableRenderer(row)
                            ) : row.expandableContent ? (
                                row.expandableContent
                            ) : row.nestedData && nestedColumns ? (
                                <>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        component="div"
                                        color="primary"
                                    >
                                        Detalles
                                    </Typography>
                                    <Table
                                        size="small"
                                        aria-label="nested-data"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                {nestedColumns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        sx={{
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.nestedData.map(
                                                (nestedRow, index) => (
                                                    <TableRow key={index}>
                                                        {nestedColumns.map(
                                                            (column) => (
                                                                <TableCell
                                                                    key={
                                                                        column.id
                                                                    }
                                                                    align={
                                                                        column.align
                                                                    }
                                                                >
                                                                    {
                                                                        nestedRow[
                                                                            column
                                                                                .id
                                                                        ]
                                                                    }
                                                                </TableCell>
                                                            ),
                                                        )}
                                                    </TableRow>
                                                ),
                                            )}
                                        </TableBody>
                                    </Table>
                                </>
                            ) : null}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// Componente principal
export default function CollapsibleTable({
    columns,
    rows,
    expandableRenderer,
    nestedColumns,
    theme = 'light',
    striped = true,
    hover = true,
}: CollapsibleTableProps) {
    const selectedTheme =
        theme === 'dark'
            ? createTheme({ palette: { mode: 'dark' } })
            : modernTheme;

    return (
        <ThemeProvider theme={selectedTheme}>
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: '12px',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'grey.100',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'grey.400',
                        borderRadius: '4px',
                    },
                }}
            >
                <Table aria-label="collapsible table" sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '60px' }} />
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{
                                        width: column.width,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <CollapsibleRow
                                key={index}
                                row={row}
                                columns={columns}
                                expandableRenderer={expandableRenderer}
                                nestedColumns={nestedColumns}
                                striped={striped}
                                hover={hover}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}
