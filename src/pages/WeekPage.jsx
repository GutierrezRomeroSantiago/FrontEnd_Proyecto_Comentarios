import { useEffect, useState } from 'react'
import { get } from '../utils/httpClient'
import InfiniteScroll from "react-infinite-scroll-component"
import { Spinner } from '../components/Spinner'
import { MovieCard } from '../components/MovieCard'
import styles from "../components/MoviesGrid.module.css"

export function WeekPage() {

    const [week, setweek] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        const searchUrl = "/trending/movie/week?page=" + page;
        get(searchUrl).then(data => {
            setweek((prevMovies) => prevMovies.concat(data.results));
            setHasMore(data.page < data.total_pages);
        });

    }, [page])
    
    return (
        <InfiniteScroll
        dataLength={week.length}
        hasMore={hasMore}
        next={() => setPage((prevPage) => prevPage + 1)}
        loader={<Spinner />}
        >

        <ul className={styles.movieGrid}>
        {week.map((movie) => 
        <MovieCard key={movie.id} movie={movie}/>
        )}
        </ul>

        </InfiniteScroll>

    )
}
