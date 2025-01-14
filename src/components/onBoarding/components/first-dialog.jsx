import React from "react";
import { changeOnBoardingAddSuccess } from "../../../global-redux/reducers/onBoard/slice";
import { useDispatch, useSelector } from "react-redux";
import { Chip, CircularProgress } from "@mui/material";

const FirstDialog = ({ firstOnBoardingResult, secondOnBoardingResult }) => {
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
        <div
          className="col-lg-6"
          style={{ borderRight: "1px solid lightGrey" }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <div>
              <p className="heading">Group Hypotheses :</p>

              <ol>
                {augmentedData.map((item, index) => (
                  <li key={index} className="mb-4">
                    {item
                      ?.replace(/^"|"$/g, "")
                      ?.replace(/,$/, "")
                      ?.replace(/^\d+\.\s*/, "")}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
        <div className="col-lg-6">
          {secondOnBoardLoading ? (
            <CircularProgress />
          ) : (
            <div>
              <div>
                <p className="heading">Group Hypotheses :</p>
                <ol>
                  {secondOnBoardingResult?.groupHypotheses?.map(
                    (groupHypothesesPoint, ind) => {
                      return (
                        <li key={ind} className="mb-4">
                          {groupHypothesesPoint?.replace(/^- /, "")}
                        </li>
                      );
                    }
                  )}
                </ol>
              </div>
              <div>
                {secondOnBoardingResult?.familyHypotheses?.map(
                  (member, mainInd) => {
                    return (
                      <div key={mainInd}>
                        <p className="heading">
                          Member Name : {member?.familyName?.toUpperCase()}
                        </p>
                        <ol>
                          {member?.familyHypotheses?.map((point, subInd) => {
                            return (
                              <li key={subInd} className="mb-4">
                                {point?.replace(/^- /, "")}
                              </li>
                            );
                          })}
                        </ol>
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

export default FirstDialog;
