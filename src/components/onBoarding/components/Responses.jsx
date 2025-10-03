import React from "react";

/* ──────────────────────────────────────────────────────────────
   Helpers (pure): outside component to avoid re-creation
   ────────────────────────────────────────────────────────────── */
const safeParse = (str) => {
  try {
    return str ? JSON.parse(str) : null;
  } catch {
    return null;
  }
};

const splitNumbered = (text) =>
  (text || "")
    .split(/\d+\./) // split on "1." / "2." / ...
    .filter(Boolean)
    .map((s) => s.trim())
    .filter(Boolean);

const NumberedParagraphs = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) return null;
  return items.map((para, index) => (
    <div key={`${index}-${para.slice(0, 20)}`}>
      <p>
        {index + 1}. {para || "null"}
      </p>
    </div>
  ));
};

const Responses = ({ response = {} }) => {
  /* ────────────────────────────────────────────────────────────
     Parse once (memoized)
     ──────────────────────────────────────────────────────────── */
  const claudeJson = React.useMemo(
    () => safeParse(response?.claudeResponse),
    [response?.claudeResponse]
  );
  const openaiJson = React.useMemo(
    () => safeParse(response?.openAiResponse),
    [response?.openAiResponse]
  );
  const geminiJson = React.useMemo(
    () => safeParse(response?.geminiResponse),
    [response?.geminiResponse]
  );

  // Gemini tokens come from separate fields in your original code.
  const geminiCandidatesTokenJson = React.useMemo(
    () => safeParse(response?.candidatesTokenCount),
    [response?.candidatesTokenCount]
  );
  const geminiTotalTokenJson = React.useMemo(
    () => safeParse(response?.totalTokenCount),
    [response?.totalTokenCount]
  );

  /* ────────────────────────────────────────────────────────────
     Content extraction (memoized)
     ──────────────────────────────────────────────────────────── */
  const claudeContent = React.useMemo(() => {
    // original structure: parsed.content[].text
    if (!claudeJson) return { items: null, parseError: true };
    const blocks =
      claudeJson?.content?.flatMap((choice, i) =>
        splitNumbered(choice?.text)?.map((t, j) => ({ t, key: `c-${i}-${j}` }))
      ) || [];
    return { items: blocks, parseError: false };
  }, [claudeJson]);

  const openaiContent = React.useMemo(() => {
    // original structure: parsed.choices[].message.content
    if (!response?.openAiResponse) return { items: null, missing: true };
    if (!openaiJson) return { items: null, parseError: true };
    const blocks =
      openaiJson?.choices?.flatMap((choice, i) =>
        splitNumbered(choice?.message?.content)?.map((t, j) => ({
          t,
          key: `o-${i}-${j}`,
        }))
      ) || [];
    return { items: blocks };
  }, [openaiJson, response?.openAiResponse]);

  const geminiContent = React.useMemo(() => {
    // original structure: parsed.candidates[0].content.parts[].text
    if (!geminiJson) return { items: null, parseError: true };
    const parts = geminiJson?.candidates?.[0]?.content?.parts || [];
    const blocks = parts.flatMap((part, i) =>
      splitNumbered(part?.text)?.map((t, j) => ({ t, key: `g-${i}-${j}` }))
    );
    return { items: blocks };
  }, [geminiJson]);

  /* ────────────────────────────────────────────────────────────
     Token counts (same fields as your original code)
     ──────────────────────────────────────────────────────────── */
  const claudeTokens = React.useMemo(
    () => ({
      input: claudeJson?.usage?.input_tokens ?? "N/A",
      output: claudeJson?.usage?.output_tokens ?? "N/A",
    }),
    [claudeJson]
  );

  const openaiTokens = React.useMemo(
    () => ({
      prompt: openaiJson?.usage?.prompt_tokens,
      completion: openaiJson?.usage?.completion_tokens,
      total: openaiJson?.usage?.total_tokens,
    }),
    [openaiJson]
  );

  const geminiTokens = React.useMemo(
    () => ({
      prompt: geminiJson?.usageMetadata?.promptTokenCount ?? "N/A",
      candidates:
        geminiCandidatesTokenJson?.usageMetadata?.candidatesTokenCount ?? "N/A",
      total: geminiTotalTokenJson?.usageMetadata?.totalTokenCount ?? "N/A",
    }),
    [geminiJson, geminiCandidatesTokenJson, geminiTotalTokenJson]
  );

  return (
    <div className="mt-4 mx-3">
      <table className="table table-bordered table-hover rounded mb-4">
        <thead className="bg-secondary text-white">
          <tr className="row">
            <th className="col-lg-4">Claude Response</th>
            <th className="col-lg-4">Open AI Response</th>
            <th className="col-lg-4">Gemini Response</th>
          </tr>
        </thead>

        <tbody>
          <tr className="row mb-4">
            {/* CLAUDE */}
            <td className="col-lg-4">
              {/* content */}
              {(() => {
                if (claudeContent.parseError) return "null";
                const items = claudeContent.items;
                if (!items || items.length === 0) return "N/A";
                return items.map(({ t, key }, idx) => (
                  <div key={key || `c-${idx}`}>
                    <p>
                      {idx + 1}. {t || "null"}
                    </p>
                  </div>
                ));
              })()}

              {/* tokens */}
              {response?.claudeResponse && (
                <div>
                  <hr />
                  <h5 className="heading">Tokens:</h5>
                  <div className="row">
                    <p className="col-lg-3">Input Tokens:</p>
                    <p className="col-lg-1">{claudeTokens.input}</p>
                  </div>
                  <div className="row">
                    <p className="col-lg-4">Output Tokens:</p>
                    <p className="col-lg-1">{claudeTokens.output}</p>
                  </div>
                </div>
              )}
            </td>

            {/* OPENAI */}
            <td className="col-lg-4">
              {/* content */}
              {(() => {
                if (openaiContent.missing) return "null"; // same as your original behavior
                if (openaiContent.parseError) return "null";
                const items = openaiContent.items;
                if (!items || items.length === 0) return "N/A";
                return items.map(({ t, key }, idx) => (
                  <div key={key || `o-${idx}`}>
                    <p>
                      {idx + 1}. {t || "null"}
                    </p>
                  </div>
                ));
              })()}

              {/* tokens */}
              {response?.openAiResponse && (
                <div>
                  <hr />
                  <h5 className="heading">Tokens:</h5>
                  <div className="row">
                    <p className="col-lg-4">Prompt Tokens:</p>
                    <p className="col-lg-1">{openaiTokens.prompt}</p>
                  </div>
                  <div className="row">
                    <p className="col-lg-4">Completion Tokens:</p>
                    <p className="col-lg-1">{openaiTokens.completion}</p>
                  </div>
                  <div className="row">
                    <p className="col-lg-4">Total Tokens:</p>
                    <p className="col-lg-1">{openaiTokens.total}</p>
                  </div>
                </div>
              )}
            </td>

            {/* GEMINI */}
            <td className="col-lg-4">
              {/* content */}
              {(() => {
                if (geminiJson === null) return "null"; // parse error or missing
                const items = geminiContent.items;
                if (!items || items.length === 0) return "N/A";
                return items.map(({ t, key }, idx) => (
                  <div key={key || `g-${idx}`}>
                    <p>
                      {idx + 1}. {t || "null"}
                    </p>
                  </div>
                ));
              })()}

              {/* tokens */}
              {response?.geminiResponse && (
                <div>
                  <hr />
                  <h5 className="heading">Tokens:</h5>
                  <div className="row">
                    <p className="col-lg-4">Prompt Tokens:</p>
                    <p className="col-lg-4">{geminiTokens.prompt}</p>
                  </div>
                  <div className="row">
                    <p className="col-lg-4">Candidate Tokens:</p>
                    <p className="col-lg-4">{geminiTokens.candidates}</p>
                  </div>
                  <div className="row">
                    <p className="col-lg-4">Total Tokens:</p>
                    <p className="col-lg-4">{geminiTokens.total}</p>
                  </div>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Responses;
