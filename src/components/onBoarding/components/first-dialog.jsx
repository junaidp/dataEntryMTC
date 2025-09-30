import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Chip, Divider, Typography } from "@mui/material";

const CATEGORY_WEIGHTS = {
  passions: 3,
  interests: 1,
};

const ResponseDialog = ({ setShowResponseDialog }) => {
  const { ReasoningPairs: { passions = [], interests = [], pairs = [] } } = useSelector((state) => state?.onBoard || {});

  // Create a map of each concept to its category
  const categoryMap = useMemo(() => {
    const map = {};
    passions.forEach((item) => (map[item] = "passions"));
    interests.forEach((item) => (map[item] = "interests"));
    return map;
  }, [passions, interests]);

  // Compute concept weights and breakdowns
  const { weightBreakdown } = useMemo(() => {
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
        return (
          <div key={index} className="mb-3">
            <Typography variant="body1">
              <strong>Concept A:</strong> {pair.ConceptA}
            </Typography>
            <Typography variant="body1">
              <strong>Concept B:</strong> {pair.ConceptB}
            </Typography>
            <Typography variant="body1" className="mt-2">
              <strong>Prompt:</strong> {pair.Prompt}
            </Typography>
            <Typography variant="body1" className="mt-2">
              <strong>AI Answer:</strong> {pair.ChatGPTAnswers}
            </Typography>
            <Divider className="mt-3" />
          </div>
        );
      })}
    </div>
  );
};

export default ResponseDialog;
