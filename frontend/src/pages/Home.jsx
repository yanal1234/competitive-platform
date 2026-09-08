
import FeatureCards from "../components/Home/FeatureCards/FeatureCards";

function Home() {
  return (
    <div>
      <div className="yy">
        <div className="pp">
          <h1>
            Master Competitive<br />
            Programming with<br />
            AI Intelligence
          </h1>

          <p>
            CodeForge AI combines competitive programming,
            personalized learning, and artificial intelligence to
            help you level up your coding skills efficiently.
          </p>
        </div>

        <div className="img">
          <img src="/images/Frame 9.svg" alt="CodeForge AI" />
        </div>
      </div>
      <FeatureCards />
    </div>
  )
}

export default Home
