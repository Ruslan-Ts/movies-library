import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ReviewsList } from './Reviews.styled';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  const normalizedReviews = arr => {
    return arr.map(({ id, content }) => ({
      id,
      content,
    }));
  };

  useEffect(() => {
    try {
      const fetchFoo = async movieId => {
        const {
          data: { results },
        } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=ac5224eaea5eecab8d1620632b5b6c95`
        );

        setReviews(normalizedReviews(results));
        console.log(results);
      };
      fetchFoo(movieId);
    } catch (error) {
      console.log(error.message);
      setReviews({});
    }
  }, [movieId]);

  return (
    <ReviewsList>
      {!reviews.length ? (
        <p className="msg">Possibly, there are no reviews</p>
      ) : (
        reviews.map(({ id, content }) => {
          return (
            <li key={id}>
              <p>{content}</p>
            </li>
          );
        })
      )}
    </ReviewsList>
  );
};

export default Reviews;
