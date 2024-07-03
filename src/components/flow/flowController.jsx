import React from "react";
import { setupGetFlow } from "../../global-redux/reducers/flow/slice";
import Mermaid from "react-mermaid2";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const flowController = () => {
  const dispatch = useDispatch();
  const { flowData, loading } = useSelector((state) => state?.flow);

  React.useEffect(() => {
    dispatch(setupGetFlow());
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Mermaid
            chart={flowData[0]?.message?.content
              .replace(/^```mermaid\n/, "")
              .replace(/\n```$/, "")}
          />
        </div>
      )}
    </div>
  );
};

export default flowController;
