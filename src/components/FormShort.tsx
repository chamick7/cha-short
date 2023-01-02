import { trpc } from 'src/utils/trpc'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import CopyBox from './CopyBox'

interface URLInfo {
  url: string
}

const FormShort = () => {
  const [newURL, setNewURL] = useState('')
  const [error, setError] = useState('')
  const { register, handleSubmit, reset } = useForm<URLInfo>()

  const shortenURL = trpc.shorten.shortURL.useMutation({
    onSuccess(data) {
      reset()
      setNewURL(data as string)
    },
    onError(data) {
      setError('Can not shorten this url!. Please try again')
    },
  })

  const handleShortSubmit = (data: URLInfo) => {
    setNewURL('')
    setError('')
    shortenURL.mutate({ url: data.url })
  }

  return (
    <div className="flex flex-col items-center p-4 pt-10">
      <form onSubmit={handleSubmit(handleShortSubmit)} className="text-center">
        <input
          className="text-md w-full max-w-md px-3 py-2 outline-none focus:border-none"
          type="text"
          id="url-input"
          {...register('url', { required: true })}
        />
        {error && <h3 className="mt-3 text-white">{error}</h3>}
        <button
          className="mt-8 max-w-sm bg-yellow-500 py-2 px-10 text-center duration-150 hover:bg-yellow-300"
          type="submit"
          disabled={shortenURL.isLoading}
        >
          {shortenURL.isLoading ? 'Loading...' : 'Shorten'}
        </button>
      </form>
      {newURL && <CopyBox text={newURL} />}
    </div>
  )
}

export default FormShort
