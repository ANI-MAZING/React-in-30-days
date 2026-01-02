import { useEffect, useState } from "react"


type JokeResponse = {
  error: boolean
  category: string
  type: "single"
  joke: string
  flags: []
  id: number
  safe: boolean
  lang: string
  }

function App() {

  const [joke, setJoke] = useState<JokeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJoke = async(): Promise<void> => {
    setLoading(true)
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=single")
    const data = await res.json()
    setJoke(data)
    setLoading(false)
  }


  useEffect(() => {
    fetchJoke();
  },[])


  if(loading) {
    return <h1>Loading...</h1>
  }

  if(!joke || joke.error) {
    return <h1>Ooops ! Something went wrong</h1>
  }

  return (
    <>
      <h1>React Joke Generator</h1>
      <p>{joke.joke}</p>
      <button onClick={() => fetchJoke()}>Click to load new joke</button>
    </>
  )
}

export default App
