import CreateUser from '../features/user/CreateUser'
import {useSelector} from 'react-redux';
import Button from './Button';

function Home() {
  const userName = useSelector((store) => store.user.userName);
  return (
    <div className='my-10 sm:my-16 px-4 text-center text-slate-800'>
      <h1 className='mb-8 font-semibold text-center text-xl md:text-3xl'>
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!userName ? <CreateUser /> : <Button type="primary" to="/menu">Continue ordering, {userName}</Button>}
    </div>
  );
}

export default Home;
