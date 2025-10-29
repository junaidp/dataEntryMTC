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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PairsDialog = ({ setShowResponseDialog }) => {
  const { pairs = [], weights = {}, clusterAnalysis = "" } =
    useSelector((state) => state?.onBoard?.ReasoningPairs) ?? {};

  const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [derivedData, setDerivedData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const weightsArray = React.useMemo(
    () =>
      Object.entries(weights).map(([name, data]) => ({
        name,
        score: data?.score,
        type: data?.type,
        label: data?.label || "",
      })),
    [weights]
  );

  const handleClose = React.useCallback(() => {
    setShowResponseDialog(false);
  }, [setShowResponseDialog]);

  // Fetch derived data with pagination
  const fetchDerivedData = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${backendURL}/api/v1/derived/preview?page=${page + 1}&limit=${rowsPerPage}`
      );
      if (res.data?.ok) {
        setDerivedData(res.data.items);
        setTotal(res.data.total);
      }
    } catch (err) {
      console.error("Error fetching derived preview:", err);
    } finally {
      setLoading(false);
    }
  }, [backendURL, page, rowsPerPage]);

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
        backgroundColor: "#fefefe",
        borderRadius: "10px",
        maxHeight: "85vh",
        overflowY: "auto",
      }}
    >
      {/* ─── Header ─────────────────────────────────────────────── */}
      <div className="d-flex justify-content-between mb-4">
        <Chip label="AI Response" color="primary" />
        <button type="button" className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </div>

      {/* ─── Concept Weights ─────────────────────────────────────── */}
      <h1 className="heading mb-3">Concept Weights:</h1>
      <div style={{ marginLeft: "25px" }}>
        {weightsArray.map((w) => (
          <div key={w.name} className="mb-4">
            <Typography variant="h6" fontWeight="bold">
              {w.name} ({w.score}) – {w.type}
            </Typography>

            {w.label && (
              <div className="mt-2">
                {w.label.split("\n").map((line, idx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  if (trimmed.startsWith("•")) {
                    return (
                      <li key={idx} style={{ marginLeft: "20px" }}>
                        {trimmed.replace(/^•\s*/, "")}
                      </li>
                    );
                  }
                  return (
                    <Typography key={idx} variant="body2">
                      {trimmed}
                    </Typography>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ─── Cluster Analysis ────────────────────────────────────── */}
      {!!clusterAnalysis && (
        <>
          <Divider className="my-3" />
          <Accordion
            className="mt-2"
            sx={{
              background: "#f9f9f9",
              boxShadow: "none",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" fontWeight="bold">
                Cluster Analysis
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}
              >
                {clusterAnalysis}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      )}

      {/* ─── Derived Data Points (Paginated + Combos) ────────────── */}
      <Divider className="my-3" />
      <Accordion
        className="mt-2"
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
                    <em>Loading...</em>
                  </TableCell>
                </TableRow>
              ) : derivedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <em>No derived data found.</em>
                  </TableCell>
                </TableRow>
              ) : (
                derivedData.map((item, idx) => (
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
    </div>
  );
};

export default PairsDialog;