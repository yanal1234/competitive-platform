import "./LeaderboardSection.css";
import { getLeaderboard } from "../../../services/leaderboard";
import defaultAvatar from "../../../assets/The_image_is_for_illustrative_purposes.png";
import { ArrowRight, Trophy, Medal, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function LeaderboardSection() {
  const [leaderboard, setleaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadleaderboard = async () => {
      try {
        const response = await getLeaderboard();
        setleaderboard(response.data.leaderboard);
      } catch (error) {
        setError("Failed to load leaderboard.");
      }
    };
    loadleaderboard();
  }, []);

  const renderRankBadge = (index) => {
    const rank = index + 1;
    if (rank === 1) {
      return (
        <span className="leaderboard-position position-1" title="Top 1">
          <Trophy size={15} />
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="leaderboard-position position-2" title="Top 2">
          <Medal size={15} />
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="leaderboard-position position-3" title="Top 3">
          <Award size={15} />
        </span>
      );
    }
    return (
      <span className="leaderboard-position position-default">
        {rank}
      </span>
    );
  };

  return (
    <section className="leaderboard-section">
      {error && <span className="leaderboard-error">{error}</span>}

      <div className="leaderboard-header">
        <div>
          <span className="leaderboard-badge">GLOBAL RANKINGS</span>
          <h2 className="leaderboard-title">
            Where do <span>you rank?</span>
          </h2>
        </div>

        <Link to={"/leaderboard"} className="leaderboard-button">
          <span>Full leaderboard</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>RANK</th>
              <th>USER</th>
              <th>RATING</th>
              <th>SOLVED</th>
              <th>COUNTRY</th>
              <th>TIER</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((lead, index) => (
              <tr key={lead.user_id || index} className={index < 3 ? `top-row top-row-${index + 1}` : ""}>
                <td>{renderRankBadge(index)}</td>

                <td>
                  <Link to={`/profile/${lead.username}`} className="leaderboard-user-link">
                    <div className="leaderboard-user">
                      <div className="avatar-wrapper">
                        <img
                          src={lead.profile_picture || defaultAvatar}
                          alt={lead.username}
                        />
                      </div>

                      <div className="leaderboard-user-info">
                        <span className="leaderboard-name">
                          {lead.name || lead.username}
                        </span>
                        <span className="leaderboard-username">
                          @{lead.username}
                        </span>
                      </div>
                    </div>
                  </Link>
                </td>

                <td>
                  <span className="leaderboard-rating">
                    {lead.rating}
                  </span>
                </td>

                <td>
                  <span className="leaderboard-solved">
                    {lead.solved}
                  </span>
                </td>

                <td>
                  <span className="leaderboard-country">
                    {lead.country}
                  </span>
                </td>

                <td>
                  <span
                    className={`leaderboard-tier tier-${lead.user_rank
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {lead.user_rank}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default LeaderboardSection;
