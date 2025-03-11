// import Pagination from 'react-bootstrap/Pagination';

// function PaginationE() {
//   return (
//     <Pagination>
//       <Pagination.First />
//       <Pagination.Prev />
//       <Pagination.Item>{1}</Pagination.Item>
//       <Pagination.Ellipsis />

//       <Pagination.Item>{10}</Pagination.Item>
//       <Pagination.Item>{11}</Pagination.Item>
//       <Pagination.Item active>{12}</Pagination.Item>
//       <Pagination.Item>{13}</Pagination.Item>
//       <Pagination.Item disabled>{14}</Pagination.Item>

//       <Pagination.Ellipsis />
//       <Pagination.Item>{20}</Pagination.Item>
//       <Pagination.Next />
//       <Pagination.Last />
//     </Pagination>
//   );
// }

// export default PaginationE;
import Pagination from 'react-bootstrap/Pagination';
import { Container } from 'react-bootstrap';

function PaginationE() {
  return (
    <Container className="d-flex justify-content-center mt-4">
      <Pagination size="lg">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Container>
  );
}

export default PaginationE;
