import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const RATING_STORAGE_KEY = "komabanavi_rated";

interface RatingPopupProps {
  onDismiss: () => void;
}

export function RatingPopup({ onDismiss }: RatingPopupProps) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const addRating = useMutation(api.ratings.add);

  const handleSubmit = async (stars: number) => {
    try {
      await addRating({ stars: BigInt(stars) });
      localStorage.setItem(RATING_STORAGE_KEY, "true");
      setSubmitted(true);
      setTimeout(onDismiss, 1500);
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  return (
    <div className="rating-popup-overlay" onClick={onDismiss}>
      <div className="rating-popup" onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div className="rating-popup-thankyou">
            <p className="rating-popup-thankyou-text">ありがとうございます！</p>
          </div>
        ) : (
          <>
            <p className="rating-popup-title">このアプリを評価してください</p>
            <div className="rating-popup-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`rating-popup-star ${star <= hoveredStar ? "selected" : ""}`}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => handleSubmit(star)}
                  aria-label={`${star}つ星`}
                >
                  ★
                </button>
              ))}
            </div>
            <button className="rating-popup-cancel" onClick={onDismiss}>
              後で
            </button>
          </>
        )}
      </div>
    </div>
  );
}
