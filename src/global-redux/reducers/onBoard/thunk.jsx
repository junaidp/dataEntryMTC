import axios from "axios"
// export const onBoardingCall = async (data, thunkAPI) => {
//   try {
//     const res = await fetch("/file.csv");
//     const text = await res.text();

//     const parseCSV = (text) => {
//       return new Promise((resolve) => {
//         Papa.parse(text, {
//           complete: (result) => resolve(result.data),
//           header: true,
//         });
//       });
//     };

//     const csvData = await parseCSV(text);

//     const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
//     const prompt = `You are an AI data analyst. Your task is to analyze the provided customers' personal information and CSV data, then return a structured JSON response.

// ### **INPUT DATA**
// 1️⃣ **CSV Data:** ${JSON.stringify(csvData)}
// 2️⃣ **Customers Personal Info:** ${JSON.stringify(data?.customers)}

// ### **TASK**
// - Extract **'data point used'** column values relevant to each customer.
// - Analyze the **'Reasoning'** and **'Refinement Considerations'** columns.
// - Answer the questions from the **'Goals'** column.
// - Generate insights about **date of birth, place of birth, gender, email, phone number, city of residence, and combined identity**.
// - **DO NOT** return explanations, only structured JSON.

// ### **STRICT JSON FORMAT**
// Strictly return the response in this exact JSON structure:
// [
//   {
//     "name": "<string>",
//     "dateOfBirth": {
//       "exactAge": <number>,
//       "timeBeforeNextBirthday": "<string> days",
//       "lifeMilestones": "<string>",
//       "culturalTouchstones": "<string>",
//       "legalAdultStatus": "<string>",
//       "ageRestrictions": "<string>"
//     },
//     "placeOfBirth": {
//       "countryOfBirth": "<string>",
//       "likelyLanguages": ["<string>", "<string>"]
//     },
//     "gender": {
//       "likelyPronouns": "<string>"
//     },
//     "email": {
//       "placeOfWork": "<string>",
//       "digitalFamiliarity": "<string>"
//     },
//     "phoneNumber": {
//       "countryLinked": "<string>",
//       "internationalConnections": "<string>"
//     },
//     "cityOfResidence": {
//       "countryOfResidence": "<string>",
//       "likelyLanguages": ["<string>", "<string>"],
//       "presentDayEnvironment": "<string>",
//       "lifeStyle": "<string>"
//     },
//     "combined": {
//       "emailAndFullName": "<string>",
//       "emailAndAge": "<string>",
//       "rootedness": "<string>",
//       "culturalRoots": "<string>",
//       "livingStyle": "<string>",
//       "demographicPreferences": "<string>",
//       "lifeNarrative": "<string>",
//       "selfExpression": "<string>",
//       "culturalConnections": "<string>",
//       "careerStatus": "<string>"
//     }
//   }
// ]

// ### **RULES**
// - **DO NOT** add extra explanations.
// - **DO NOT** include additional text outside the JSON object.
// - **Ensure valid JSON format** (no missing commas, quotes, or brackets).`;

//     const openAIResponse = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return openAIResponse.data.choices[0].message.content;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// };

// New One
export const onBoardingCall = async ({ data: allCustomers, signal }, thunkAPI) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const systemPrompt = `Objective: Decide whether there is a relationship between Concept A and Concept B when
concept A is dependent on concept B.
STEP 1. Clarify Definitions and Ontologies
Human Equivalent: Conscious access to stable concepts
Instruction:
Define Concept A and Concept B as precisely and objectively as possible, without using
examples or interpretations. Then determine whether their definitions share any terms,
structures, or referential dependencies.
✅ Purpose: Prevent vague overlaps. Blocks misalignment from the start.
STEP 2. Understanding Dependencies
Human Equivalent: Understanding concepts using a specific one-way direction
Instruction:
Clearly understand the relationship of dependence or necessity between Concept A and
Concept B as a one-way dependency. This means the existence, nature, or functioning of
Concept A is dependent on Concept B. If Concept B does not exist, is absent, or is not
functioning correctly, then Concept A cannot exist, is absent, or will not function correctly.
You must understand this one-way direction of the dependency instead of using the most
community relationship based on your known patterns.
✅ Purpose: Establish a clear relationship of dependence between concepts to obtain the right
analysis.

STEP 3. Generate All Possible Relationship Types (Taxonomy)
Human Equivalent: Unconscious mental branching of relationship categories
Instruction:
List all relationship types that could theoretically exist between any two concepts (e.g. causal,
semantic, functional, structural, formal, epistemic, ontological, procedural, symbolic,
metaphorical, historical, etc.). For each, define it.
✅ Purpose: Simulates the subconscious tree-generation humans do automatically.

STEP 4. Map Each Relationship Type to the Current Pair
Human Equivalent: Intuition cross-matching categories
Instruction:
For each relationship type, assess whether it is plausibly present, plausibly absent, or
undecidable between Concept A and Concept B. Do not justify. Only label.
✅ Purpose: Simulates initial wide filtering. Prevents early commitment.
STEP 5. Justify All “Plausibly Present” Relationships
Individually
Human Equivalent: Rational synthesis and filtering
Instruction:
For each relationship marked “plausibly present”, write one short justification for why it could
exist. Then write one counterpoint that challenges its validity. Do this evenly for each case.
✅ Purpose: Enforces dual-perspective evaluation. Blocks post-hoc rationalisation.
STEP 6. Introduce Experiential Simulation
Human Equivalent: Memory and personal knowledge
Instruction:
Simulate the thought process of someone with deep experience in each domain (A and B). How
would a person trained for 20 years in each field see the connection? What lived experiences
would shape their answer?

✅ Purpose: Fakes experience/memory by prompting domain emulation. Forces perspective-
shifting.

STEP 7. Cultural and Emotional Modelling
Human Equivalent: Cultural priors, emotion-laden memory
Instruction:
Consider how different cultures or emotional frameworks might shape the perception of the
relationship between A and B. Would this change the answer in some contexts?
✅ Purpose: Mimics the emotional-intuitive filters humans use unconsciously.
STEP 8. Contradiction Search
Human Equivalent: Subconscious error-check
Instruction:
Search for any internal contradictions, category errors, or conflated meanings in the prior steps.
List each one you can find. If none are found, state why that is justifiable.
✅ Purpose: Introduces internal challenge that LLMs do not perform by default.
STEP 9. Re-synthesis and Final Evaluation
Human Equivalent: Tree-to-root summary
Instruction:
Given all prior steps, summarise the strongest argument for, the strongest argument against,
and state the final judgment: Is there a relationship between Concept A and Concept B? Answer
only "yes" or "no", followed by one sentence of rationale grounded in the steps above.
✅ Purpose: Forces a judgment that is a true synthesis, not an early convergence.

KEY IMPLEMENTATION RULES • Hard sequence enforcement: The model must not skip or reorder steps
• Zero output until all prior steps complete
• Strictly enforce the one-way dependency from Concept A to Concept B
• No output justification allowed after the final decision—it must be contained in the rationale
sentence
• Must acknowledge all contradictions uncovered
• Must simulate reasoning as steps, not text—no narrative blending
. Return your final answer strictly in the following valid JSON format (with double quotes around all keys and string values):

{
  "Answer": "yes" or "no",
  "Reasoning": "Step-by-step explanation from Steps 1 to 9, as described above"
}

Do not include any extra text, commentary, or markdown formatting before or after the JSON object.
Only return the JSON object exactly as shown above.
`;

  const categories = ['passions', 'lifestyle', 'mainInterests'];
  const CATEGORY_WEIGHTS = {
    passions: 3,
    lifestyle: 0.5,
    mainInterests: 1,
  };

  try {
    const finalResults = [];

    for (const customer of allCustomers) {
      const conceptWeights = {};
      const weightBreakdown = {}; // <-- NEW: to track detailed contribution
      const reasoningPairs = [];

      // Initialize weights and breakdown for each base category
      for (const category of categories) {
        for (const item of customer[category]) {
          if (!conceptWeights[item]) {
            conceptWeights[item] = CATEGORY_WEIGHTS[category];
            weightBreakdown[item] = [{ source: category, from: null, weight: CATEGORY_WEIGHTS[category] }];
          }
        }
      }

      // Check for relationships and apply weighted adjustments
      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          if (i === j) continue;

          const fromCategory = categories[i];
          const toCategory = categories[j];

          for (const conceptA of customer[fromCategory]) {
            for (const conceptB of customer[toCategory]) {
              const checkUrl = `${backendURL}/api/v1/relationship?conceptA=${encodeURIComponent(conceptA)}&conceptB=${encodeURIComponent(conceptB)}`;

              // Try to get from database first
              let gptResponse;

              try {
                const dbResponse = await axios.get(checkUrl, { signal });

                if (dbResponse.data?.gptResponse) {
                  gptResponse = dbResponse.data.gptResponse;
                }
              } catch (err) {
                if (err.response?.status !== 404) {
                  console.error(`DB check failed for ${conceptA} -> ${conceptB}`, err);
                }
              }

              // If not found in DB, call OpenAI
              if (!gptResponse) {
                const userMessage = `Concept A = ${conceptA} Concept B = ${conceptB} : Decide whether there is a relationship between ${conceptA} (A) and ${conceptB} (B), when ${conceptA} is dependent on ${conceptB}.`;

                const aiResponse = await axios.post(
                  "https://api.openai.com/v1/chat/completions",
                  {
                    model: "gpt-4",
                    messages: [
                      { role: "system", content: systemPrompt },
                      { role: "user", content: userMessage },
                    ],
                    temperature: 0.2,
                  },
                  {
                    signal,
                    headers: {
                      Authorization: `Bearer ${apiKey}`,
                      "Content-Type": "application/json",
                    },
                  }
                );

                gptResponse = JSON.parse(aiResponse.data.choices[0].message.content);

                await axios.post(`${backendURL}/api/v1/relationship`, {
                  conceptA,
                  conceptB,
                  gptResponse,
                }, { signal });
              }

              if (gptResponse.Answer.toLowerCase() === "yes") {
                const weightToAdd = CATEGORY_WEIGHTS[toCategory];
                conceptWeights[conceptA] += weightToAdd;

                // Track the reason for the added weight
                if (!weightBreakdown[conceptA]) {
                  weightBreakdown[conceptA] = [];
                }

                weightBreakdown[conceptA].push({
                  source: toCategory,
                  from: conceptB,
                  weight: weightToAdd,
                });
              }

              reasoningPairs.push({
                conceptA,
                conceptB,
                gptResponse,
              });
            }
          }
        }
      }

      finalResults.push({
        customerName: customer.customerName || "Unknown",
        conceptWeights,
        reasoning: reasoningPairs,
        breakdown: weightBreakdown, // <-- Add it to the result
      });
    }

    return finalResults;

  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }

};


export const onBoardingSecondCall = async (data, thunkAPI) => {

  try {
    let props = await axios.post(
      `https://mtcv2-production-cefa.up.railway.app/generate_response/`,
      {
        input_data: {
          ...data,
        },
      },
      { timeout: 1800000 }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const getAllPairs = async (data, thunkAPI) => {
  const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

  try {
    let props = await axios.post(
      `${backendURL}/api/v1/pairs/getAll`, data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};

export const runCombinationPipeline = async (data, thunkAPI) => {
  const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

  try {
    // STEP 1 – Generate combinations
    await axios.post(`${backendURL}/api/v1/combos/generate`, {
      dataPoints: [
        ...(data?.interests || []).map((n) => ({ name: n })),
        ...(data?.passions || []).map((n) => ({ name: n })),
      ],
    });

    // STEP 2 – Process combinations (tune as needed)
    await axios.post(`${backendURL}/api/v1/combos/process`, {
      batchSize: 200,
      concurrency: 2,
      onlySize: 2, // start with pairs; remove to process all sizes
    });

    // STEP 3 – Aggregate derived results
    await axios.post(`${backendURL}/api/v1/derived/aggregate`);

    // STEP 4 – Fetch preview of aggregated results
    const preview = await axios.get(
      `${backendURL}/api/v1/derived/preview?limit=50`
    );

    // Return only what UI needs (consistent with your pattern)
    return preview.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
  }
};

export const chat = async (data, thunkAPI) => {
  try {
    let props = await axios.post(`${BASE_URL}/onBoard/chat`, {
      query: data?.query,
      session_id: data?.sessionId,
      customerId: data?.customerId || "66332bb85725cd245aab4459",
      group: data?.group,
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
export const signIn = async (data, thunkAPI) => {
  try {
    let props = await axios.get(`${BASE_URL}/onBoard/signIn${data}`);
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
};
