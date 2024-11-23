import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid/locales';

const theme = createTheme(
  {
    typography: {
      fontFamily: "'Outfit', sans-serif",
    },
  },
  esES
);

// Componente reutilizable
const CustomDataGrid = ({ rows, columns, pageSize = 5, checkboxSelection = false, disableRowSelectionOnClick = false }) => {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
      />
    </Box>
    </ThemeProvider>
  );
};

export default CustomDataGrid;