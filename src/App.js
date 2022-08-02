import react, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {


  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o filme em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollistener = () => {
        if(window.scrollY > 10) {
          setBlackHeader(true);
        } else {
          setBlackHeader(false);
        }
      }

      window.addEventListener('scroll', scrollistener);

      return () => {
        window.removeEventListener('scroll', scrollistener);
      }
  }, []);

  return (
    <div className='page'>


        <Header black={blackHeader} />

        {FeaturedData && 
        <FeaturedMovie item={FeaturedData} />
        }

      <section className='lists'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Desenvolvidor com <span role="" arial-label="Coração"><strong>Reactjs</strong></span> por Adriano Xavier<br/>
        Direito de imagem para NetFlix<br/>
        API do site Themoviedb.org
      </footer>

          {movieList.length <= 0 &&
      <div className='loading'>
        <img src="" />
      </div>
          }
    </div>
  )
}