// import React, { useState, useEffect, useRef } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { OverlayPanel } from "primereact/overlaypanel";
// import { Button } from "primereact/button";
// import axios from "axios";

// interface Artwork {
//   id: number;
//   title: string;
//   place_of_origin: string;
//   artist_display: string;
//   inscriptions: string;
//   date_start: number;
//   date_end: number;
// }

// const DataTableComponent: React.FC = () => {
//   const [artworks, setArtworks] = useState<Artwork[]>([]); // Data for current page
//   const [selectedRows, setSelectedRows] = useState<Artwork[]>([]); // Persisted selected rows
//   const [page, setPage] = useState(1);
//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [rowInput, setRowInput] = useState<string>("");
//   const [targetRow, setTargetRow] = useState<number | null>(null); // Row to target
//   const overlayPanelRef = useRef<OverlayPanel>(null);
//   const rowsPerPage = 10; // Number of rows displayed per page

//   // Fetch data when the page changes
//   useEffect(() => {
//     fetchData(page);
//   }, [page]);

//   // Fetch artworks data from the API
//   const fetchData = async (pageNumber: number) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://api.artic.edu/api/v1/artworks?page=${pageNumber}&limit=${rowsPerPage}`
//       );
//       const { data, pagination } = response.data;
//       setArtworks(data);
//       setTotalRecords(pagination.total);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle overlay panel submit
//   const onSubmit = async () => {
//     const rowNumber = parseInt(rowInput, 10); // Convert input to a number
//     if (isNaN(rowNumber) || rowNumber < 1 || rowNumber > totalRecords) {
//       alert("Row number not found. Please enter a valid row number.");
//       return;
//     }

//     // Calculate the page that contains the requested row
//     const calculatedPage = Math.ceil(rowNumber / rowsPerPage);
//     setTargetRow(rowNumber); // Save target row for scrolling
//     if (page !== calculatedPage) {
//       setPage(calculatedPage); // Trigger data fetch for the new page
//     } else {
//       // If on the correct page already, trigger immediate scrolling
//       scrollToRow(rowNumber);
//     }
//   };

//   // Function to scroll to the required row
//   const scrollToRow = (rowNumber: number) => {
//     const rowIndexOnPage = (rowNumber - 1) % rowsPerPage;
//     const row = artworks[rowIndexOnPage];
//     if (row) {
//       setSelectedRows([row]); // Highlight the selected row
//       const rowElement = document.querySelector(`tr[data-rk="${row.id}"]`);
//       if (rowElement) {
//         rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//     }
//   };

//   // Persist selected rows across page changes
//   const onSelectionChange = (e: { value: Artwork[] }) => {
//     setSelectedRows(e.value); // Keep track of selected rows
//   };

//   // Handle page change and scroll to target row if needed
//   useEffect(() => {
//     if (targetRow !== null && artworks.length > 0) {
//       const rowIndexOnPage = (targetRow - 1) % rowsPerPage;
//       const row = artworks[rowIndexOnPage];
//       if (row) {
//         setSelectedRows([row]); // Highlight the selected row
//         const rowElement = document.querySelector(`tr[data-rk="${row.id}"]`);
//         if (rowElement) {
//           rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
//         }
//         setTargetRow(null); // Reset target row after scrolling
//       }
//     }
//   }, [artworks, targetRow]);

//   return (
//     <div className="datatable-container">
//       <DataTable
//         value={artworks}
//         paginator
//         rows={rowsPerPage}
//         totalRecords={totalRecords}
//         lazy
//         first={(page - 1) * rowsPerPage}
//         onPage={(e) => setPage(e.page + 1)} // Update page state
//         selection={selectedRows}
//         selectionMode="checkbox"
//         onSelectionChange={onSelectionChange} // Persist selection
//         dataKey="id"
//         loading={loading}
//       >
//         <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
//         <Column
//           field="title"
//           header={
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <i
//                 className="pi pi-chevron-down"
//                 style={{
//                   marginRight: "0.5rem",
//                   cursor: "pointer",
//                 }}
//                 onClick={(e) => overlayPanelRef.current?.toggle(e)}
//               ></i>
//               Title
//               <OverlayPanel ref={overlayPanelRef}>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                   }}
//                 >
//                   <input
//                     type="text"
//                     placeholder="Enter row number"
//                     value={rowInput}
//                     onChange={(e) => setRowInput(e.target.value)}
//                     style={{
//                       padding: "0.5rem",
//                       borderRadius: "4px",
//                       border: "1px solid #ccc",
//                     }}
//                   />
//                   <Button label="Submit" onClick={onSubmit} />
//                 </div>
//               </OverlayPanel>
//             </div>
//           }
//         />
//         <Column field="place_of_origin" header="Place of Origin" />
//         <Column field="artist_display" header="Artist Display" />
//         <Column field="inscriptions" header="Inscriptions" />
//         <Column field="date_start" header="Start Date" />
//         <Column field="date_end" header="End Date" />
//       </DataTable>
//     </div>
//   );
// };

// export default DataTableComponent;



import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { fetchPageData } from "../services/apiService"; // Ensure proper import

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const DataTableComponent: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());
  const [currentPageSelections, setCurrentPageSelections] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rowInput, setRowInput] = useState<string>("");
  const [targetRow, setTargetRow] = useState<number | null>(null);
  const overlayPanelRef = useRef<OverlayPanel | null>(null);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchData(page); // Fetch data on every page change
  }, [page]);

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    try {
      const { data, pagination } = await fetchPageData(pageNumber, rowsPerPage);
      setArtworks(data);
      setTotalRecords(pagination.total);

      // Maintain selectedRowIds across pages
      const selectedRowsForPage = data.filter((row: Artwork) => selectedRowIds.has(row.id));
      setCurrentPageSelections(selectedRowsForPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectionChange = (selectedRows: Artwork[]) => {
    const updatedSelectedRowIds = new Set(selectedRowIds);

    // Add selected rows to the set
    selectedRows.forEach((row) => updatedSelectedRowIds.add(row.id));

    // Remove deselected rows from the set
    const deselectedRows = artworks.filter((row) => !selectedRows.includes(row));
    deselectedRows.forEach((row) => updatedSelectedRowIds.delete(row.id));

    setSelectedRowIds(updatedSelectedRowIds);
    setCurrentPageSelections(selectedRows); // Update current page selections
  };

  const onSubmit = async () => {
    const rowNumber = parseInt(rowInput, 10);
    if (isNaN(rowNumber) || rowNumber < 1 || rowNumber > totalRecords) {
      alert("Row number not found. Please enter a valid row number.");
      return;
    }

    const calculatedPage = Math.ceil(rowNumber / rowsPerPage);
    setTargetRow(rowNumber); // Set target row

    if (page !== calculatedPage) {
      setPage(calculatedPage); // Navigate to the correct page
    } else {
      scrollToRow(rowNumber); // Scroll to the row on current page
    }
  };

  const scrollToRow = (rowNumber: number) => {
    const rowIndexOnPage = (rowNumber - 1) % rowsPerPage;
    const row = artworks[rowIndexOnPage];

    if (row) {
      setCurrentPageSelections([row]); // Set the row as selected for the current page
      const rowElement = document.querySelector(`tr[data-rk="${row.id}"]`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="datatable-container">
      <DataTable
        value={artworks}
        paginator
        rows={rowsPerPage}
        totalRecords={totalRecords}
        lazy
        first={(page - 1) * rowsPerPage}
        onPage={(e) => setPage((e.page ?? 0) + 1)}
        selection={currentPageSelections}
        selectionMode="checkbox"
        onSelectionChange={(e) => handleSelectionChange(e.value)}
        dataKey="id"
        loading={loading}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
        <Column
          field="title"
          header={
            <div style={{ display: "flex", alignItems: "center" }}>
              <i
                className="pi pi-chevron-down"
                style={{ marginRight: "0.5rem", cursor: "pointer" }}
                onClick={(e) => overlayPanelRef.current?.toggle(e)}
              ></i>
              Title
              <OverlayPanel ref={overlayPanelRef}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <input
                    type="text"
                    placeholder="Enter row number"
                    value={rowInput}
                    onChange={(e) => setRowInput(e.target.value)}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <Button label="Submit" onClick={onSubmit} />
                </div>
              </OverlayPanel>
            </div>
          }
        />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist Display" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
      <div>
        {/* Display the target row for debugging */}
        <h4>Target Row: {targetRow !== null ? targetRow : "Not set"}</h4>
      </div>
    </div>
  );
};

export default DataTableComponent;
