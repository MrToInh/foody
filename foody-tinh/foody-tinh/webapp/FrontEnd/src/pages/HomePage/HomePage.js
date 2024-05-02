import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import {
  getAll,
  getAllTags,
  // getAllByTag,
  // getAllTags,
  search
} from '../../services/food.service';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm } = useParams();

  useEffect(() => {
    getAllTags().then(tags => dispatch({type: 'TAGS_LOADED', payload: tags }));
    
    const loadFoods = searchTerm? search(searchTerm) : getAll();

    loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
  },[searchTerm]);

  //   const loadFoods = tag
  //     ? getAllByTag(tag)
  //     : searchTerm
  //     ? search(searchTerm)
  //     : getAll();

  //   loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
  // }, [searchTerm, tag]);

  return (
    <>
    {/* <h1>test</h1> */}
    <Search />
    <Tags tags={tags}/>  
      <Thumbnails foods={foods} />
    </>
  );
}
