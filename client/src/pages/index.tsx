import useIsLogged from '@/utils/isLogged'

export default function Home() {
  useIsLogged()
  return (
    <main>
      <h1>Home</h1>
    </main>
  )
}
