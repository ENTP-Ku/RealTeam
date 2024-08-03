import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate를 import합니다.

function Detail() {
    const { id } = useParams();
    const [record, setRecord] = useState(null);
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

    useEffect(() => {
        fetch(`/api/records/${id}`)
            .then(response => response.json())
            .then(data => setRecord(data));
    }, [id]);

    return (
        <div>
            {record ? (
                <div>
                    <h1>{record.title}</h1>
                    <p>작성자: {record.username}</p>
                    <p>{record.content}</p>
                    <p>작성날짜: {record.createdDate}</p>
                    <button onClick={() => navigate('/welcome')}>목록으로</button> {/* useNavigate의 navigate를 사용하여 페이지 이동 */}
                </div>
            ) : (
                <p>로딩중...</p>
            )}
        </div>
    );
}

export default Detail;
