import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Chip,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PairsDialog = ({ setShowResponseDialog }) => {
  const { derivedPreview = [], clusterAnalysis } =
    useSelector((state) => state?.onBoard) ?? {};

  const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [derivedData, setDerivedData] = React.useState(derivedPreview || []);
  const [total, setTotal] = React.useState(derivedPreview?.length || 0);
  const [loading, setLoading] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setShowResponseDialog(false);
  }, [setShowResponseDialog]);

  // Fallback fetch (only runs if no Redux data exists)
  const fetchDerivedData = React.useCallback(async () => {
    if (derivedPreview?.length > 0) return; // ✅ already have data from Redux
    try {
      setLoading(true);
      const res = await axios.get(
        `${backendURL}/api/v1/derived/preview?page=${page + 1}&limit=${rowsPerPage}`
      );
      if (res.data?.ok) {
        setDerivedData(res.data.items || []);
        setTotal(res.data.total || 0);
      }
    } catch (err) {
      console.error("❌ Error fetching derived preview:", err);
    } finally {
      setLoading(false);
    }
  }, [backendURL, page, rowsPerPage, derivedPreview?.length]);

  React.useEffect(() => {
    fetchDerivedData();
  }, [fetchDerivedData]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        maxHeight: "85vh",
        overflowY: "auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Chip label="AI Response" color="primary" />
        <button type="button" className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </div>

      {/* Derived Data Points */}
      <Divider className="my-3" />
      <Accordion
        defaultExpanded
        sx={{
          background: "#f9f9f9",
          boxShadow: "none",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" fontWeight="bold">
            Derived Data Points (Aggregated & Paginated)
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography variant="body2" className="mb-2">
            Showing {derivedData.length} of {total} items ranked by occurrences.
          </Typography>

          <Table size="small" aria-label="derived-aggregates">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
                <TableCell>
                  <strong>Derived Data Point</strong>
                </TableCell>
                <TableCell width={140} align="right">
                  <strong>Occurrences</strong>
                </TableCell>
                <TableCell>
                  <strong>Source Combos</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : derivedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <em>No derived data found.</em>
                  </TableCell>
                </TableRow>
              ) : (
                derivedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Typography variant="body2">
                          {item?.derived || "—"}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2">
                          {Number.isFinite(item?.occurrences)
                            ? item.occurrences
                            : "—"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "4px",
                          }}
                        >
                          {Array.isArray(item.combos) && item.combos.length > 0
                            ? item.combos.map((combo, i) => (
                              <Chip
                                key={i}
                                label={combo.join(" + ")}
                                size="small"
                                color="secondary"
                                variant="outlined"
                              />
                            ))
                            : "—"}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </AccordionDetails>
      </Accordion>

      {/* Cluster Analysis Result */}
      {clusterAnalysis && (
        <>
          <Divider className="my-3" />
          <Accordion
            defaultExpanded
            sx={{
              background: "#f9f9f9",
              boxShadow: "none",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" fontWeight="bold">
                Cluster Analysis (Final Step)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                sx={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}
              >
                {clusterAnalysis}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </div>
  );
};

export default PairsDialog;
