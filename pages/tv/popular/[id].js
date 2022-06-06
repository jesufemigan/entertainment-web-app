import AllResults from "../../../components/AllResults";
import Pagination from "../../../components/Pagination";
import useSwr from 'swr';
import {useRouter} from 'next/router';

export default function PopularTv() {
  const fetcher = url => fetch(url).then(res => res.json())
  const router = useRouter()
  const {id} = router.query
  const currentPage = Number(id)

  const { data } = useSwr(`/api/tv/popular/${currentPage}`, fetcher)

  const results = data && data.results
  const totalPages = data && data.total_pages
  const isFirst = currentPage === 1
  const isLast = data ? currentPage === totalPages : false
  
  return (
    <>
      <AllResults name="Popular" type="TV Series" results={results}/>
      <Pagination currentPage={currentPage} prevHref={`/tv/popular/${currentPage - 1}`} nextHref={`/tv/popular/${currentPage + 1}`} isFirst={isFirst} isLast={isLast} toPrevious={() => currentPage - 1} toNext={() => currentPage + 1} totalPages={totalPages}/>
    </>
  )
}