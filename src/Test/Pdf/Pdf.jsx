import React, { useEffect, useState } from "react";
import { generatePDF } from "./generatePDF";
import axios from "axios";

const TestPDFDownload = ({test}) => {
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    // Fetch test data
    const api=import.meta.env.VITE_API;
    axios.get(`/api/user/get-pdf`,{test}) // ← replace with your endpoint
      .then(res => setPaper(res.data))
      .catch(err => console.log("Fetch error", err));
  }, []);

  const download = () => {
    if (paper) generatePDF(paper);
  };

  return (
     <></>
  );
};

export default TestPDFDownload;
