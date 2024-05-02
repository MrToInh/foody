import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './search.module.css';

function removeVietnameseAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

Search.defaultProps = {
  searchRoute: '/search/',
  defaultRoute: '/',
  placeholder: 'Search Food (👉ﾟヮﾟ)👉',
};

export default function Search({
  searchRoute,
  defaultRoute,
  margin,
  placeholder,
}) {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    setTerm(searchTerm ? removeVietnameseAccents(searchTerm) : '');
  }, [searchTerm]);

  const search = async () => {
    term ? navigate(searchRoute + removeVietnameseAccents(term)) : navigate(defaultRoute);
  };

  const cleanedPlaceholder = removeVietnameseAccents(placeholder);

  return (
    <div className={classes.container} style={{ margin }}>
      <input
        type="text"
        placeholder={cleanedPlaceholder}
        onChange={e => setTerm(e.target.value)}
        onKeyUp={e => e.key === 'Enter' && search()}
        value={term}
      />
      <button onClick={search}>Search</button>
    </div>
  );
}
