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
    } catch {
      addLog("GET 요청 중 오류가 발생했습니다.");
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
    } catch {
      addLog("POST 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="grain-overlay" />

      <main className="container">
        <section className="hero">
          <p className="eyebrow">Birch Studio</p>
          <h1>밝은 자작나무 결 위에 놓인 API 테스트 데스크</h1>
          <p className="hero-copy">
            부드러운 베이지 톤과 은은한 확산광을 중심으로, GET과 POST 요청을
            차분하게 확인할 수 있도록 화면을 다시 정리했습니다.
          </p>
        </section>

        <section className="grid">
          <article className="card">
            <div className="card-head">
              <p className="card-kicker">Endpoint</p>
              <h2>GET /multiplication</h2>
            </div>

            <label className="field">
              <span>첫 번째 숫자</span>
              <input
                placeholder="num1"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
            </label>

            <label className="field">
              <span>두 번째 숫자</span>
              <input
                placeholder="num2"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
            </label>

            <button onClick={handleGet}>GET 실행</button>

            <div className="result">
              <span className="result-label">결과</span>
              <strong>{getResult || "아직 응답이 없습니다."}</strong>
            </div>
          </article>

          <article className="card">
            <div className="card-head">
              <p className="card-kicker">Endpoint</p>
              <h2>POST /multiplication</h2>
            </div>

            <label className="field">
              <span>값 A</span>
              <input
                placeholder="a"
                value={postA}
                onChange={(e) => setPostA(e.target.value)}
              />
            </label>

            <label className="field">
              <span>값 B</span>
              <input
                placeholder="b"
                value={postB}
                onChange={(e) => setPostB(e.target.value)}
              />
            </label>

            <button onClick={handlePost}>POST 실행</button>

            <div className="result">
              <span className="result-label">결과</span>
              <strong>{postResult || "아직 응답이 없습니다."}</strong>
            </div>
          </article>
        </section>

        <section className="log-panel">
          <div className="log-head">
            <p className="card-kicker">Activity</p>
            <h3>요청 로그</h3>
          </div>

          <div className="log-list">
            {log.length > 0 ? (
              log.map((entry, index) => (
                <div className="log-item" key={`${entry}-${index}`}>
                  {entry}
                </div>
              ))
            ) : (
              <div className="log-empty">
                아직 기록이 없습니다. 요청을 실행하면 이곳에 순서대로 남습니다.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
