import { useEffect, useState } from 'react';
interface Idata {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Home = () => {
  const [stateHome, setStateHome] = useState<Idata[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => setStateHome(data));
  }, []);

  const matrixRefactor = (): Idata[] => {
    return stateHome.reduce((dado, linha) => {
      return dado.concat(linha)
    }, [])
  }

  const padinationData = matrixRefactor().slice((currentPage - 1) * 2, currentPage * 2);

  const handleFirstLetter = (title: string): boolean => {
    return title.charAt(0).toLowerCase() === 's';
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };


  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <main
      style={{
        maxWidth: '600px',
        marginLeft: '20px'
      }}
    >
      <h1 style={{ marginBottom: '16px', fontSize: '40px' }}>Retailhub Teste</h1>
      {padinationData.map((item, index) => (
        <div key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '16px',
            justifyContent: 'space-between',
            backgroundColor: index % 2 === 1 ? '#B5B5C3' : 'transparent'
          }}
        >
          <p>Id:{item.id}</p>
          {handleFirstLetter(item.title) &&
            <div>
              <p>{item.title}</p>
            </div>
          }
          {!handleFirstLetter(item.title) &&
            <div >
              <p>Título não começa com a letra 'S'</p>
            </div>
          }
        </div>
      ))
      }
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{
            backgroundColor: '#303446',
            color: '#fff',
            padding: '10px'
          }}
        >
          Página Anterior
        </button>
        <button
          onClick={handleNextPage}
          style={{
            backgroundColor: '#303446',
            color: '#fff',
            padding: '10px'
          }}
        >
          Próxima Página
        </button>
      </div>
    </main >
  );
}

export default Home;
