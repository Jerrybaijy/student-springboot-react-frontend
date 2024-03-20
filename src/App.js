import './App.css';
// 引入 Appbar.js 文件
import Appbar from './components/Appbar';
// 引入 Student.js 文件
import Student from './components/Student';

// APP 主函数
function App() {
  return (
    <div className="App">
      {/* 调用 Appbar.js 中的 Appbar 函数 */}
      <Appbar />

      {/* 调用 Student.js 中的 Student 函数 */}
      <Student />
    </div>
  );
}
export default App;
