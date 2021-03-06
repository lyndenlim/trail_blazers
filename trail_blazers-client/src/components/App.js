import { Route, Switch } from "react-router-dom"
import { useState, useEffect } from "react"
import Home from "./Home"
import ReviewPage from "./ReviewPage"

function App() {
  const [trailData, setTrailData] = useState([])
  
  const [search, setSearch] = useState("");

  useEffect(async () => {
    async function fetchData() {
      let request = await fetch("http://localhost:9292/trails")
      let response = await request.json()
      setTrailData(response)
      return response
    }
    await fetchData()
  }, [])

  const trails = trailData.trails;
  const ratingData = trailData.rating;
  const filteredTrailsData = { trails: [], rating: [] }

  if (!trails) return null
  filteredTrailsData.trails = trails.filter(trail =>
    trail.park_name.toLowerCase().includes(search.toLowerCase()) || trail.trail_name.toLowerCase().includes(search.toLowerCase())
  );

  filteredTrailsData.rating = filteredTrailsData.trails.map(trail =>
    ratingData.filter(rating => rating.trail_id === trail.id)
  );

  return (
    <Switch>
      <Route exact path="/">
        <Home
          trailData={filteredTrailsData}
          onSearch={setSearch}
          setSearch={setSearch}
        />
      </Route>
      <Route path="/review/:id">
        <ReviewPage trailData={trailData} />
      </Route>
    </Switch>
  )
}
export default App;
