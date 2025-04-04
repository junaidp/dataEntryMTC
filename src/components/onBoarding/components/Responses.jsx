import React from "react";

const Responses = ({ response }) => {
  return (
    <div className="mt-4 mx-3">
      <table className="table table-bordered  table-hover rounded mb-4">
        <thead className="bg-secondary text-white">
          <tr className="row">
            <th className="col-lg-4">Claude Response</th>
            <th className="col-lg-4">Open AI Response</th>
            <th className="col-lg-4">Gemini Response</th>
          </tr>
        </thead>
        <tbody>
          <tr className="row mb-4">
            <td className="col-lg-4">
              {(() => {
                try {
                  const parsedResponse = JSON?.parse(response?.claudeResponse);
                  return (
                    parsedResponse?.content?.map((choice) => {
                      return choice?.text
                        ?.split(/\d+\./)
                        ?.filter(Boolean)
                        ?.map((para, index) => {
                          return (
                            <div key={index}>
                              <p>
                                {index + 1}. {para?.trim() || "null"}
                              </p>
                            </div>
                          );
                        });
                    }) || "N/A"
                  );
                } catch (error) {
                  return "null";
                }
              })()}

              {response?.claudeResponse && (
                <div>
                  <hr />
                  <h5 className="heading">Tokens:</h5>
                  <div className="row">
                    <p className="col-lg-3">Input Tokens:</p>
                    <p className="col-lg-1">
                      {(() => {
                        try {
                          const parsedResponse = JSON?.parse(
                            response?.claudeResponse
                          );
                          return parsedResponse?.usage?.input_tokens || "N/A";
                        } catch (error) {
                          return "Error parsing JSON";
                        }
                      })()}
                    </p>
                  </div>
                  <div className="row">
                    <p className="col-lg-4">Output Tokens:</p>
                    <p className="col-lg-1">
                      {(() => {
                        try {
                          const parsedResponse = JSON?.parse(
                            response?.claudeResponse
                          );
                          return parsedResponse?.usage?.output_tokens || "N/A";
                        } catch (error) {
                          return "Error parsing JSON";
                        }
                      })()}
                    </p>
                  </div>
                </div>
              )}
            </td>
            <td className="col-lg-4">
              {response?.openAiResponse
                ? JSON?.parse(response?.openAiResponse)?.choices?.map(
                    (choice) => {
                      return choice?.message?.content
                        ?.split(/\d+\./)
                        ?.filter(Boolean)
                        ?.map((para, index) => {
                          return (
                            <div key={index}>
                              <p>
                                {index + 1}. {para?.trim() || "null"}
                              </p>
                            </div>
                          );
                        });
                    }
                  )
                : "null"}
              {response?.openAiResponse && (
                <div>
                  <hr />
                  <h5 className="heading">Tokens:</h5>
                  <div className="row">
                    <p className="col-lg-4">Prompt Tokens:</p>
                    <p className="col-lg-1">
                      {
                        JSON?.parse(response?.openAiResponse)?.usage
                          ?.prompt_tokens
                      }
                    </p>
                  </div>
                  <div className="row">
                    <p className="col-lg-4">Completion Tokens:</p>
                    <p className="col-lg-1">
                      {
                        JSON?.parse(response?.openAiResponse)?.usage
                          ?.completion_tokens
                      }
                    </p>
                  </div>
                  <div className="row">
                    <p className="col-lg-4">Total Tokens:</p>
                    <p className="col-lg-1">
                      {
                        JSON?.parse(response?.openAiResponse)?.usage
                          ?.total_tokens
                      }
                    </p>
                  </div>
                </div>
              )}
            </td>
            <td className="col-lg-4">
              {(() => {
                try {
                  const parsedResponse = JSON?.parse(response?.geminiResponse);
                  return (
                    parsedResponse?.candidates[0]?.content?.parts?.map(
                      (choice) => {
                        return choice?.text
                          ?.split(/\d+\./)
                          ?.filter(Boolean)
                          ?.map((para, index) => {
                            return (
                              <div key={index}>
                                <p>
                                  {index + 1}. {para?.trim() || "null"}
                                </p>
                              </div>
                            );
                          });
                      }
                    ) || "N/A"
                  );
                } catch (error) {
                  return "null";
                }
              })()}

              {response?.geminiResponse && (
                <div>
                  <hr />
                  <h5 className="heading">Tokens:</h5>
                  <div className="row">
                    <p className="col-lg-4">Prompt Tokens:</p>
                    <p className="col-lg-4">
                      {(() => {
                        try {
                          const parsedResponse = JSON?.parse(
                            response?.geminiResponse
                          );
                          return (
                            parsedResponse?.usageMetadata?.promptTokenCount ||
                            "N/A"
                          );
                        } catch (error) {
                          return "Error parsing JSON";
                        }
                      })()}
                    </p>
                  </div>
                  <div className="row">
                    <p className="col-lg-4">Candidate Tokens:</p>
                    <p className="col-lg-4">
                      {(() => {
                        try {
                          const parsedResponse = JSON?.parse(
                            response?.candidatesTokenCount
                          );
                          return (
                            parsedResponse?.usageMetadata
                              ?.candidatesTokenCount || "N/A"
                          );
                        } catch (error) {
                          return "Error parsing JSON";
                        }
                      })()}
                    </p>
                  </div>
                  <div className="row">
                    <p className="col-lg-4">Total Tokens:</p>
                    <p className="col-lg-4">
                      {(() => {
                        try {
                          const parsedResponse = JSON?.parse(
                            response?.totalTokenCount
                          );
                          return (
                            parsedResponse?.usageMetadata?.totalTokenCount ||
                            "N/A"
                          );
                        } catch (error) {
                          return "Error parsing JSON";
                        }
                      })()}
                    </p>
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
