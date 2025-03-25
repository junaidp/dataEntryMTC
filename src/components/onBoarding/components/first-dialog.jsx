import React from "react";
import { changeOnBoardingAddSuccess } from "../../../global-redux/reducers/onBoard/slice";
import { useDispatch, useSelector } from "react-redux";
import { Chip, CircularProgress } from "@mui/material";
import { data } from "./data";

const ResponseDialog = ({ firstOnBoardingResult, secondOnBoardingResult }) => {
  console.log(secondOnBoardingResult);
  const dispatch = useDispatch();
  const { secondOnBoardLoading, loading } = useSelector(
    (state) => state?.onBoard
  );
  const augmentedData = firstOnBoardingResult?.augmentedData || [];

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <Chip label="AI Response" />
        <button
          className="btn btn-danger"
          onClick={() => dispatch(changeOnBoardingAddSuccess(false))}
        >
          Close
        </button>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {loading ? (
            <CircularProgress />
          ) : (
            <div>
              <div>
                {secondOnBoardingResult?.data?.length &&
                  secondOnBoardingResult?.data[0]?.members?.map(
                    (singleMember, ind) => {
                      return (
                        <div key={ind}>
                          <div>
                            <p className="heading">
                              Member Name: {singleMember?.name}
                            </p>
                          </div>
                          <hr />
                          <p className="heading">Correlations</p>
                          <hr />
                          <ul>
                            {singleMember?.hypothesis?.correlations?.map(
                              (correlation) => (
                                <>
                                  <li className="mb-4">
                                    Relation : {correlation?.["Relation"]}
                                  </li>

                                  <li className="mb-4">
                                    Reasoning : {correlation?.["Reasoning"]}
                                  </li>
                                  <li className="mb-4">
                                    Data Pair :{" "}
                                    {correlation?.["Data Pair"]?.map((pair) => (
                                      <Chip label={pair} className="mx-2" />
                                    ))}
                                  </li>
                                  <hr />
                                </>
                              )
                            )}
                          </ul>
                          <hr />
                          <p className="heading">Extracted Data:</p>
                          <hr />
                          <div>
                            {Object.entries(
                              singleMember?.hypothesis?.extracted_data
                            )?.map((data) => {
                              return (
                                <div>
                                  <p className="heading mb-4">{data[0]} :</p>
                                  <ul>
                                    {data[1]?.map((singleExtractedData) => {
                                      return (
                                        <>
                                          <li className="mb-4">
                                            label: {singleExtractedData?.label}
                                          </li>
                                          <li className="mb-4">
                                            {" "}
                                            weight:{" "}
                                            {singleExtractedData?.weight}
                                          </li>
                                          <hr />
                                        </>
                                      );
                                    })}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                          <hr />
                          <p className="heading">Final Hypotheses:</p>
                          <hr />
                          <ul>
                            {singleMember?.final_hypotheses?.map(
                              (hypotheses) => (
                                <>
                                  <li className="mb-4">
                                    Hypothesis : {hypotheses?.["Hypothesis"]}
                                  </li>
                                  <li className="mb-4">
                                    Confidence Score :{" "}
                                    {hypotheses?.["Confidence Score"]}
                                  </li>
                                  <li className="mb-4">
                                    Explanation : {hypotheses?.["Explanation"]}
                                  </li>
                                  <hr />
                                </>
                              )
                            )}
                          </ul>
                          <hr />
                          <p className="heading">Updated Weights :</p>
                          <hr />
                          <ul>
                            {singleMember?.updated_weights?.map((weight) => (
                              <>
                                <li className="mb-4">
                                  Data Point: {weight?.["Data Point"]}
                                </li>
                                <li className="mb-4">
                                  Updated Weight: {weight?.["Updated Weight"]}
                                </li>
                                <li className="mb-4">
                                  Details : {weight?.["Details"]}
                                </li>
                                <hr />
                              </>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseDialog;
