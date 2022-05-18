const API = "https://api.themoviedb.org/3"

export function get (path) {   
    return fetch(API + path, {
        headers: {
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTJkY2UwNjQxMDY5ZWFmZDZjZjg2YmU5OWJhMDkzOCIsInN1YiI6IjYyMzFjNmMxNDE0MjkxMDA0N2VhY2QzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sDyco9MiVRDnfedoX7KGE4VnFBj4bnJVv4u5hsukHSY",
          "Content-Type": "application/json;charset=utf-8", 
        }
    })
    .then((result) => result.json())

}