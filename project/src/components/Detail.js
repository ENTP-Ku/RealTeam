import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Detail = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/welcome');
  };

  return (
    <div>
      {/* Record 데이터를 가져와서 상세내용을 렌더링해야 함 */}
      <button onClick={handleBack}>목록</button>
    </div>
  );
};

export default Detail;
