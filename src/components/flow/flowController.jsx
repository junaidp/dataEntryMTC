import React from "react";
import {
  setupGetFlow,
  changePreviousFlow,
} from "../../global-redux/reducers/flow/slice";
import Mermaid from "react-mermaid2";
import { useDispatch, useSelector } from "react-redux";
import { Card, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const flowController = () => {
  const dispatch = useDispatch();
  const { flowData, loading, previousFlow } = useSelector(
    (state) => state?.flow
  );
  const [flowName, setFlowName] = React.useState("");

  function handleSubmitFlow() {
    if (flowName === "") {
      toast.error("Provide the flow name");
    } else {
      dispatch(setupGetFlow({ flowName, previousFlow }));
      dispatch(changePreviousFlow(flowName));
    }
  }

  return (
    <div>
      <div className="row gap-4">
        <Card className="col-lg-4 p-4 bg-primary">
          <div>
            <input
              className="form-control m-0"
              placeholder="Enter Process Name"
              value={flowName}
              onChange={(event) => setFlowName(event?.target?.value)}
            />
            <div className="mt-4 row ">
              <div
                className="btn btn-labeled btn-primary  col-lg-6 mx-2 mb-2"
                onClick={() => setFlowName("")}
              >
                CLEAR
              </div>
              <div
                className="btn btn-labeled btn-secondary col-lg-5 mx-2 mb-2"
                onClick={handleSubmitFlow}
              >
                SUBMIT
              </div>
            </div>
          </div>
        </Card>

        <Card className="col-lg-7">
          <div>
            <h5 style={{ textAlign: "center" }} className="mt-3">
              Process Flow Diagram
            </h5>
            <hr />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <Mermaid
                chart={flowData[0]?.message?.content
                  .replace(/^```mermaid\n/, "")
                  .replace(/\n```$/, "")}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default flowController;
