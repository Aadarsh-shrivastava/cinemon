const fetcher = async () => {
  console.log('fetching');

  const url = 'https://api.themoviedb.org/3/movie/533535?language=en-US';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmVjNmRjMmQ4OWZkYTU2ZGVmMmFlNWIyOGVhZDExOCIsIm5iZiI6MTcyNjQ4MDAzMy40ODMyNywic3ViIjoiNjZlN2UxOTZkZDIyNGQxYTM5OTFiZmMxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.F6qA5615t5mhz8-2IWZx7qH7ZBKW51ATC8ZpAZCYTd8',
    },
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();

    console.log('data:', data);
  } catch (err) {
    console.log(err);
  }
};

fetcher();
