import React from "react";
import Children from "./ChildrenForm";

const ChildrenWrap = ({
  handleAddChildrenDataObject,
  childrenData,
  setChildrenExtraData,
  childrenExtraData,
  setData,
  handleDeleteAccordion,
  index
}) => {
  return (
    <div>
      <h3 className=" underline">Household</h3>
      <div className="mt-4">
        <header className="section-header my-3 align-items-center text-start d-flex">
          <div className="mb-0 sub-heading">Add Dependents</div>
          <div
            className="btn btn-labeled btn-primary ms-3 px-3 shadow"
            onClick={() => handleAddChildrenDataObject(childrenData?.id)}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus-circle"></i>
            </span>
            Add
          </div>
        </header>
        <div className="accordion" id="sub-accordionExample">
          {childrenData?.children?.length === 0 ? (
            <p>No dependents added yet!</p>
          ) : (
            childrenData?.children?.map((children, childIndex) => {
              return (
                <div className="accordion-item" key={children?.id}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed br-8"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#sub-collapse${children?.id}`}
                      aria-expanded="false"
                      aria-controls={`sub-collapse${children?.id}`}
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
                          <div>Dependent {childIndex + 1}</div>
                        </div>
                        <i
                          class="fa fa-trash text-danger f-18 cusrsor-pointer"
                          onClick={() =>
                            handleDeleteAccordion(
                              children?.id,
                              childrenData?.id
                            )
                          }
                        ></i>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`sub-collapse${children?.id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#sub-accordionExample"
                  >
                    <div className="accordion-body">
                      <Children
                        data={children}
                        childrenExtraData={childrenExtraData}
                        setData={setData}
                        setChildrenExtraData={setChildrenExtraData}
                        childrenData={childrenData}
                        index={index}
                        childIndex={childIndex}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ChildrenWrap;
