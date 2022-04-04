import { useMemo } from 'react';
import { Star, Clock } from 'react-feather';

import '../styles/movie-card.scss';

interface MovieCardProps {
  title: string;
  poster: string;
  rating: string;
  runtime: string;
}

export function MovieCard(props: MovieCardProps) {
  const star = useMemo(() => <Star />, []);
  const clock = useMemo(() => <Clock />, []);

  return (
    <div className="movie-card">
      <img src={props.poster} alt={props.title} />

      <div>
        <div className="movie-info">
          <span>{props.title}</span>
          <div className="meta">
            <div>
              {star} {props.rating}
            </div>

            <div>
              {clock} {props.runtime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
