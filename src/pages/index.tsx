import { type NextPage } from 'next'
import FormShort from 'src/components/FormShort'

const Home: NextPage = () => {
  return (
    <div className="min-h-[100vh] w-full bg-blue-500 pt-24">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-white">
          Short chamick's
          <span className="text-3xl text-yellow-400"> Link</span>
        </h1>
      </div>

      <div>
        <FormShort />
      </div>
    </div>
  )
}

export default Home
