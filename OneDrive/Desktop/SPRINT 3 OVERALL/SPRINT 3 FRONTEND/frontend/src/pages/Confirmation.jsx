import { useNavigate } from 'react-router-dom';

function Confirmation() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2>Purchase Complete!</h2>
      <p>Thank you for your order.</p>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
}

export default Confirmation;
