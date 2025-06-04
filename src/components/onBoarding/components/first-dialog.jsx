import { useSelector } from "react-redux";
import { Chip, Typography, Paper, Divider } from "@mui/material";

const ResponseDialog = ({ setShowResponseDialog }) => {
  const { onBoardingResult } = useSelector((state) => state?.onBoard);

  const extractSteps = (reasoningText) => {
    const stepRegex = /Step \d+:/g;
    const matches = reasoningText.match(stepRegex);

    if (!matches) return [reasoningText];

    const parts = reasoningText.split(stepRegex).filter(Boolean);
    return parts.map((text, index) => {
      return {
        step: matches[index],
        content: text.trim(),
      };
    });
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <Chip label="AI Response" />
        <button
          className="btn btn-danger"
          onClick={() => setShowResponseDialog(false)}
        >
          Close
        </button>
      </div>

      {onBoardingResult?.map((result, index) => (
        <div>

          <h1 className="heading">
            Customer: {result.customerName}
          </h1>

          <h1 className="heading">
            Concept Weights:
          </h1>
          <ul>
            {Object.entries(result.conceptWeights).map(([concept, weight], i) => (
              <li key={i}>
                <strong>{concept}:</strong> {weight}
              </li>
            ))}
          </ul>

          <Divider className="my-3" />

          <h1 className="heading">
            Reasoning:
          </h1>

          {result.reasoning.map((reason, idx) => (
            <div key={idx} className="mb-3">
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
              <ul className="mt-2">
                {extractSteps(reason.gptResponse.Reasoning).map((step, i) => (
                  <li key={i}>
                    <strong>{step.step}</strong> {step.content}
                  </li>
                ))}
              </ul>
              <Divider className="mt-3" />
            </div>
          ))}
        </div>

      ))}
    </div>
  );
};

export default ResponseDialog;
