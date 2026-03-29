import { useState } from "react";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [postA, setPostA] = useState("");
  const [postB, setPostB] = useState("");

  const [getResult, setGetResult] = useState("");
  const [postResult, setPostResult] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLog((prev) => [msg, ...prev]);
  };

  const handleGet = async () => {
    try {
      const url = `${API_BASE}/multiplication?num1=${num1}&num2=${num2}`;
      addLog(`GET 요청: ${url}`);

      const res = await fetch(url);
      const data = await res.text();

      setGetResult(data);
      addLog(`GET 응답: ${data}`);
    } catch (e) {
      addLog("GET 에러 발생");
    }
  };

  const handlePost = async () => {
    try {
      const url = `${API_BASE}/multiplication`;
      addLog(`POST 요청: ${url}`);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          a: Number(postA),
          b: Number(postB),
        }),
      });

      const data = await res.json();

      setPostResult(data.message);
      addLog(`POST 응답: ${JSON.stringify(data)}`);
    } catch (e) {
      addLog("POST 에러 발생");
    }
  };

  return (
    <div className="container">
      <h1>팽도리의 계산기 테스트!!!</h1>

      <div className="grid">
        {/* GET */}
        <div className="card">
          <h2>GET /multiplication</h2>
          <input
            placeholder="num1"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
          <input
            placeholder="num2"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
          <button onClick={handleGet}>GET 실행</button>

          <div className="result">
            결과: {getResult}
          </div>
        </div>

        {/* POST */}
        <div className="card">
          <h2>POST /multiplication</h2>
          <input
            placeholder="a"
            value={postA}
            onChange={(e) => setPostA(e.target.value)}
          />
          <input
            placeholder="b"
            value={postB}
            onChange={(e) => setPostB(e.target.value)}
          />
          <button onClick={handlePost}>POST 실행</button>

          <div className="result">
            결과: {postResult}
          </div>
        </div>
      </div>

      <div className="log">
        <h3>요청 로그</h3>
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}

export default App;