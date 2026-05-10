import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [studies, setStudies] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 1. 목록 불러오기 함수
  const fetchStudies = () => {
    axios.get('http://localhost:8080/api/study')
      .then(res => setStudies(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  // 2. 데이터 저장하기 함수
  const handleSave = () => {
    if (!title || !content) return alert("내용을 입력하세요!");

    axios.post('http://localhost:8080/api/study', {
      title: title,
      content: content
    })
    .then(() => {
      fetchStudies(); // 저장 후 목록 새로고침
      setTitle('');   // 입력창 초기화
      setContent('');
    })
    .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>학습 관리 시스템</h1>
      
      {/* 입력 영역 */}
      <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
        <input 
          placeholder="제목" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          placeholder="내용" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          style={{ marginLeft: '10px' }}
        />
        <button onClick={handleSave} style={{ marginLeft: '10px' }}>추가하기</button>
      </div>

      <hr />

      {/* 목록 출력 영역 */}
      <ul>
        {studies.map(item => (
          <li key={item.id}>
            <strong>{item.title}</strong>: {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;