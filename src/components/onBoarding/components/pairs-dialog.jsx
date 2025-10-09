import React from "react";
import { useSelector } from "react-redux";
import { Chip, Divider, Typography } from "@mui/material";

const PairsDialog = ({ setShowResponseDialog }) => {
  // Safe, resilient selector: won't throw if slices are missing
  const { pairs = [], weights = {} } =
    useSelector((state) => state?.onBoard?.ReasoningPairs) ?? {};

  // Avoid recomputing on every render
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

      <h1 className="heading">Concept Weights:</h1>
      <div style={{marginLeft:"25px"}}>
        {weightsArray.map((w) => (
          <div key={w.name} className="mb-4">
            <Typography variant="h5 bold">
              {w.name} ({w.score}) – {w.type}
            </Typography>

            {w.label && (
              <div className="mt-2">
                {/* split by newlines and render as bullet points if line starts with "•" */}
                {w.label.split("\n").map((line, idx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;
                  if (trimmed.startsWith("•")) {
                    return (
                      <li key={idx}>
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


      <Divider className="my-3" />

      <h1 className="heading">Reasoning:</h1>
      {pairs.map((pair, index) => {
        const key = pair?._id ?? `${pair?.from || "A"}->${pair?.to || "B"}-${index}`;
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
