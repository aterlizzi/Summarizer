import React, { useEffect, useState } from "react";
import styles from "../../styles/components/DefaultDisplay.module.scss";
import { Rating } from "react-simple-star-rating";
import { useMutation } from "urql";

const EditSummary = `
    mutation($id: Float!, $rating: Float!){
      editSummary(id: $id, rating: $rating)
    }
`;

function StarRating({ currentRating, id }) {
  const [rating, setRating] = useState(currentRating ? currentRating : 0);
  const [rated, setRated] = useState(false);

  const [editSummaryResult, editSummary] = useMutation(EditSummary);

  const handleRating = (rate) => {
    setRating(rate / 20);
    if (rated) return;
    editSummary({ id: parseInt(id), rating: rate / 20 }).then((res) => {
      if (res.data && res.data.editSummary) {
        setRated(true);
      }
    });
  };

  return (
    <div className={styles.ratingBox}>
      <p className={styles.rating}>How was the article?</p>
      <Rating
        onClick={handleRating}
        ratingValue={rating * 20}
        size={20}
        allowHalfIcon={true}
        fillColor="#5952d3"
        emptyColor="rgba(255, 255, 255, 0.6)"
        className={styles.ratingSystem}
      />
    </div>
  );
}

export default StarRating;
