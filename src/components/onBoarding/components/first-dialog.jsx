import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Chip, Typography, Divider, Button, List, ListItem, ListItemText } from "@mui/material";

const CATEGORY_WEIGHTS = {
  passions: 3,
  interests: 1,
};

const ResponseDialog = ({ setShowResponseDialog }) => {
  const { ReasoningPairs: { passions = [], interests = [], pairs = [] } } = useSelector((state) => state?.onBoard || {});
  const [expanded, setExpanded] = useState({});

  // Create a map of each concept to its category
  const categoryMap = useMemo(() => {
    const map = {};
    passions.forEach((item) => (map[item] = "passions"));
    interests.forEach((item) => (map[item] = "interests"));
    return map;
  }, [passions, interests]);

  // Compute concept weights and breakdowns
  const { conceptWeights, weightBreakdown } = useMemo(() => {
    const weights = {};
    const breakdown = {};

    // Initial base weights
    [...passions, ...interests].forEach((item) => {
      const category = categoryMap[item];
      const baseWeight = CATEGORY_WEIGHTS[category] || 0;
      weights[item] = baseWeight;
      breakdown[item] = [{ source: category, from: null, weight: baseWeight }];
    });

    // Adjust weights based on pair relationships
    pairs.forEach(({ ConceptA, ConceptB, gptResponse }) => {
      if (gptResponse?.Answer?.toLowerCase() === "yes") {
        const fromCategory = categoryMap[ConceptB];
        const additionalWeight = CATEGORY_WEIGHTS[fromCategory] || 0;

        if (!weights[ConceptA]) {
          weights[ConceptA] = 0;
          breakdown[ConceptA] = [];
        }

        weights[ConceptA] += additionalWeight;
        breakdown[ConceptA].push({
          source: fromCategory,
          from: ConceptB,
          weight: additionalWeight,
        });
      }
    });

    return { conceptWeights: weights, weightBreakdown: breakdown };
  }, [passions, interests, categoryMap, pairs]);

  // Extract reasoning steps from GPT response
  const extractSteps = (reasoningObj) => {
    if (!reasoningObj || typeof reasoningObj !== "object") return [];
    return Object.entries(reasoningObj)
      .filter(([key]) => key.toLowerCase().startsWith("step"))
      .map(([key, value]) => {
        const stringified = typeof value === "string" ? value : JSON.stringify(value, null, 2);
        return `${key}: ${stringified}`;
      });
  };

  const toggleExpanded = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <Chip label="AI Response" />
        <button className="btn btn-danger" onClick={() => setShowResponseDialog(false)}>
          Close
        </button>
      </div>

      <h1 className="heading">Concept Weights:</h1>
      <ul>
        {Object.entries(weightBreakdown).map(([concept, breakdownList], i) => {
          const text = breakdownList
            .map((w) =>
              w.from === null ? `${w.source} (${w.weight})` : `${w.from} (${w.source}: ${w.weight})`
            )
            .join(" + ");
          const total = breakdownList.reduce((sum, w) => sum + w.weight, 0);
          return (
            <li key={i}>
              <strong>{concept}:</strong> {text} = {total}
            </li>
          );
        })}
      </ul>

      <Divider className="my-3" />
      <h1 className="heading">Reasoning:</h1>

      {pairs.map((pair, index) => {
        const steps = Object.entries(pair?.gptResponse?.Reasoning || {})
          .filter(([key]) => key.toLowerCase().startsWith("step"))
          .map(([stepTitle, stepContent]) => ({
            stepTitle,
            content: stepContent,
          }));
        const showAll = expanded[index];
        const stepsToShow = showAll ? steps : steps.slice(0, 3);

        return (
          <div key={index} className="mb-3">
            <Typography variant="body1">
              <strong>Concept A:</strong> {pair.ConceptA}
            </Typography>
            <Typography variant="body1">
              <strong>Concept B:</strong> {pair.ConceptB}
            </Typography>
            <Typography variant="body1" className="mt-2">
              <strong>AI Answer:</strong> {pair.gptResponse?.Answer}
            </Typography>

            <Typography variant="body2" className="mt-2">
              <strong>Reasoning:</strong>
            </Typography>

            <List sx={{ listStyleType: "disc", pl: 2 }} component="ul">
              {stepsToShow.map((step, i) => (
                <div key={i} style={{ paddingBottom: "12px" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {step.stepTitle}
                  </Typography>

                  {typeof step.content === "string" ? (
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line", pl: 2 }}>
                      {step.content}
                    </Typography>
                  ) : (
                    <>
                      {(step.stepTitle === "STEP 3" || step.stepTitle === "STEP 5") ? (
                        <List sx={{ pl: 2 }} component="ul">
                          {Object.entries(step.content).map(([mainKey, subValue], j) => (
                            <ListItem key={j} sx={{ display: "block", pb: 1 }}>
                              <Typography variant="subtitle2"><strong>{mainKey}</strong></Typography>
                              {typeof subValue === "object" ? (
                                <List sx={{ pl: 3 }} component="ul">
                                  {Object.entries(subValue).map(([subKey, subVal], k) => (
                                    <ListItem key={k} sx={{ display: "list-item", py: 0 }}>
                                      <ListItemText
                                        primary={
                                          <span><strong>{subKey}:</strong> {subVal}</span>
                                        }
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              ) : (
                                <Typography variant="body2" sx={{ pl: 2 }}>{subValue}</Typography>
                              )}
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <List sx={{ listStyleType: "disc", pl: 4 }} component="ul">
                          {Object.entries(step.content).map(([key, value], j) => (
                            <ListItem key={j} sx={{ display: "list-item", py: 0 }}>
                              <ListItemText
                                primary={
                                  <span>
                                    <strong>{key}:</strong> {typeof value === "string" ? value : JSON.stringify(value)}
                                  </span>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </>
                  )}

                </div>
              ))}

            </List>

            {steps.length > 3 && (
              <Button variant="text" size="small" onClick={() => toggleExpanded(index)}>
                {showAll ? "See less" : "See more"}
              </Button>
            )}

            <Divider className="mt-3" />
          </div>
        );
      })}
    </div>
  );
};

export default ResponseDialog;
