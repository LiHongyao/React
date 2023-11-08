import Image from 'next/image';
function Profile() {
  return (
    <img
      width={120}
      height={120}
      src='https://avatars.githubusercontent.com/u/1?v=4'
      alt='Katherine Johnson'
    />
  );
}

export default function Gallery() {
  return (
    <div className=' container'>
      <h1 className='text-xl text-orange-500 font-medium  font-sans'>
        Amazing scientists
      </h1>
      <div className='flex gap-1'>
        <Profile />
        <Profile />
        <Profile />
      </div>
    </div>
  );
}
