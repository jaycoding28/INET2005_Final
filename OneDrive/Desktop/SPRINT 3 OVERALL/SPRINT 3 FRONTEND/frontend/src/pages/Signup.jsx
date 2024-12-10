import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_HOST}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(`Signup failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '10px' }}>
          <input {...register('email', { required: true })} placeholder="Email" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input {...register('password', { required: true })} type="password" placeholder="Password" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input {...register('first_name', { required: true })} placeholder="First Name" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input {...register('last_name', { required: true })} placeholder="Last Name" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
