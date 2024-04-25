import React from "react";
import Children from "./ChildrenForm";

const ChildrenWrap = ({
  handleAddChildrenDataObject,
  childrenData,
  setChildrenExtraData,
  extraData,
  childrenExtraData,
  setChildrenData,
  handleDeleteAccordion,
}) => {
  return (
    <div>
      <h3 className=" underline">Household</h3>
      <div className="mt-4">
        <header className="section-header my-3 align-items-center text-start d-flex">
          <div className="mb-0 sub-heading">Add Dependents</div>
          <div
            className="btn btn-labeled btn-primary ms-3 px-3 shadow"
            onClick={handleAddChildrenDataObject}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus-circle"></i>
            </span>
            Add
          </div>
        </header>
        <div className="accordion" id="accordionFlushExample">
          {childrenData?.map((children, index) => {
            return (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed br-8"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapse${index}`}
                    onClick={() =>
                      setChildrenExtraData({
                        interest: "",
                        link: "",
                        program: "",
                        doc: "",
                        passion: "",
                        lifestyle: "",
                        bucketlist: "",
                        specialrequirement: "",
                      })
                    }
                  >
                    <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                      <div className="d-flex align-items-center w-100">
                        <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                        <div>Dependent {index + 1}</div>
                      </div>
                      {index !== 0 && (
                        <i
                          class="fa fa-trash text-danger f-18 cusrsor-pointer"
                          onClick={() => handleDeleteAccordion(children?.id)}
                        ></i>
                      )}
                    </div>
                  </button>
                </h2>
                <div
                  id={`flush-collapse${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <Children
                      index={index}
                      key={index}
                      data={children}
                      extraData={extraData}
                      childrenExtraData={childrenExtraData}
                      setChildrenData={setChildrenData}
                      setChildrenExtraData={setChildrenExtraData}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChildrenWrap;
