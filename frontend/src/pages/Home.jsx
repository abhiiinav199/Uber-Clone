import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1572239780645-203c467a49b5?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 w-full flex justify-between flex-col bg-red-600'>
            <img className='w-14 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white pb-7 py-4 px-4 '>
                <h2 className='text-2xl font-bold'>Get Started With Uber</h2>
                <Link to="/login" className='flex justify-center items-center w-full bg-black rounded-lg text-white py-3 mt-4'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home