import { useState } from "react";
import { useSelector } from "react-redux";
import { Chip, Typography, Divider, Button } from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";


const ResponseDialog = ({ setShowResponseDialog }) => {
  const { onBoardingResult } = useSelector((state) => state?.onBoard);
  console.log(onBoardingResult)
  const extractSteps = (reasoningText) => {
    const stepRegex = /STEP \d+:/gi;
    const matches = reasoningText.match(stepRegex);

    if (!matches) return [reasoningText];

    const parts = reasoningText.split(stepRegex).filter(Boolean);
    return parts.map((text) => text.trim());
  };

  // 🌟 Track toggle state per customer index & reasoning index
  const [expanded, setExpanded] = useState({});

  const toggleExpanded = (customerIndex, reasoningIndex) => {
    const key = `${customerIndex}-${reasoningIndex}`;
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <Chip label="AI Response" />
        <button className="btn btn-danger" onClick={() => setShowResponseDialog(false)}>
          Close
        </button>
      </div>

      {onBoardingResult?.map((result, customerIndex) => (
        <div key={customerIndex}>
          <h1 className="heading">Customer: {result.customerName}</h1>

          <h1 className="heading">Concept Weights:</h1>
          <ul>
            {Object.entries(result.breakdown).map(([concept, weightList], i) => {
              const breakdownText = weightList.map((w) => {
                if (w.from === null) {
                  // First one, original source (e.g., passions)
                  return `${w.source} (${w.weight})`;
                } else {
                  return `${w.from} (${w.source}: ${w.weight})`;
                }
              }).join(" + ");

              const total = weightList.reduce((sum, w) => sum + w.weight, 0);

              return (
                <li key={i}>
                  <strong>{concept}:</strong> {breakdownText} = {total}
                </li>
              );
            })}
          </ul>



          <Divider className="my-3" />

          <h1 className="heading">Reasoning:</h1>

          {result.reasoning.map((reason, reasoningIndex) => {
            const steps = extractSteps(reason.gptResponse.Reasoning);
            const key = `${customerIndex}-${reasoningIndex}`;
            const showAll = expanded[key];
            const stepsToShow = showAll ? steps : steps.slice(0, 3);

            return (
              <div key={reasoningIndex} className="mb-3">
                <Typography variant="body1">
                  <strong>Concept A:</strong> {reason.conceptA}
                </Typography>
                <Typography variant="body1">
                  <strong>Concept B:</strong> {reason.conceptB}
                </Typography>
                <Typography variant="body1" className="mt-2">
                  <strong>AI Answer:</strong> {reason.gptResponse.Answer}
                </Typography>

                <Typography variant="body2" className="mt-2">
                  <strong>Reasoning:</strong>
                </Typography>


                <List sx={{ listStyleType: "disc", pl: 2 }} component="ul">
                  {stepsToShow.map((step, i) => (
                    <ListItem key={i} sx={{ display: "list-item", py: 0 }}>
                      <ListItemText primary={step} />
                    </ListItem>
                  ))}
                </List>


                {steps.length > 3 && (
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => toggleExpanded(customerIndex, reasoningIndex)}
                  >
                    {showAll ? "See less" : "See more"}
                  </Button>
                )}

                <Divider className="mt-3" />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ResponseDialog;
