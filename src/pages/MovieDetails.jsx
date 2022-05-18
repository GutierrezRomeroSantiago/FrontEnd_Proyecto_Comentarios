//COmponentes y React
import { useParams } from 'react-router-dom'
import { get } from '../utils/httpClient'
import { Spinner } from '../components/Spinner'
import styles from './MovieDetails.module.css';
import { useEffect, useState } from 'react'
import { getMovieImg } from '../utils/getMovieImg';
//Styles MUI
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
//URL DE LA API
import { API_URL } from '../appConfig'
//Universal Cookies
import Cookies from 'universal-cookie'
//Axios
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export function MovieDetails() {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [movie, setMovie] = useState(null)
    const [value, setValue] = useState(1);
    const [comment, setcomment] = useState('');
    const [out, setout] = useState();


  function prueba() {
    return axios.get(API_URL + 'comenta').then(res => {
      return res.data;
     });
  }
     
    

    useEffect(() => {
        setIsLoading(true)


        get("/movie/"+ movieId).then(data => {
            setIsLoading(false)
            setMovie(data);
        })
        ;
        prueba().then((datos) => setout(datos))
        //setout(prueba());
        //getComment()
    }, [movieId])

    if (isLoading) {
        return <Spinner />;
    }

    if (!movie) {
        return null;
    }

    const b = async function handleClick(){
      const cookies = new Cookies();

      let values = {
        usuario: cookies.get('usuario'),
        movieId: movieId,
        comment: comment,
        value: value
      }
      await axios.post(API_URL + 'comentario', values)
      setTimeout(window.location.reload(), 10000);
      //window.location.reload();
      
    
    }
    
   const a = async function handleChange(e){
       console.log(e)
       setcomment(e.target.value)
       console.log(comment);
       console.log(movieId)
   }
   function returnComments(data){
     if (data){
    return data.map((item) => {
        return (
            <div>
                <Box sx={{ width: '100%' }}>
                  <Grid>
                    <Item>
                    <Typography variant="h6" component="h6">
                        {item.usuario}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        {item.comment}
                    </Typography>
                    <Rating name="read-only" value={item.value} readOnly />
                    </Item>
                    </Grid>
                </Box>
            </div>
        )
    })
  }
   }


    const imageUrl = getMovieImg(movie.poster_path, 500);
    return <div>
     <div className={styles.detailsContainer}>
        <img className={styles.col + " " + styles.movieImage} src={imageUrl} alt={movie.title} />

        <div className={styles.col + " " + styles.movieDetails}>
            <p className={styles.primero}>
            <strong> Título:</strong> {movie.title}
            </p>
            <p> 
            <strong> Descripción:</strong> {movie.overview}
            </p>
            <p>
            <strong> Género:</strong> {movie.genres.map(genre => genre.name).join(', ')}    
            </p> 
        </div>
    </div>
    <div className={styles.commentsContainer}>
        <h3>Comentarios:</h3>
        <hr/>
        <form>
          <textarea className={styles.textarea} type="text" placeholder="Comentario" maxLength="140" onChange={a} />


        <Box sx={{'& > legend': { mt: 2 }, }}>
      <Typography component="legend">Valoración de la pelicula:</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      </Box>

    <button type="reset" className={styles.button} onClick={b}>Publicar</button>
    </form>
    </div>
    <div>
    <hr/>
    {returnComments(out)}
    </div>
    </div>
}
