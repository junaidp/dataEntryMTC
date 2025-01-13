import React from "react";
import { changeOnBoardingAddSuccess } from "../../../global-redux/reducers/onBoard/slice";
import { useDispatch } from "react-redux";

const FirstDialog = ({ firstOnBoardingResult }) => {
  const dispatch = useDispatch();
  return (
    <div class="p-4">
      <p>OnBorading Data:</p>
      <div className="d-flex justify-content-between">
        <button
          class="btn btn-primary"
          onClick={() => dispatch(changeOnBoardingAddSuccess(false))}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FirstDialog;
