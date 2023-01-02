import { MdContentCopy } from 'react-icons/md'

interface Props {
  text: string
}

const CopyBox = ({ text }: Props) => {
  const copy = () => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="relative mt-16 w-full max-w-2xl border-4 bg-yellow-500 px-2 py-3">
      {text}
      <MdContentCopy
        className="absolute top-0 right-0 mx-0.5 my-1 cursor-pointer bg-black p-1 text-2xl text-white duration-150 hover:bg-opacity-50 active:bg-green-700"
        onClick={copy}
      />
    </div>
  )
}

export default CopyBox
