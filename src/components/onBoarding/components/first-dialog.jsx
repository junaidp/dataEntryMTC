import React from "react";
import { changeOnBoardingAddSuccess } from "../../../global-redux/reducers/onBoard/slice";
import { useDispatch, useSelector } from "react-redux";
import { Chip, CircularProgress } from "@mui/material";

const ResponseDialog = () => {
  const dispatch = useDispatch();
  const { subLoading, loading, firstOnBoardingResult, secondOnBoardingResult } = useSelector(
    (state) => state?.onBoard
  );

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
        <div className="col-lg-6">
          <h1 className="heading">First Response</h1>
          {
            subLoading ? <CircularProgress /> :
              firstOnBoardingResult.map((customer, ind) => {
                return <div key={ind}>
                  <p className="mb-4 heading">Name: {customer?.name}</p>
                  <p className="mb-4">Exact Age: {customer?.dateOfBirth?.exactAge}</p>
                  <p className="mb-4">Time Before Next Birthday: {customer?.dateOfBirth?.timeBeforeNextBirthday}</p>
                  <p className="mb-4">Life Milestones: {customer?.dateOfBirth?.lifeMilestones}</p>
                  <p className="mb-4">Cultural Touchstones: {customer?.dateOfBirth?.culturalTouchstones}</p>
                  <p className="mb-4">Legal Adult Status: {customer?.dateOfBirth?.legalAdultStatus}</p>
                  <p className="mb-4">Age Restrictions: {customer?.dateOfBirth?.ageRestrictions}</p>
                  <p className="mb-4">Country of Birth: {customer?.placeOfBirth?.countryOfBirth}</p>
                  <p className="mb-4">Likely Languages: {customer?.placeOfBirth?.likelyLanguages?.join(", ")}</p>
                  <p className="mb-4">Likely Pronouns: {customer?.gender?.likelyPronouns}</p>
                  <p className="mb-4">Place of Work: {customer?.email?.placeOfWork}</p>
                  <p className="mb-4">Digital Familiarity: {customer?.email?.digitalFamiliarity}</p>
                  <p className="mb-4">Country Linked: {customer?.phoneNumber?.countryLinked}</p>
                  <p className="mb-4">International Connections: {customer?.phoneNumber?.internationalConnections}</p>
                  <p className="mb-4">Country of Residence: {customer?.cityOfResidence?.countryOfResidence}</p>
                  <p className="mb-4">Likely Languages: {customer?.cityOfResidence?.likelyLanguages?.join(", ")}</p>
                  <p className="mb-4">Present Day Environment: {customer?.cityOfResidence?.presentDayEnvironment}</p>
                  <p className="mb-4">Lifestyle: {customer?.cityOfResidence?.lifeStyle}</p>
                  <p className="mb-4">Email & Full Name: {customer?.combined?.emailAndFullName}</p>
                  <p className="mb-4">Email & Age: {customer?.combined?.emailAndAge}</p>
                  <p className="mb-4">Rootedness: {customer?.combined?.rootedness}</p>
                  <p className="mb-4">Cultural Roots: {customer?.combined?.culturalRoots}</p>
                  <p className="mb-4">Living Style: {customer?.combined?.livingStyle}</p>
                  <p className="mb-4">Demographic Preferences: {customer?.combined?.demographicPreferences}</p>
                  <p className="mb-4">Life Narrative: {customer?.combined?.lifeNarrative}</p>
                  <p className="mb-4">Self Expression: {customer?.combined?.selfExpression}</p>
                  <p className="mb-4">Cultural Connections: {customer?.combined?.culturalConnections}</p>
                  <p className="mb-4">Career Status: {customer?.combined?.careerStatus}</p>
                  <hr />
                </div>
              })
          }
        </div>
        <div className="col-lg-6">
          <h1 className="heading">Second Response</h1>
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
                                    {correlation?.["Data Pair"]?.map((pair, ind) => (
                                      <Chip label={pair} className="mx-2" key={ind} />
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
                            )?.map((data, ind) => {
                              return (
                                <div key={ind}>
                                  <p className="heading mb-4">{data[0]} :</p>
                                  <ul>
                                    {data[1]?.map((singleExtractedData) => {
                                      return (
                                        <>
                                          <li className="mb-4">
                                            label: {singleExtractedData?.label}
                                          </li>
                                          <li className="mb-4">
                                            weight: {singleExtractedData?.weight}
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
