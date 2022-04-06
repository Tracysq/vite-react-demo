import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { apiGetData } from './http/api'
import { Line } from './components/line'
import { Pie } from './components/pie'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState({})
  const [time, setTime] = useState(new Date())

  const formatDate = time => {
    if (!time) return
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = time.getDate()
    const h = time.getHours()
    const m = time.getMinutes()
    const s = time.getSeconds()
    const day = time.getDay()

    const dayObj = {
      0: '一',
      1: '二',
      2: '三',
      3: '四',
      4: '五',
      5: '六',
      6: '日'
    }
    return `${year}年${month}月${date}日 ${h < 10 ? `0${h}` :h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s} 星期${dayObj[day]}`
  }

  useEffect(() => {
    apiGetData({
      modules: [
        "control",  // 控制器
        "control_unit", // 控制单元
        "power", // 能耗统计
        "alarm"  // 告警统计
      ]
    }).then(res => {
      setData(res.data.data)
    })

    setInterval(() => {
      setTime(time => time = new Date())
    }, 1000);
  }, [])

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header> */}

      <div>{formatDate(time)}</div>
      {/* <div>{JSON.stringify(data)}</div> */}

      {
        data.power && <Line data={data.power} />
      }
      {
        data.alarm && <Pie data={data.alarm} />
      }
      
    </div>
  )
}

export default App
