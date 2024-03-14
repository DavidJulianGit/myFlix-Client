import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { XLg } from 'react-bootstrap-icons';


//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/Slices/movies';

export default function MovieFilter() {
   const filter = useSelector((state) => state.movies.filter);
   const dispatch = useDispatch();

   return (
      <>
         <Form.Group className="form">
            <Form.Label htmlFor="filter">Search</Form.Label>
            <InputGroup>
               <Form.Control
                  id="filter"
                  type='text'
                  value={filter}
                  onChange={(e) => dispatch(setFilter(e.target.value))}
               />
               <Button variant="outline-secondary" onClick={() => dispatch(setFilter(''))}>
                  <XLg size={'20px'} />
               </Button>
            </InputGroup>
         </Form.Group>
      </>
   );
}