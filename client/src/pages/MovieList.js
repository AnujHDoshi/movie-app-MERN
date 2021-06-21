import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    Container,
    Card, CardBody,
    CardHeader, Col, Row,
    Form, Input, Button, Spinner,
    Modal, ModalHeader, ModalBody,
    ModalFooter,FormGroup, Label,
    ButtonGroup,Alert
} from 'reactstrap';

import axios from 'axios';

function MovieList(props) {
    const [movies, setMovie] = useState([]);
    const [search, setSearch] = useState('');
    const [movieId, setMovieId] = useState('');
    const [name, setName] = useState('');
    const [poster, setPoster] = useState('');
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [modal, setModal] = useState(false);
    const [deleteMovieModel, setDeleteMovieModel] = useState(false);

    const history = useHistory();

    const toggle = () => setModal(!modal);
    const deleteToggle = () => setDeleteMovieModel(!deleteMovieModel);

    const { buttonLabel, className} = props;
    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = async () => {
        setLoader(true);
        const movieData = await axios.get(`http://localhost:4000/movie?title=${search}`);
        setLoader(false);
        if (movieData.data) {
            setError("");
            console.log(movieData.data);
            setMovie(movieData.data);
        } else {
            setError(movies.data["Error"]);
        }
    }

    const addMovie = async () => {
        setLoader(true);
        const response = await axios({
            url: `http://localhost:4000/movie/add`,
            method: 'post',
            data: {
                movieId:movieId,
                name:name,
                poster:poster
            }
        });
        toggle();
        setLoader(false);
    }

    const deleteMovie = async() => {
        setLoader(true);
        const response = await axios({
            url: `http://localhost:4000/movie/delete`,
            method: 'delete',
            data: {
                name:name
            }
        });
        deleteToggle();
        setLoader(false);
    }
    
    const onChangeInput = (event) => {
        setSearch(event.target.value);
    }

    const onClickSearch = () => {
        getMovies();
    }

    const onClickDetails = (movie) => {
        history.push(`/${movie.movieId}`);
    };

    const addFormUI = () => {
        return(
        <Form id="addMovie" action="http://localhost:4000/movie/add"> 
            <FormGroup>
                <Label for="movieId">Movie Id</Label>
                    <Input type="number" name="movieId" id="movieId" placeholder="Enter a movie id" onChange={(e)=>setMovieId(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="movieName">Movie Name</Label>
                <Input type="text" name="movieName" id="movieName" placeholder="Enter a movie name" onChange={(e)=>setName(e.target.value)}/>
            </FormGroup>
            <FormGroup>
                <Label for="moviePoster">Poster</Label>
                <Input type="text" name="moviePoster" id="moviePoster" placeholder="Enter a poster" onChange={(e)=>setPoster(e.target.value)}/>
            </FormGroup>    
        </Form>
        )
    }

    const deleteMovieUI = () => {
        return(
        <Form id="deleteMovie" action="http://localhost:4000/movie/add"> 
            <FormGroup>
                <Label for="movieName">Movie Name</Label>
                <Input type="text" name="movieName" id="movieName" placeholder="Enter a movie name" onChange={(e)=>setName(e.target.value)}/>
            </FormGroup>
        </Form>
        )
    }
    const updateCard = () => {
        const cards = error ? (
            <Alert color="warning">{error}</Alert> ) : (
            movies.map((movie, idx) => (
                <Col md="4" key={idx}>
                    <Card onClick={() => onClickDetails(movie)}>
                    <CardHeader>{movie.title}</CardHeader>
                        <CardBody>
                            <img src={movie.poster} alt={movie.title} style={{ maxWidth : '100%', maxHeight : '100%' }} />
                        </CardBody>
                     </Card>
                </Col>
            ))
        )
        return cards;
    }
    
    return (
        <>
      {loader ? (
        <Spinner style={{ width: "3rem", height: "3rem" }} type="grow" />
      ) : (
        <main>
            <Container>
                    <h2>List of Movies</h2>
                    <Form id="searchMovie">
                        <Input type="text" onChange={onChangeInput} style={{ width: '70%', display: 'inline' }} placeholder="Search here..." />
                        <ButtonGroup>
                            <Button color="warning" onClick={onClickSearch} style={{ marginleft:'20px'}} inline>Search</Button>
                            <Button color="warning" onClick={toggle}>Create Movie</Button>
                            <Button color="warning" onClick={deleteToggle}>Delete Movie</Button>
                        </ButtonGroup>
                    </Form>
                    <hr/>
                    <Row>
                        {updateCard()}
                    </Row>
                    <Modal isOpen={modal} toggle={toggle} className={className}>
                        <ModalHeader toggle={toggle}>Add Movie</ModalHeader>
                            <ModalBody>
                            {addFormUI()}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="warning" onClick={addMovie}>Create Movie</Button>
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                    </Modal>
                            
                    <Modal isOpen={deleteMovieModel} toggle={deleteToggle} className={className}>
                        <ModalHeader toggle={deleteToggle}>Add Movie</ModalHeader>
                            <ModalBody>
                            {deleteMovieUI()}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="warning" onClick={deleteMovie}>Del Movie</Button>
                                <Button color="secondary" onClick={deleteToggle}>Cancel</Button>
                            </ModalFooter>
                    </Modal>
            </Container>
        </main>
        )}
    </>
    );
}

export default MovieList;
