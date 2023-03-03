import { useAppCtx } from "../utils/AppContext"

const HomePage = () => {
  const { user } = useAppCtx()
  
  return (
    <>
      <h1>Home Page</h1>

      { !user ? (
        <p>The user is not logged in.</p>
      ) : (
        <p>The user is logged in.</p>
      )}
    </>
  )
}

export default HomePage