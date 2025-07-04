import React, { useEffect, useState } from 'react';
import './TestScreen.css';
import Cookies from "js-cookie"
import axios from 'axios';
const TestScreen = () => {
  const api = import.meta.env.VITE_API;
  const [Statements, setStatements] = useState(() => {
    const stored = localStorage.getItem("statements");
    return stored ? stored : Array(50).fill("");
  });
  const [Options, setOptions] = useState(() => {
    const stored = localStorage.getItem("options");
    return stored ? stored : Array(50).fill(["", "", "", ""]);
  });
  const [dis, setdis] = useState(() => {
    const stored = localStorage.getItem("dis");
    return stored ? stored : Array(50).fill(false);
  });
  const [len, setlen] = useState(() => {
    const stored = localStorage.getItem("len");
    return stored ? stored : 1
  });
  const [PgNum, setPageNum] = useState(() => {
    const stored = localStorage.getItem("pg");
    return stored ? stored : 1
  })
  const [ans, SetAns] = useState(() => {
    const stored = localStorage.getItem("ans");
    return stored ? stored : Array(50).fill(0);
  })
  const [Selected, setSelected] = useState(() => {
    const stored = localStorage.getItem("selected");
    return stored ? stored : Array(50).fill(0);
  })
  const [Saved, setSaved] = useState(() => {
    const stored = localStorage.getItem("saved");
    return stored ? stored : Array(50).fill(false);
  })
  useEffect(() => {
    const url= new URL(window.location.href);
    const testId=url.searchParams.get("test-id");
    const tpid = Cookies.get("testid")||testId;
    if(!tpid)return;
    const fetchPaper = async () => {
      axios.post(`api/user/get-test`, { id: tpid }).then((res) => {
        setStatements(res.data.Statements);
        setOptions(res.data.Options);
        setlen(res.data.len);
        console.log(res.data.len);
      }).catch(err => {
        console.log(err);

      })
    }
    fetchPaper();
  }, [])
  useEffect(() => {
    localStorage.setItem("ans", ans);
  }, [ans])
  useEffect(() => {
    localStorage.setItem("dis", dis);
  }, [dis])
  useEffect(() => {
    localStorage.setItem("statements", Statements);
  }, [Statements])
  useEffect(() => {
    localStorage.setItem("options", Options);
  }, [Options])
  useEffect(() => {
    localStorage.setItem("pg", PgNum);
  }, [PgNum])
  useEffect(() => {
    localStorage.setItem("selected", Selected);
  }, [Selected])
  useEffect(() => {
    localStorage.setItem("saved", Saved);
  }, [Saved])
  useEffect(() => {
    localStorage.setItem("len", len);
  }, [len])
  const OnSave = (qindex) => {
    if (!Selected[qindex]) {
      alert("Option")
      return
    }
    const arr = [...Saved];
    arr[qindex] = true;
    setSaved(arr);
    const disable = [...dis];
    disable[qindex] = true;
    setdis(disable);
  }
  const OnEdit = (index) => {
    const disable = [...dis];
    const saved = [...Saved];
    disable[index] = false;
    saved[index] = false;
    setdis(disable);
    setSaved(saved);
  }
  return (
    <div>
      {/* Navbar */}
      <header className="tc-navbar">
        <div className="tc-logo">
          Sigma<span className="tc-highlight">JEE</span>
        </div>
        <div className="tc-nav-buttons">
          <button className="tc-nav-btn">Home</button>
          <button className="tc-nav-btn">Material</button>
          <button className="tc-nav-btn">Lectures</button>
          <button className="tc-nav-btn">Mentorship</button>
        </div>
      </header>

      {/* Main Container */}
      <div className="tc-container">

        {/* Left Panel */}
        <div className="tc-left-panel">
          <div className="tc-form-group">
            <button style={{ width: '100%' }}>Next</button>
          </div>

          <div className="tc-questions">
            {Array.from({ length: 50 }).map((_, qindex) => (
              <div className={`tc-question-boxes display }`} key={qindex}>
                {qindex + 1 > len ? "N" : qindex + 1}
              </div>
            ))}
          </div>

          <div className="tc-form-group">
            <button style={{ width: '100%' }}>Submit Test</button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="tc-right-panel">
          {/* Question Cards */}
          <div className="tc-question-card">
            <div className="tc-question-num">Q 1</div>
            <div className="tc-statement">
              {Statements[PgNum - 1]}
            </div>

            {['A', 'B', 'C', 'D'].map((opt, index) => (
              <div key={index} className="tc-option-row">
                <div className={`tc-options ${Selected[PgNum - 1] === (index + 1) ? "green" : "faltu"} `} onClick={() => {
                  if (dis[index]) return;
                  const selected = [...Selected];
                  selected[PgNum - 1] = index + 1;
                  setSelected(selected);
                }}>{Options[PgNum - 1][index]}</div>
              </div>
            ))}

            <button onClick={() => {

              OnSave(index);
            }}>Save</button>
            <button onClick={() => { OnEdit(index) }}>Edit</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TestScreen;
