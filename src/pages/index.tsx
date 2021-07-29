import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';


interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetImagesResponse {
  after: string;
  data: Image[];
}


export default function Home(): JSX.Element {

  async function getImagesList({ pageParam = null }): Promise<GetImagesResponse> {
    const { data } = await api('/images', {
      params: {
        after: pageParam
      }
    });

    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images', getImagesList, {
    getNextPageParam: lastPage => lastPage?.after || null,
  });

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(image => {
      return image.data.flat();
    });
    return formatted;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading && !isError) {
    return <Loading />
  }

  // TODO RENDER ERROR SCREEN
  if (!isLoading && isError) {
    return <Error />
  }


  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          // fetchNextPage do React Query vai executar a paginação dos cards
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            mt="6"
            bg="#42A8D3"
          >
            {/* isFetchingNextPage = Se ele ja esta buscando uma pagina nova é true, se não, é false */}
            {/* 'Carregando...' e 'Carregar mais'  são obrigatorios para o funcionamento */}
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
