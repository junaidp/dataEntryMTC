import React from "react";
import { useSelector } from "react-redux";
import {
  Chip,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PairsDialog = ({ setShowResponseDialog }) => {
  const { pairs = [], weights = {}, clusterAnalysis = "" } =
    useSelector((state) => state?.onBoard?.ReasoningPairs) ?? {};

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

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <Chip label="AI Response" />
        <button type="button" className="btn btn-danger" onClick={handleClose}>
          Close
        </button>
      </div>

      {/* Concept weights + labels */}
      <h1 className="heading">Concept Weights:</h1>
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

      {/* SINGLE Cluster Analysis for the whole set */}
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
              <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>
                {clusterAnalysis}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      )}

      <Divider className="my-3" />

      {/* Reasoning pairs */}
      <h1 className="heading">Reasoning:</h1>
      {pairs.map((pair, index) => {
        const key =
          pair?._id ?? `${pair?.from || "A"}->${pair?.to || "B"}-${index}`;
        return (
          <div key={key} className="mb-3">
            <Typography variant="body1">
              <strong>Concept A:</strong> {pair.from}
            </Typography>
            <Typography variant="body1">
              <strong>Concept B:</strong> {pair.to}
            </Typography>
            <Typography variant="body1" className="mt-2">
              <strong>AI Answer:</strong> {pair.answer}
            </Typography>
            <Divider className="mt-3" />
          </div>
        );
      })}
    </div>
  );
};

export default PairsDialog;