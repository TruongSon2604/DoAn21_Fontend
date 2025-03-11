import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SweetAlert = () => {
  MySwal.fire({
    title: <p>Thông báo</p>,
    text: "Đây là một alert với React!",
    icon: "success",
    confirmButtonText: "OK",
  });
};

<button onClick={SweetAlert}>Hiển thị Alert</button>;
