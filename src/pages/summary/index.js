import React, { useState } from 'react';

const Summary = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <form>
        <input
          id='confirm-checkbox'
          type={'checkbox'}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor='confirm-checkbox'>주문하려는 것을 확인하셨나요?</label>
        <br />
        <button type='submit' disabled={!checked}>
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default Summary;
