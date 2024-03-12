import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import {
  setupAddExperience,
  resetExperienceAddSuccess,
} from "../../../global-redux/reducers/experiences/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ExperienceDialogForm from "./ExperienceDialogForm";

const AddExperienceDialog = ({
  setShowAddExperienceDialog,
  currentVendorId,
}) => {
  const dispatch = useDispatch();
  const [keywords, setKeywords] = React.useState([]);
  const [keyword, setKeyword] = React.useState([]);
  const [experienceName, setExperienceName] = React.useState("");
  const [why, setWhy] = React.useState("");
  const [link, setLink] = React.useState("");
  const [linkExplanation, setLinkExplanation] = React.useState("");
  const [links, setLinks] = React.useState([]);
  const [linksWithOtherExperinces, setLinksWithOtherExperiences] =
    React.useState([]);
  const { experienceAddSuccess, loading } = useSelector(
    (state) => state?.experiences
  );
  let initialValues = {
    title: "",
    address: "",
    price: "",
    duration: "",
    availableTime: "",
    description: "",
    termsAndConditions: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    address: Yup.string().required("Address is required"),
    price: Yup.string().required("Price is required"),
    duration: Yup.string().required("Duration is required"),
    availableTime: Yup.string().required("availableTime  is required"),
    description: Yup.string().required("Please provide description"),
    termsAndConditions: Yup.string().required(
      "Please provide Terms And Conditions"
    ),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!loading) {
        if (keywords.length === 0) {
          toast.error("Provide keywors");
        }
        if (linksWithOtherExperinces.length === 0) {
          toast.error("Provide Link With Other Experience");
        }
        if (links?.length === 0) {
          toast.error("Provide Links");
        }
        if (
          keywords.length !== 0 &&
          linksWithOtherExperinces?.length !== 0 &&
          links?.length !== 0
        ) {
          dispatch(
            setupAddExperience([
              {
                ...values,
                vendorId: currentVendorId,
                links: links?.map((item) => {
                  return {
                    link: item.link,
                    explanation: item.linkExplanation,
                  };
                }),
                linkWithOtherExperience: linksWithOtherExperinces?.map(
                  (item) => {
                    return {
                      experienceName: item?.experienceName,
                      why: item.why,
                    };
                  }
                ),
                storyLineKeywords: keywords.map((item) => {
                  return item?.name;
                }),
              },
            ])
          );
        }
      }
    },
  });

  function handleChangeDescription(value) {
    formik.resetForm({ values: { ...formik.values, description: value } });
  }
  function handleChangeTermsAndConditions(value) {
    formik.resetForm({
      values: { ...formik.values, termsAndConditions: value },
    });
  }

  function handleAddKeyword() {
    if (keyword === "") {
      toast.error("Provide Keyword");
    }
    if (keyword !== "") {
      setKeywords([...keywords, { id: uuidv4(), name: keyword }]);
      setKeyword("");
    }
  }

  function handleAddLinkWithOtherExperience() {
    if (experienceName === "" || why === "") {
      toast.error("Provide Both Values");
    }
    if (experienceName !== "" && why !== "") {
      setLinksWithOtherExperiences([
        ...linksWithOtherExperinces,
        { id: uuidv4(), experienceName, why },
      ]);
      setExperienceName("");
      setWhy("");
    }
  }

  function handleAddLink() {
    if (link === "" || linkExplanation === "") {
      toast.error("Provide Both Values");
    }
    if (link !== "" && linkExplanation !== "") {
      setLinks([...links, { id: uuidv4(), link, linkExplanation }]);
      setLink("");
      setLinkExplanation("");
    }
  }

  function handleDeleteKeyword(id) {
    setKeywords((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }
  function handleDeleteLinkWithOtherExperience(id) {
    setLinksWithOtherExperiences((pre) =>
      pre?.filter((singleItem) => singleItem?.id !== id)
    );
  }
  function handleDeleteLink(id) {
    setLinks((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }

  function handleClose() {
    formik.resetForm({ values: initialValues });
    setShowAddExperienceDialog(false);
  }

  React.useEffect(() => {
    if (experienceAddSuccess) {
      formik.resetForm({ values: initialValues });
      setShowAddExperienceDialog(false);
    }
  }, [experienceAddSuccess]);

  return (
    <ExperienceDialogForm
      formik={formik}
      keyword={keyword}
      setKeyword={setKeyword}
      handleAddKeyword={handleAddKeyword}
      handleDeleteKeyword={handleDeleteKeyword}
      experienceName={experienceName}
      setExperienceName={setExperienceName}
      why={why}
      setWhy={setWhy}
      handleAddLinkWithOtherExperience={handleAddLinkWithOtherExperience}
      handleClose={handleClose}
      loading={loading}
      handleChangeDescription={handleChangeDescription}
      handleChangeTermsAndConditions={handleChangeTermsAndConditions}
      keywords={keywords}
      linksWithOtherExperinces={linksWithOtherExperinces}
      handleDeleteLinkWithOtherExperience={handleDeleteLinkWithOtherExperience}
      link={link}
      setLink={setLink}
      linkExplanation={linkExplanation}
      setLinkExplanation={setLinkExplanation}
      links={links}
      handleAddLink={handleAddLink}
      handleDeleteLink={handleDeleteLink}
    />
  );
};

export default AddExperienceDialog;
